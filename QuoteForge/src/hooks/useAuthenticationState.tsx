import type { AuthenticationState } from "@/@types/authentication";
import FirebaseUserRepository from "@/repositories/UserRepository/FirebaseUserRepository";
import MyUser from "@/repositories/UserRepository/models/MyUser";
import { useEffect, useState } from "react";

const repo = new FirebaseUserRepository();

export default function useAuthenticationState() {
    const [state, setState] = useState<AuthenticationState>({
        loading: true,
        loadingLabel: "",
        status: "UNAUTHENTICATED",
        user: null,
        profile: null,
    });

    useEffect(() => {
        const unlisten = repo.onAuthChanged(async (authUser) => {
            setState((e) => ({
                ...e,
                loading: true,
                loadingLabel: "checking user data",
            }));

            if (authUser) {
                const profile = await repo.getProfile(authUser.uid);
                setState({
                    loading: false,
                    loadingLabel: "",
                    status: !authUser.emailVerified
                        ? "INVALID_EMAIL"
                        : profile === null
                        ? "INVALID_PROFILE"
                        : "AUTHENTICATED",
                    user: MyUser.fromCredential(authUser),
                    profile,
                });
            } else {
                setState({
                    loading: false,
                    loadingLabel: "",
                    status: "UNAUTHENTICATED",
                    user: null,
                    profile: null,
                });
            }
        });

        return () => {
            unlisten();
        };
    }, []);

    return state;
}
