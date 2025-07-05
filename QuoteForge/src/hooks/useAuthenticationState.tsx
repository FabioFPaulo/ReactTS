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
    });

    useEffect(() => {
        const unlisten = repo.onAuthChanged((authUser) => {
            setState((e) => ({
                ...e,
                loading: true,
                loadingLabel: "checking user data",
            }));

            if (authUser) {
                setState({
                    loading: false,
                    loadingLabel: "",
                    status: "INVALID_EMAIL",
                    user: MyUser.fromCredential(authUser),
                });
            } else {
                setState({
                    loading: false,
                    loadingLabel: "",
                    status: "UNAUTHENTICATED",
                    user: null,
                });
            }
        });

        return () => {
            unlisten();
        };
    }, []);

    return state;
}
