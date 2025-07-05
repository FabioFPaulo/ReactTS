import AuthenticationProvider from "@/contexts/authentication/Provider";
import FirstStepsScreen from "@/modules/authentication/FirstStepsScreen";
import LoginScreen from "@/modules/authentication/LoginScreen";
import RegisterScreen from "@/modules/authentication/RegisterScreen";
import HomeScreen from "@/modules/private/HomeScreen";
import { theme } from "@/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthenticationProvider>
                {(status) => (
                    <BrowserRouter>
                        {status === "AUTHENTICATED" ? (
                            <Routes>
                                <Route index element={<HomeScreen />} />
                            </Routes>
                        ) : ["INVALID_EMAIL", "INVALID_PROFILE"].includes(
                              status
                          ) ? (
                            <Routes>
                                <Route
                                    index
                                    element={
                                        <FirstStepsScreen
                                            defaultStep={
                                                status === "INVALID_EMAIL"
                                                    ? 0
                                                    : 1
                                            }
                                        />
                                    }
                                ></Route>
                            </Routes>
                        ) : (
                            <Routes>
                                <Route index element={<LoginScreen />} />
                                <Route
                                    path="register"
                                    element={<RegisterScreen />}
                                />
                            </Routes>
                        )}
                    </BrowserRouter>
                )}
            </AuthenticationProvider>
        </ThemeProvider>
    );
}

export default App;
