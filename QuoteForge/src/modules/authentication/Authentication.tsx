import type { AuthenticationStatus } from "@/@types/authentication";
import FirstStepsScreen from "@/modules/authentication/FirstStepsScreen";
import LoginScreen from "@/modules/authentication/LoginScreen";

interface Props {
    sessionType: AuthenticationStatus;
}

export default function Authentication(props: Props) {
    switch (props.sessionType) {
        case "AUTHENTICATED":
            return "AUTHENTICATED";
        case "INVALID_EMAIL":
            return <FirstStepsScreen />;
        case "INVALID_PROFILE":
            return <FirstStepsScreen />;
        case "UNAUTHENTICATED":
            return <LoginScreen />;
    }
    return <div>Authentication</div>;
}
