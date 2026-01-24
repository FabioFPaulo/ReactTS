import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Avatar,
    Card,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    type GridBaseProps,
} from "@mui/material";
import { useState } from "react";

type Props = { size?: GridBaseProps["size"] } & ItemProps;

interface ItemProps {
    label: string;
    loading?: boolean;
    onClick?(): void;
    onUpdate?(): void;
    onDelete?(): void;
}

export default function CardListItem({ size, ...itemProps }: Props) {
    if (size) {
        return (
            <Grid size={{ xs: 6, md: 4, lg: 3, xl: 2 }}>
                <Item {...itemProps} />
            </Grid>
        );
    }
    return <Item {...itemProps} />;
}

function Item(props: ItemProps) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Card variant="outlined">
            <ListItem
                secondaryAction={
                    <IconButton
                        edge="end"
                        size="small"
                        onClick={handleOpenUserMenu}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                disablePadding
            >
                <ListItemButton onClick={props.onClick}>
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
                    <ListItemText color="#111D67" primary={props.label} />
                </ListItemButton>
            </ListItem>
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
                <MenuItem
                    disabled={props.loading}
                    onClick={
                        props.onUpdate
                            ? () => {
                                  props.onUpdate!();
                                  handleCloseUserMenu();
                              }
                            : undefined
                    }
                >
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem
                    disabled={props.loading}
                    onClick={
                        props.onDelete
                            ? () => {
                                  props.onDelete!();
                                  handleCloseUserMenu();
                              }
                            : undefined
                    }
                >
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </Card>
    );
}
