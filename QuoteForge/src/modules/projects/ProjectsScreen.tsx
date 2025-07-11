import usePrivateLayout from "@/hooks/usePrivateLayout";
import { useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import {
    Avatar,
    Card,
    CardActionArea,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";

export default function ProjectsScreen() {
    const { initPage } = usePrivateLayout();

    useEffect(() => {
        initPage(
            "Projects",
            "Check out all your projects",
            [
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
            ],
            true,
            {
                label: "New Project",
                onClick() {},
                startIcon: <AddIcon />,
            }
        );
    }, [initPage]);
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 4, lg: 3, xl: 2 }}>
                <Card variant="outlined">
                    <CardActionArea>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: "#111D67AA",
                                        bgcolor: "#111D6711",
                                    }}
                                >
                                    <FolderIcon color="inherit" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                color="#111D67"
                                primary="Single-line item"
                            />
                        </ListItem>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
}
