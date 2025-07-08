import usePrivateLayout from "@/hooks/usePrivateLayout";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useEffect } from "react";

import HomeIcon from "@mui/icons-material/Home";
import { Card, CardActionArea, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function HomeScreen() {
    const { initPage, firstName } = usePrivateLayout();
    const navigate = useNavigate();

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
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 4, lg: 3, xl: 2 }}>
                <Card
                    sx={{
                        userSelect: "none",
                        height: 150,

                        color: "#111D67",
                        transition: "all ease-out 100ms",
                        bgcolor: "#111D6701",
                        cursor: "pointer",
                        ":hover": {
                            bgcolor: "#111D6708",
                            scale: 1.1,
                            transition: "all ease-in 100ms",
                        },
                    }}
                >
                    <CardActionArea
                        onClick={() => navigate("projects")}
                        sx={{
                            display: "flex",
                            height: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography>
                            <ConstructionIcon />
                        </Typography>
                        <Typography>My Projects</Typography>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
}
