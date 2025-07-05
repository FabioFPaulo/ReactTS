import type { AuthenticationProviderProps } from "@/@types/authentication";
import Loading from "@/components/loading";
import { AuthenticationContext } from "@/contexts/authentication/Context";
import useAuthenticationState from "@/hooks/useAuthenticationState";
import React, { useCallback } from "react";

const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
    children,
}) => {
    const authenticationState = useAuthenticationState();

    const login = useCallback(async () => {}, []);
    const register = useCallback(async () => {}, []);

    return (
        <AuthenticationContext.Provider value={{ login, register }}>
            {authenticationState.loading ? (
                <Loading.FullScreen label={authenticationState.loadingLabel} />
            ) : (
                children(authenticationState.status)
            )}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
