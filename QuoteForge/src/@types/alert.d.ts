import type { AlertProps } from "@mui/material";
import type React from "react";

export interface AlertContextType {
    openAlert(
        severity: AlertState["severity"],
        title: AlertState["title"],
        description?: AlertState["description"]
    ): void;
}
export interface AlertProviderProps {
    children: React.ReactNode;
}

export interface AlertState {
    open: boolean;
    title: string;
    description: string | null;
    severity: AlertProps["severity"];
}
