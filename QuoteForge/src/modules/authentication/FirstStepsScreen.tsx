import AuthenticationLayout from "@/modules/authentication/AuthenticationLayout";
import SetupProfile from "@/modules/authentication/ui/SetupProfile";
import ValidateEmail from "@/modules/authentication/ui/ValidateEmail";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useCallback, useState } from "react";

interface Props {
    defaultStep?: number;
}

export default function FirstStepsScreen({ defaultStep }: Props) {
    const [step, setStep] = useState<number>(defaultStep ?? 0);

    const onValidationEmailSuccess = useCallback(() => {
        setStep(1);
    }, []);

    return (
        <AuthenticationLayout>
            <Stepper activeStep={step} sx={{ width: "100%", mb: 3 }}>
                {steps.map((stepLabel, i) => (
                    <Step key={i} completed={i < step}>
                        <StepLabel>{stepLabel}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {step === 0 ? (
                <ValidateEmail
                    onEmailValidationSuccess={onValidationEmailSuccess}
                />
            ) : (
                <SetupProfile />
            )}
        </AuthenticationLayout>
    );
}

const steps = ["Email", "Setup Profile"];
