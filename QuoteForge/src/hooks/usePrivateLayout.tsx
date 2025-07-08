import { PrivateLayoutContext } from "@/contexts/privateLayout/Context";
import { useContext } from "react";

export default function usePrivateLayout() {
    const context = useContext(PrivateLayoutContext);
    return context!;
}
