import usePrivateLayout from "@/hooks/usePrivateLayout";
import { useEffect } from "react";

import HomeIcon from "@mui/icons-material/Home";

export default function HomeScreen() {
    const { initPage, firstName } = usePrivateLayout();

    useEffect(() => {
        if (firstName) {
            initPage("Home", "Welcome " + firstName, [
                {
                    to: "/",
                    Icon: HomeIcon,
                    label: "Home",
                    active: true,
                },
            ]);
        }
    }, [firstName, initPage]);
    return <></>;
}
