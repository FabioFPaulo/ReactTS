import {
    Grid,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const AuthenticationLayout: React.FC<Props> = ({ children }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid size={{ xs: 8, md: 6, lg: 4 }} height="100vh" display="flex">
                <Paper
                    elevation={matches ? 1 : 0}
                    sx={{
                        alignSelf: "center",
                        py: 5,
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    <Grid container justifyContent="center" rowSpacing={5}>
                        <Grid size={{ xs: 12, sm: 10, md: 9, lg: 10, xl: 8 }}>
                            <Stack alignItems="center">
                                <img
                                    alt="logo"
                                    width="50%"
                                    src={
                                        import.meta.env.BASE_URL +
                                        "LogoLarge.png"
                                    }
                                />
                                <Typography variant="caption" color="#111D67">
                                    Craft professional quotes in minutes
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 10, md: 9, lg: 10, xl: 8 }}>
                            {children}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AuthenticationLayout;
