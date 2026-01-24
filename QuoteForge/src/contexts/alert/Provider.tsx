import type {
    AlertContextType,
    AlertProviderProps,
    AlertState,
} from "@/@types/alert";
import { AlertContext } from "@/contexts/alert/Context";
import {
    Alert,
    AlertTitle,
    Snackbar,
    type SnackbarCloseReason,
} from "@mui/material";
import { useCallback, useState } from "react";

const defaultState: AlertState = {
    open: false,
    description: null,
    severity: "success",
    title: "Alert",
};

export default function AlertProvider(props: AlertProviderProps) {
    const [state, setState] = useState<AlertState>(defaultState);

    const openAlert = useCallback<AlertContextType["openAlert"]>(
        (severity, title, description = null) => {
            setState({
                open: true,
                severity,
                title,
                description,
            });
        },
        []
    );

    const handleClose = (
        _?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setState((e) => ({ ...e, open: false }));
    };

    return (
        <AlertContext.Provider value={{ openAlert }}>
            {props.children}
            <Snackbar
                open={state.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={state.severity}
                    sx={{ width: "100%" }}
                >
                    {state.description ? (
                        <>
                            <AlertTitle>{state.title}</AlertTitle>
                            {state.description}
                        </>
                    ) : (
                        state.title
                    )}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
}
