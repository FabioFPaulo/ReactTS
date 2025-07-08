import usePrivateLayout from "@/hooks/usePrivateLayout";
import { useEffect } from "react";

import ConstructionIcon from "@mui/icons-material/Construction";
import HomeIcon from "@mui/icons-material/Home";

export default function ProjectsScreen() {
    const { initPage } = usePrivateLayout();

    useEffect(() => {
        initPage("Projects", "Check out all your projects", [
            {
                to: "/",
                Icon: HomeIcon,
                label: "Home",
                active: false,
            },
            {
                to: "/projects",
                Icon: ConstructionIcon,
                label: "My projects",
                active: true,
            },
        ]);
    }, [initPage]);
    return <div>ProjectsScreen</div>;
}
