import type {
    ActionButton,
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
    Button,
    Grid,
    IconButton,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router";

export default function PrivateLayoutProvider() {
    const [title, setTitle] = useState<string>("");
    const [subtitle, setSubtitle] = useState<string | null>(null);

    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    const [backbutton, setBackbutton] = useState<boolean>(false);

    const [actionButton, setActionButton] = useState<ActionButton | null>(null);

    const [auth] = useAuthenticationState();

    const navigate = useNavigate();

    const initPage = useCallback<PrivateLayoutContextType["initPage"]>(
        (
            title,
            subtitle,
            breadcrumbs,
            usebackbutton = false,
            actionButton = null
        ) => {
            setTitle(title);
            setSubtitle(subtitle);
            setBreadcrumbs(breadcrumbs);
            setBackbutton(usebackbutton);
            setActionButton(actionButton);
        },
        []
    );

    return (
        <PrivateLayoutContext.Provider
            value={{
                initPage,
                firstName: auth.profile?.firstName ?? null,
                userId: auth.user?.id ?? null,
                user: auth.user,
                profile: auth.profile,
            }}
        >
            <Stack height="100vh" direction="column">
                <MyAppBar loading={auth.loading} />
                <Grid
                    container
                    alignItems="center"
                    direction="column"
                    height="100%"
                >
                    <Grid
                        size={{ xs: 11, sm: 10 }}
                        height="100%"
                        sx={{
                            userSelect: "none",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            mb={2}
                        >
                            {backbutton && (
                                <IconButton
                                    aria-label="back"
                                    size="medium"
                                    onClick={() => navigate(-1)}
                                >
                                    <ArrowBackIcon fontSize="inherit" />
                                </IconButton>
                            )}
                            <Box flex={1}>
                                <MyBreadcrumbs
                                    breadcrumbs={breadcrumbs}
                                    loading={auth.loading}
                                />
                            </Box>
                        </Stack>
                        <Stack direction="row" alignItems="flex-end" mb={3}>
                            <Box flex={1}>
                                {auth.loading ? (
                                    <Typography variant="h5" color="#333">
                                        <Skeleton
                                            variant="text"
                                            width={100}
                                            height="100%"
                                        />
                                    </Typography>
                                ) : (
                                    <Typography variant="h5" color="#333">
                                        {title}
                                    </Typography>
                                )}
                                {auth.loading ? (
                                    <Typography
                                        variant="h6"
                                        color="#999"
                                        mb={3}
                                    >
                                        <Skeleton
                                            variant="text"
                                            width={200}
                                            height="100%"
                                        />
                                    </Typography>
                                ) : (
                                    subtitle && (
                                        <Typography variant="h6" color="#999">
                                            {subtitle}
                                        </Typography>
                                    )
                                )}
                            </Box>
                            {actionButton !== null && (
                                <Button
                                    onClick={actionButton.onClick}
                                    variant="contained"
                                    size="small"
                                    startIcon={actionButton.startIcon}
                                >
                                    {actionButton.label}
                                </Button>
                            )}
                        </Stack>
                        {auth.profile !== null &&
                            auth.user !== null &&
                            !auth.loading && <Outlet />}
                    </Grid>
                </Grid>
            </Stack>
        </PrivateLayoutContext.Provider>
    );
}
