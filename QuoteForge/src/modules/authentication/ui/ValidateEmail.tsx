import ErrorIcon from "@mui/icons-material/Error";
import { Button, Stack, Typography } from "@mui/material";

interface Props {
    onLogoutClick(): void;
    onSendEmailClick(): void;
    onReloadUserClick(): void;
    isLoading: boolean;
}

export default function ValidateEmail(props: Props) {
    return (
        <Stack alignItems="center">
            <ErrorIcon color="error" />
            <Typography variant="overline" textAlign="center" color="error">
                you need to verify your email! please check your mailbox
            </Typography>

            <Button
                onClick={props.onReloadUserClick}
                size="small"
                variant="contained"
                sx={{ mt: 5, mb: 1 }}
                disabled={props.isLoading}
            >
                I already verify my account
            </Button>
            <Button
                onClick={props.onSendEmailClick}
                size="small"
                color="error"
                sx={{ mb: 1 }}
                disabled={props.isLoading}
            >
                resend email
            </Button>
            <Button
                disabled={props.isLoading}
                onClick={props.onLogoutClick}
                size="small"
                variant="outlined"
                color="secondary"
            >
                Try another account
            </Button>
        </Stack>
    );
}
