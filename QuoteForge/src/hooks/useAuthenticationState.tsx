import type { AuthenticationState } from "@/@types/authentication";
import FirebaseUserRepository from "@/repositories/UserRepository/FirebaseUserRepository";
import MyUser from "@/repositories/UserRepository/models/MyUser";
import type { User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

const repo = new FirebaseUserRepository();

type ReturnType = [
    AuthenticationState,
    (
        authUser?: User | null,
        forceReload?: boolean
    ) => Promise<AuthenticationState>
];

export default function useAuthenticationState() {
    const [state, setState] = useState<AuthenticationState>({
        loading: true,
        loadingLabel: "",
        status: "UNAUTHENTICATED",
        user: null,
        profile: null,
    });

    const reloadUser = useCallback(
        async (authUser: User | null = null, forceReload: boolean = false) => {
            if (forceReload) {
                setState((e) => ({
                    ...e,
                    loading: true,
                    loadingLabel: "checking user data",
                }));
            }

            const user = authUser || repo.user;

            if (user) {
                const profile = await repo.getProfile(user.uid);
                const st: AuthenticationState = {
                    loading: false,
                    loadingLabel: "",
                    status: !user.emailVerified
                        ? "INVALID_EMAIL"
                        : profile === null
                        ? "INVALID_PROFILE"
                        : "AUTHENTICATED",
                    user: MyUser.fromCredential(user),
                    profile,
                };
                setState(st);
                return st;
            } else {
                const st: AuthenticationState = {
                    loading: false,
                    loadingLabel: "",
                    status: "UNAUTHENTICATED",
                    user: null,
                    profile: null,
                };
                setState(st);
                return st;
            }
        },
        []
    );

    useEffect(() => {
        const unlisten = repo.onAuthChanged(async (authUser) =>
            reloadUser(authUser, true)
        );

        return () => {
            unlisten();
        };
    }, [reloadUser]);

    return [state, reloadUser] as ReturnType;
}
