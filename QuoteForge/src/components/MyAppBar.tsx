import {
    AppBar,
    Avatar,
    Box,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Skeleton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

type Props = {
    loading: boolean;
};

export default function MyAppBar(props: Props) {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar sx={{ bgcolor: "white", mb: 3 }} position="static">
            <Grid container justifyContent="center">
                <Grid size={{ xs: 11, sm: 10 }}>
                    <Toolbar disableGutters>
                        <Box flex={1}>
                            <img
                                alt="logo"
                                src={import.meta.env.BASE_URL + "LogoSmall.png"}
                                height="40rem"
                            />
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {props.loading ? (
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                            ) : (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="/static/images/avatar/2.jpg"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem
                                                key={setting}
                                                onClick={handleCloseUserMenu}
                                            >
                                                <Typography
                                                    sx={{ textAlign: "center" }}
                                                >
                                                    {setting}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Grid>
            </Grid>
        </AppBar>
    );
}
