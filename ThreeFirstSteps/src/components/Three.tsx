import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import type { ObjectMap } from "@react-three/fiber";
import { folder, useControls } from "leva";
import type { FolderInput } from "leva/dist/declarations/src/types";
import { useEffect, useRef, useState } from "react";
import { OrbitControls as OrbitControlsImpl, type GLTF } from "three-stdlib";
import { angleToRadians } from "../utils/angle";

type TAllowedObjects = {
    name: string;
    object_name: string;
    start_pos: {
        axis: "X" | "Y" | "Z";
        value: number;
    };
    end_pos: {
        axis: "X" | "Y" | "Z";
        value: number;
    };
};

function getAllowedObjectsData(d: GLTF & ObjectMap) {
    return JSON.parse(
        d.scene.userData["custom_object_data"]
    ) as TAllowedObjects[];
}

function convertToForm(data: TAllowedObjects) {
    return {
        [`${data.name}_label`]: {
            value: data.object_name,
            label: "Object Name",
        },
        [`${data.name}_axis`]: {
            value: data.start_pos.axis,
            label: "Axis",
        },
        [`${data.name}_action`]: {
            value: data.start_pos.value,
            min: data.start_pos.value,
            max: data.end_pos.value,
            step: 0.001,
            label: "Position",
        },
        [`${data.name}_invert`]: {
            value: false,
            label: "Invert",
        },
        [`${data.name}_pointer_axis`]: {
            value: "Y",
            label: "Pointer Axis",
        },
    };
}

export default function Three() {
    const gltf = useGLTF(import.meta.env.BASE_URL + "car.glb");
    const orbitControls = useRef<OrbitControlsImpl>(null);
    const sceneRef = useRef(null);

    const [data, setData] = useControls(() => {
        const data = JSON.parse(
            gltf.scene.userData["custom_object_data"]
        ) as TAllowedObjects[];

        const folders: Record<
            string,
            FolderInput<ReturnType<typeof convertToForm>>
        > = {};

        for (const obj of data) {
            folders[obj.name] = folder(convertToForm(obj));
        }

        return folders;
    });

    useEffect(() => {
        console.log("Data changed:", data);

        const allowedObjects = [
            ...new Set(
                Object.keys(data).map((objectName: string) =>
                    objectName
                        .replace("_label", "")
                        .replace("_axis", "")
                        .replace("_action", "")
                        .replace("_invert", "")
                )
            ),
        ];

        for (const objectName of allowedObjects) {
            const label = String(data[`${objectName}_label`]);
            const sceneObject = gltf.scene.getObjectByName(
                label.replaceAll(".", "")
            );

            if (!sceneObject) {
                console.log("Scene object not found for:", label);
                continue;
            }

            const axis = String(data[`${objectName}_axis`]).toLowerCase();
            const value = Number(data[`${objectName}_action`]);
            const invert = Boolean(data[`${objectName}_invert`]);

            const rotationValue = invert
                ? -angleToRadians(value)
                : angleToRadians(value);

            console.log(
                `Applying rotation to ${sceneObject.name}: axis=${axis}, value=${value}, rotation=${rotationValue}`
            );

            if (axis === "y") {
                sceneObject.rotation.y = rotationValue;
            } else if (axis === "x") {
                sceneObject.rotation.x = rotationValue;
            } else if (axis === "z") {
                sceneObject.rotation.z = rotationValue;
            }
        }
    }, [data, gltf.scene]);

    const [isDragging, setIsDragging] = useState<string | null>(null);
    const [prevPointerX, setPrevPointerX] = useState(0);
    const [prevPointerY, setPrevPointerY] = useState(0);
    const [oEnabled, setOEnabled] = useState(true);

    const handlePointerDown = (e: any) => {
        e.stopPropagation();

        const allowedNames = getAllowedObjectsData(gltf).map((obj) =>
            obj.object_name.replaceAll(".", "")
        );

        // Traverse up the hierarchy to find an allowed object
        let currentObject = e.object;
        let foundObjectName = null;

        while (currentObject) {
            if (allowedNames.includes(currentObject.name)) {
                foundObjectName = currentObject.name;
                break;
            }
            currentObject = currentObject.parent;
        }

        console.log("Clicked object:", foundObjectName);
        console.log("Allowed names:", allowedNames);

        if (!foundObjectName) {
            console.log("Object not in allowed list");
            return;
        }

        setIsDragging(foundObjectName);
        setOEnabled(false);
        setPrevPointerX(e.clientX);
        setPrevPointerY(e.clientY);

        if (e.target?.setPointerCapture) {
            e.target.setPointerCapture(e.pointerId);
        }
    };

    const handlePointerMove = (e: any) => {
        if (!isDragging) return;

        e.stopPropagation();

        const allowedObj = getAllowedObjectsData(gltf).find(
            (item) => item.object_name.replaceAll(".", "") === isDragging
        );

        if (!allowedObj) {
            console.log("Could not find allowed object data for:", isDragging);
            return;
        }

        const invert = Boolean(data[`${allowedObj.name}_invert`]);
        const pointerAxis = String(data[`${allowedObj.name}_pointer_axis`]);

        const deltaX = (e.clientX - prevPointerX) * (invert ? -1 : 1);
        const deltaY = e.clientY - prevPointerY;

        console.log("Delta X:", deltaX);
        console.log("Delta X:", deltaY);

        console.log("Allowed object found:", allowedObj.name);
        console.log("Current value:", data[`${allowedObj.name}_action`]);
        console.log(
            "Min:",
            allowedObj.start_pos.value,
            "Max:",
            allowedObj.end_pos.value
        );

        // Clamp the value within bounds
        const delta = pointerAxis === "Y" ? deltaY : deltaX;
        const newValue =
            (data[`${allowedObj.name}_action`] || 0) + delta * 0.06;
        const clampedValue = Math.max(
            allowedObj.start_pos.value,
            Math.min(allowedObj.end_pos.value, newValue)
        );

        console.log("New value:", clampedValue);

        setData({
            [`${allowedObj.name}_action`]: clampedValue,
        });

        setPrevPointerX(e.clientX);
        setPrevPointerY(e.clientY);
    };

    const handlePointerUp = (e: any) => {
        e.stopPropagation();
        setIsDragging(null);
        setOEnabled(true);

        if (e.target?.releasePointerCapture) {
            e.target.releasePointerCapture(e.pointerId);
        }
    };

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 10]} />
            <OrbitControls
                ref={orbitControls}
                enablePan={false}
                enabled={oEnabled}
                minPolarAngle={angleToRadians(60)}
                maxPolarAngle={angleToRadians(80)}
            />
            <primitive
                ref={sceneRef}
                object={gltf.scene}
                rotation={[0, 0, 0]}
                castShadow
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            />

            <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
                <planeGeometry args={[7, 7]} />
                <meshStandardMaterial color={"#777777"} />
            </mesh>
            <ambientLight args={["#ffffff", 0.25]} />
            <directionalLight args={["#ffffff", 1]} position={[0, 5, 5]} />
        </>
    );
}
