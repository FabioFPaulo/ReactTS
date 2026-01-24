import { Box, Button, Stack, Typography } from "@mui/material";

interface Props {
    onClick(): void;
}

function WelcomeScreen(props: Props) {
    return (
        <Stack alignItems="center" overflow="hidden" justifyContent="center">
            <Typography variant="h3">QuizRace</Typography>
            <Box height="50px" />
            <Box width="100%" display="flex" justifyContent="space-around">
                <img src={import.meta.env.BASE_URL + "car.gif"} width="20%" />
                <img
                    src={import.meta.env.BASE_URL + "cycling.gif"}
                    width="20%"
                />
            </Box>
            <Box height="10px" />
            <Button variant="contained" fullWidth onClick={props.onClick}>
                Let's start
            </Button>
        </Stack>
    );
}

export default WelcomeScreen;
