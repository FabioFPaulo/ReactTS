import type {
    Breadcrumb,
    PrivateLayoutContextType,
} from "@/@types/privateLayout";
import MyAppBar from "@/components/MyAppBar";
import MyBreadcrumbs from "@/components/MyBreadcrumbs";
import { PrivateLayoutContext } from "@/contexts/privateLayout/Context";
import useAuthenticationState from "@/hooks/useAuthenticationState";
import { Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Outlet } from "react-router";

export default function PrivateLayoutProvider() {
    const [title, setTitle] = useState<string>("");
    const [subtitle, setSubtitle] = useState<string | null>(null);

    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    const [auth] = useAuthenticationState();

    const initPage = useCallback<PrivateLayoutContextType["initPage"]>(
        (title, subtitle, breadcrumbs) => {
            setTitle(title);
            setSubtitle(subtitle);
            setBreadcrumbs(breadcrumbs);
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
                <Grid size={{ xs: 11, sm: 10 }}>
                    <MyBreadcrumbs
                        breadcrumbs={breadcrumbs}
                        loading={auth.loading}
                    />
                    <Typography variant="h5" color="#333">
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="h6" color="#999">
                            {subtitle}
                        </Typography>
                    )}
                </Grid>
                <Grid size={{ xs: 11, sm: 10 }}>
                    {auth.profile !== null && !auth.loading && <Outlet />}
                </Grid>
            </Grid>
        </PrivateLayoutContext.Provider>
    );
}
