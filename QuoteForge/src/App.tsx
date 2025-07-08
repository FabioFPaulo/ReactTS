import AlertProvider from "@/contexts/alert/Provider";
import AuthenticationProvider from "@/contexts/authentication/Provider";
import PrivateLayoutProvider from "@/contexts/privateLayout/Provider";
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
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AlertProvider>
                <AuthenticationProvider>
                    {(status) => (
                        <BrowserRouter>
                            <Routes>
                                {status === "AUTHENTICATED" ? (
                                    <Route element={<PrivateLayoutProvider />}>
                                        <Route index element={<HomeScreen />} />
                                    </Route>
                                ) : [
                                      "INVALID_EMAIL",
                                      "INVALID_PROFILE",
                                  ].includes(status) ? (
                                    <>
                                        <Route
                                            index
                                            element={
                                                <FirstStepsScreen
                                                    defaultStep={
                                                        status ===
                                                        "INVALID_EMAIL"
                                                            ? 0
                                                            : 1
                                                    }
                                                />
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Route
                                            index
                                            element={<LoginScreen />}
                                        />
                                        <Route
                                            path="register"
                                            element={<RegisterScreen />}
                                        />
                                    </>
                                )}
                                <Route
                                    path="*"
                                    element={<Navigate to={"/"} />}
                                />
                                <Route
                                    path="verified"
                                    element={<div>verified</div>}
                                />
                            </Routes>
                        </BrowserRouter>
                    )}
                </AuthenticationProvider>
            </AlertProvider>
        </ThemeProvider>
    );
}

export default App;
