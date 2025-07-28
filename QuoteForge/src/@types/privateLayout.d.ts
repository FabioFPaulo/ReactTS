import type MyUser from "@/repositories/UserRepository/models/MyUser";
import type MyUserProfile from "@/repositories/UserRepository/models/MyUserProfile";
import { SvgIconComponent } from "@material-ui/icons";

export interface PrivateLayoutContextType {
    initPage(
        title: string,
        subtile: string | null,
        breadcrumbs: Breadcrumb[],
        useBackButton?: boolean,
        actionButton?: ActionButton | null
    ): void;
    firstName: string | null;
    userId: string | null;
    user: MyUser | null;
    profile: MyUserProfile | null;
}

export interface Breadcrumb {
    to: string;
    Icon: SvgIconComponent;
    label: string;
    active: boolean;
}

export interface ActionButton {
    label: string;
    onClick(): void;
    startIcon?: React.ReactNode;
}
