import type { AuthenticationProviderProps } from "@/@types/authentication";
import Loading from "@/components/loading";
import { AuthenticationContext } from "@/contexts/authentication/Context";
import useAuthenticationState from "@/hooks/useAuthenticationState";
import useMyAlert from "@/hooks/useMyAlert";
import FirebaseUserRepository from "@/repositories/UserRepository/FirebaseUserRepository";
import { FirebaseError } from "firebase/app";
import React, { useCallback } from "react";

const repo = new FirebaseUserRepository();

const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
    children,
}) => {
    const alert = useMyAlert();
    const [authenticationState, reloadState] = useAuthenticationState();

    const login = useCallback(
        async (email: string, password: string) => {
            try {
                await repo.login(email, password);
            } catch (error) {
                const title =
                    error instanceof FirebaseError
                        ? "Invalid email or password"
                        : "Unkown error";
                alert.openAlert("error", title);
            }
        },
        [alert]
    );

    const register = useCallback(
        async (email: string, password: string) => {
            try {
                await repo.register(email, password);
            } catch (error) {
                const title =
                    error instanceof FirebaseError
                        ? "Invalid email or password"
                        : "Unkown error";
                alert.openAlert("error", title);
            }
        },
        [alert]
    );

    const logout = useCallback(async () => await repo.logout(), []);

    return (
        <AuthenticationContext.Provider
            value={{ login, register, logout, reloadState }}
        >
            {authenticationState.loading ? (
                <Loading.FullScreen label={authenticationState.loadingLabel} />
            ) : (
                children(authenticationState.status)
            )}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
