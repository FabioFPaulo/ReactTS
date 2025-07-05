import type { AuthenticationContextType } from "@/@types/authentication";
import { createContext } from "react";

export const AuthenticationContext =
    createContext<AuthenticationContextType | null>(null);
