import { createTheme } from "@mui/material";

const myTheme = createTheme({
    palette: {
        primary: {
            main: "#4A90E2",
            light: "#8FC4F7",
            dark: "#357ABD",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#50E3C2",
            light: "#8EF0DA",
            dark: "#3AB89D",
            contrastText: "#FFFFFF",
        },
    },
});

export { myTheme };
