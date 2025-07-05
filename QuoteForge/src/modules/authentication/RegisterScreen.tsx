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
    confPassword: string;
};

const repo = new FirebaseUserRepository();

export default function RegisterScreen() {
    const navigate = useNavigate();
    const alert = useMyAlert();

    const { control, handleSubmit, formState } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
            confPassword: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await repo.register(data.email, data.password);
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
