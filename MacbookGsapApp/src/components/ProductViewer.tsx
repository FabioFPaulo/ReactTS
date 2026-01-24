import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "./store";
import ModelSwitcher from "./three/ModelSwitcher";
import StudioLights from "./three/StudioLights";

const ProductViewer = () => {
    const macbook = useMacbookStore();

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <section id="product-viewer">
            <h2>Take a closer look.</h2>
            <div className="controls">
                {/* <p className="info">
                    Macbook Pro | Available in 14" & 16" in Space Gray & Dark
                    colors
                </p> */}
                <div className="flex-center gap-5 mt-5">
                    <div className="color-control">
                        <div
                            className={clsx(
                                "bg-neutral-300",
                                macbook.color === "#adb5bd" && "active",
                            )}
                            onClick={() => macbook.setColor("#adb5bd")}
                        />
                        <div
                            className={clsx(
                                "bg-neutral-900",
                                macbook.color === "#2e2c2e" && "active",
                            )}
                            onClick={() => macbook.setColor("#2e2c2e")}
                        />
                    </div>
                    <div className="size-control">
                        <div
                            className={clsx(
                                macbook.scale === 0.06
                                    ? "bg-white text-black"
                                    : "bg-transparent text-white",
                            )}
                            onClick={() => macbook.setScale(0.06)}
                        >
                            <p>14"</p>
                        </div>
                        <div
                            className={clsx(
                                macbook.scale === 0.08
                                    ? "bg-white text-black"
                                    : "bg-transparent text-white",
                            )}
                            onClick={() => macbook.setScale(0.08)}
                        >
                            <p>16"</p>
                        </div>
                    </div>
                </div>
            </div>

            <Canvas
                id="canvas"
                camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
            >
                <StudioLights />

                <ModelSwitcher
                    scale={isMobile ? macbook.scale - 0.03 : macbook.scale}
                    isMobile={isMobile}
                />
            </Canvas>
        </section>
    );
};

export default ProductViewer;
