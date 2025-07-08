import type {
    Breadcrumb,
    PrivateLayoutContextType,
} from "@/@types/privateLayout";
import MyAppBar from "@/components/MyAppBar";
import MyBreadcrumbs from "@/components/MyBreadcrumbs";
import { PrivateLayoutContext } from "@/contexts/privateLayout/Context";
import useAuthenticationState from "@/hooks/useAuthenticationState";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Box,
    Grid,
    IconButton,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Outlet } from "react-router";

export default function PrivateLayoutProvider() {
    const [title, setTitle] = useState<string>("");
    const [subtitle, setSubtitle] = useState<string | null>(null);

    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    const [backbutton, setBackbutton] = useState<boolean>(false);

    const [auth] = useAuthenticationState();

    const initPage = useCallback<PrivateLayoutContextType["initPage"]>(
        (title, subtitle, breadcrumbs, usebackbutton = false) => {
            setTitle(title);
            setSubtitle(subtitle);
            setBreadcrumbs(breadcrumbs);
            setBackbutton(usebackbutton);
        },
        []
    );

    return (
        <PrivateLayoutContext.Provider
            value={{
                initPage,
                firstName: auth.profile?.firstName ?? null,
            }}
        >
            <Grid container justifyContent="center">
                <Grid size={12}>
                    <MyAppBar loading={auth.loading} />
                </Grid>
                <Grid size={{ xs: 11, sm: 10 }} sx={{ userSelect: "none" }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={2}
                    >
                        {backbutton && (
                            <IconButton aria-label="back" size="medium">
                                <ArrowBackIcon fontSize="inherit" />
                            </IconButton>
                        )}
                        <Box width="100%">
                            <MyBreadcrumbs
                                breadcrumbs={breadcrumbs}
                                loading={auth.loading}
                            />
                        </Box>
                    </Stack>
                    {auth.loading ? (
                        <Typography
                            variant="h5"
                            color="#333"
                            mb={subtitle ? 0 : 3}
                        >
                            <Skeleton
                                variant="text"
                                width={100}
                                height="100%"
                            />
                        </Typography>
                    ) : (
                        <Typography
                            variant="h5"
                            color="#333"
                            mb={subtitle ? 0 : 3}
                        >
                            {title}
                        </Typography>
                    )}
                    {auth.loading ? (
                        <Typography variant="h6" color="#999" mb={3}>
                            <Skeleton
                                variant="text"
                                width={200}
                                height="100%"
                            />
                        </Typography>
                    ) : (
                        subtitle && (
                            <Typography variant="h6" color="#999" mb={3}>
                                {subtitle}
                            </Typography>
                        )
                    )}
                </Grid>
                <Grid size={{ xs: 11, sm: 10 }}>
                    {auth.profile !== null && !auth.loading && <Outlet />}
                </Grid>
            </Grid>
        </PrivateLayoutContext.Provider>
    );
}
