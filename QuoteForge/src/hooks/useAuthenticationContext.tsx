import { AuthenticationContext } from "@/contexts/authentication/Context";
import { useContext } from "react";

export default function useAuthenticationContext() {
    const context = useContext(AuthenticationContext);
    return context!;
}
