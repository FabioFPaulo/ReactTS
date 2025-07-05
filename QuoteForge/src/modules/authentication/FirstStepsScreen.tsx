import useMyAlert from "@/hooks/useMyAlert";
import AuthenticationLayout from "@/modules/authentication/ui/AuthenticationLayout";
import SetupProfile from "@/modules/authentication/ui/SetupProfile";
import ValidateEmail from "@/modules/authentication/ui/ValidateEmail";
import FirebaseUserRepository from "@/repositories/UserRepository/FirebaseUserRepository";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

interface Props {
    defaultStep: number;
}

const repo = new FirebaseUserRepository();

export default function FirstStepsScreen({ defaultStep }: Props) {
    const [loading, setLoading] = useState<boolean>(false);

    const alert = useMyAlert();
    const navigate = useNavigate();

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
            const emailVerified = await repo.reloadUser();

            if (emailVerified) {
                navigate(0);
            } else {
                alert.openAlert("error", "Your email are not verified");
            }

            setLoading(false);
        } catch (error) {
            console.error(error);
            alert.openAlert("error", "Error on reload user");
            setLoading(false);
        }
    }, [alert, navigate]);

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
                <SetupProfile onLogout={onLogout} isLoading={loading} />
            )}
        </AuthenticationLayout>
    );
}

const steps = ["Email", "Setup Profile"];
