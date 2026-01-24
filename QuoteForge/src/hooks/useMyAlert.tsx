import { AlertContext } from "@/contexts/alert/Context";
import { useContext } from "react";

export default function useMyAlert() {
    const context = useContext(AlertContext);
    return context!;
}
