import type MyUser from "@/repositories/UserRepository/models/MyUser";
import type MyUserProfile from "@/repositories/UserRepository/models/MyUserProfile";
import type React from "react";

export interface AuthenticationContextType {
    login(email: string, password: string): Promise<void>;
    register(email: string, password: string): Promise<void>;
    logout: () => Promise<void>;
    reloadState: (
        authUser?: User | null,
        forceReload?: boolean
    ) => Promise<AuthenticationState>;
}

export interface AuthenticationProviderProps {
    children(status: AuthenticationStatus): React.ReactNode;
}

export interface AuthenticationState {
    loading: boolean;
    loadingLabel: string;
    status: AuthenticationStatus;
    user: MyUser | null;
    profile: MyUserProfile | null;
}

export type AuthenticationStatus =
    | "UNAUTHENTICATED"
    | "INVALID_EMAIL"
    | "INVALID_PROFILE"
    | "AUTHENTICATED";
