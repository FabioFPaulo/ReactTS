import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router";
import HomePage from "../pages/Home/HomePage";
import ProjectsPage from "../pages/Projects/ProjectsPage";
import PageWrapper from "./PageWrapper";

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageWrapper>
                            <HomePage />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/disclaimer"
                    element={
                        <PageWrapper>
                            <ProjectsPage />
                        </PageWrapper>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}
