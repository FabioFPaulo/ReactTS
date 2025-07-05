import { Button, Stack, TextField } from "@mui/material";

export default function SetupProfile() {
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

            <Button variant="contained">create profile</Button>
        </Stack>
    );
}
