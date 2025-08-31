import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
    return (
        <HeroUIProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <AnimatedRoutes />
            </BrowserRouter>
        </HeroUIProvider>
    );
}

export default App;
