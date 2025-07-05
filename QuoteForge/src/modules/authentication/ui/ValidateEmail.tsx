import ErrorIcon from "@mui/icons-material/Error";
import { Button, Stack, Typography } from "@mui/material";

interface Props {
    onEmailValidationSuccess(): void;
}

export default function ValidateEmail(props: Props) {
    return (
        <Stack alignItems="center">
            <ErrorIcon color="error" />
            <Typography variant="overline" textAlign="center" color="error">
                you need to verify your email! please check your mailbox
            </Typography>
            <Button
                onClick={props.onEmailValidationSuccess}
                variant="contained"
                size="small"
                color="error"
                sx={{ mt: 5 }}
            >
                resend email
            </Button>
        </Stack>
    );
}
