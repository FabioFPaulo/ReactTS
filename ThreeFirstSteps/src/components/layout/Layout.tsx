import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Three from "../Three";
import { layoutContext } from "./layout";

export default function LayoutProvider() {
    return (
        <layoutContext.Provider value={{}}>
            <Canvas id="three-canvas-container">
                <Suspense fallback={null}>
                    <Three />
                </Suspense>
            </Canvas>
        </layoutContext.Provider>
    );
}
