import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsConfigPaths()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            "@components": path.resolve(__dirname, "./src/components/"),
            "@assets": "./src/assets/",
            "@hooks": "./src/hooks/",
            "@screens": "./src/screens/",
            "@repositories": path.resolve(__dirname, "./src/repositories"),
        },
    },
});
