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
};

export default function LoginScreen() {
    const navigate = useNavigate();
    const authentication = useAuthenticationContext();

    const { control, handleSubmit, formState } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        authentication.login(data.email, data.password);
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

                    <MyButtonSubmit
                        isLoading={formState.isSubmitting}
                        label="login"
                    />
                    <Button type="button" onClick={() => navigate("register")}>
                        Register here
                    </Button>
                </Stack>
            </form>
        </AuthenticationLayout>
    );
}
