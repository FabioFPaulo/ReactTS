import type MyUser from "@/repositories/UserRepository/models/MyUser";
import type React from "react";

export interface AuthenticationContextType {
    login(email: string, password: string): Promise<void>;
    register(email: string, password: string): Promise<void>;
}

export interface AuthenticationProviderProps {
    children(status: AuthenticationStatus): React.ReactNode;
}

export interface AuthenticationState {
    loading: boolean;
    loadingLabel: string;
    status: AuthenticationStatus;
    user: MyUser | null;
}

export type AuthenticationStatus =
    | "UNAUTHENTICATED"
    | "INVALID_EMAIL"
    | "INVALID_PROFILE"
    | "AUTHENTICATED";
