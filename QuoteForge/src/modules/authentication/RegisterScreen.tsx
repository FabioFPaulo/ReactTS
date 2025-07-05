import MyButtonSubmit from "@/components/forms/MyButtonSubmit";
import MyTextField from "@/components/forms/MyTextField";
import useAuthenticationContext from "@/hooks/useAuthenticationContext";
import AuthenticationLayout from "@/modules/authentication/ui/AuthenticationLayout";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type FormValues = {
    email: string;
    password: string;
    confPassword: string;
};

export default function RegisterScreen() {
    const navigate = useNavigate();
    const authentication = useAuthenticationContext();

    const { control, handleSubmit, formState } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
            confPassword: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        authentication.register(data.email, data.password);
    };

    return (
        <AuthenticationLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={1}>
                    <MyTextField
                        name="email"
                        control={control}
                        label="Email"
                        rules={{
                            required: "Email is required",
                        }}
                    />
                    <MyTextField
                        name="password"
                        control={control}
                        label="Password"
                        rules={{
                            required: "Password is required",
                        }}
                        type="password"
                    />

                    <MyTextField
                        name="confPassword"
                        control={control}
                        label="Confirm Password"
                        rules={{
                            required: "Password is required",
                            validate: (value, formValues) =>
                                value === formValues.password ||
                                "Paswords don't match",
                        }}
                        type="password"
                    />

                    <MyButtonSubmit
                        isLoading={formState.isSubmitting}
                        label="register"
                    />
                    <Button type="button" onClick={() => navigate("/")}>
                        login
                    </Button>
                </Stack>
            </form>
        </AuthenticationLayout>
    );
}
