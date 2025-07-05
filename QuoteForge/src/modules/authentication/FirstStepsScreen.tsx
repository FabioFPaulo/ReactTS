import useAuthenticationContext from "@/hooks/useAuthenticationContext";
import useMyAlert from "@/hooks/useMyAlert";
import AuthenticationLayout from "@/modules/authentication/ui/AuthenticationLayout";
import SetupProfile from "@/modules/authentication/ui/SetupProfile";
import ValidateEmail from "@/modules/authentication/ui/ValidateEmail";
import FirebaseUserRepository from "@/repositories/UserRepository/FirebaseUserRepository";
import type MyUserProfile from "@/repositories/UserRepository/models/MyUserProfile";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useCallback, useState } from "react";

interface Props {
    defaultStep: number;
}

const repo = new FirebaseUserRepository();

export default function FirstStepsScreen({ defaultStep }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const authentication = useAuthenticationContext();

    const alert = useMyAlert();

    const onLogout = useCallback(async () => {
        try {
            setLoading(true);
            await repo.logout();
            setLoading(false);
        } catch (error) {
            console.error(error);
            alert.openAlert("error", "Error on logout");
            setLoading(false);
        }
    }, [alert]);

    const reloadUser = useCallback(async () => {
        try {
            setLoading(true);
            const state = await authentication.reloadState();

            if (!state.user?.emailVerified) {
                alert.openAlert("error", "Your email are not verified");
            }

            setLoading(false);
        } catch (error) {
            console.error(error);
            alert.openAlert("error", "Error on reload user");
            setLoading(false);
        }
    }, [alert, authentication]);

    const sendEmail = useCallback(async () => {
        try {
            setLoading(true);
            await repo.sendEmailVerification();
            setLoading(false);
        } catch (error) {
            console.error(error);
            alert.openAlert("error", "Error on send email");
            setLoading(false);
        }
    }, [alert]);

    const updateProfile = useCallback(
        async (profile: MyUserProfile) => {
            try {
                setLoading(true);
                await repo.updateProfile(profile);
                await authentication.reloadState();
                setLoading(false);
            } catch (error) {
                console.error(error);
                alert.openAlert("error", "Error on update profile");
                setLoading(false);
            }
        },
        [alert, authentication]
    );

    return (
        <AuthenticationLayout>
            <Stepper activeStep={defaultStep} sx={{ width: "100%", mb: 3 }}>
                {steps.map((stepLabel, i) => (
                    <Step key={i} completed={i < defaultStep}>
                        <StepLabel>{stepLabel}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {defaultStep === 0 ? (
                <ValidateEmail
                    onReloadUserClick={reloadUser}
                    onSendEmailClick={sendEmail}
                    onLogoutClick={onLogout}
                    isLoading={loading}
                />
            ) : (
                <SetupProfile
                    onLogout={onLogout}
                    isLoading={loading}
                    onCreateClick={updateProfile}
                />
            )}
        </AuthenticationLayout>
    );
}

const steps = ["Email", "Setup Profile"];
