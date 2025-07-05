import { Button, Stack, TextField } from "@mui/material";

interface Props {
    onLogout(): void;
    isLoading: boolean;
}

export default function SetupProfile(props: Props) {
    return (
        <Stack spacing={1}>
            <TextField
                label="First Name"
                variant="filled"
                fullWidth
                size="small"
            />
            <TextField
                label="Last Name"
                variant="filled"
                fullWidth
                size="small"
            />
            <TextField
                label="Birthday"
                variant="filled"
                fullWidth
                size="small"
            />
            <TextField label="Phone" variant="filled" fullWidth size="small" />

            <Button variant="contained" sx={{ mb: 2 }}>
                create profile
            </Button>
            <Button
                disabled={props.isLoading}
                onClick={props.onLogout}
                size="small"
            >
                Try another account
            </Button>
        </Stack>
    );
}
