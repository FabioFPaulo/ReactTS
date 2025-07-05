import AuthenticationLayout from "@/screens/authentication/AuthenticationLayout";
import { Button, Stack, TextField } from "@mui/material";

export default function LoginScreen() {
    return (
        <AuthenticationLayout>
            <Stack spacing={1}>
                <TextField
                    label="Email"
                    variant="filled"
                    fullWidth
                    size="small"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="filled"
                    fullWidth
                    size="small"
                />
                <Button variant="contained">login</Button>
                <Button>Register here</Button>
            </Stack>
        </AuthenticationLayout>
    );
}
