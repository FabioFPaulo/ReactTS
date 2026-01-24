import type { AlertContextType } from "@/@types/alert";
import { createContext } from "react";

export const AlertContext = createContext<AlertContextType | null>(null);
