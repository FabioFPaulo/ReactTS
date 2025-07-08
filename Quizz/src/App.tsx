import { myTheme } from "@/components/ui/theme";
import GameScreen from "@/screens/GameScreen";
import WelcomeScreen from "@/screens/WelcomeScreen";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid, ThemeProvider } from "@mui/material";
import { useState } from "react";

function App() {
    const [page, setPage] = useState<number>(0);

    return (
        <ThemeProvider theme={myTheme}>
            <Grid container width="100vw" height="100vh" paddingX={3}>
                <Grid size={12} alignSelf="center">
                    {page === 0 ? (
                        <WelcomeScreen onClick={() => setPage(1)} />
                    ) : page === 1 ? (
                        <GameScreen />
                    ) : (
                        2
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
