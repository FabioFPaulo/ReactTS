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
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@hooks": path.resolve(__dirname, "./src/hooks/"),
            "@modules": path.resolve(__dirname, "./src/modules/"),
            "@contexts": path.resolve(__dirname, "./src/contexts/"),
            "@repositories": path.resolve(__dirname, "./src/repositories"),
        },
    },
});
