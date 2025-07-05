import MyButtonSubmit from "@/components/forms/MyButtonSubmit";
import MyTextField from "@/components/forms/MyTextField";
import useMyAlert from "@/hooks/useMyAlert";
import AuthenticationLayout from "@/modules/authentication/ui/AuthenticationLayout";
import FirebaseUserRepository from "@/repositories/UserRepository/FirebaseUserRepository";
import { Button, Stack } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type FormValues = {
    email: string;
    password: string;
};

const repo = new FirebaseUserRepository();

export default function LoginScreen() {
    const navigate = useNavigate();
    const alert = useMyAlert();

    const { control, handleSubmit, formState } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await repo.login(data.email, data.password);
        } catch (error) {
            const title =
                error instanceof FirebaseError
                    ? "Invalid email or password"
                    : "Unkown error";
            alert.openAlert("error", title);
        }
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
