import type { PrivateLayoutContextType } from "@/@types/privateLayout";
import { createContext } from "react";

export const PrivateLayoutContext =
    createContext<PrivateLayoutContextType | null>(null);
