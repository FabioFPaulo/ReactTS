import AuthenticationLayout from "@/screens/authentication/AuthenticationLayout";
import { Button, Stack, TextField } from "@mui/material";

export default function RegisterScreen() {
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="filled"
                    fullWidth
                    size="small"
                />
                <Button variant="contained">register</Button>
                <Button>login</Button>
            </Stack>
        </AuthenticationLayout>
    );
}
