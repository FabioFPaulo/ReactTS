import FirstStepsScreen from "@/screens/authentication/FirstStepsScreen";
import LoginScreen from "@/screens/authentication/LoginScreen";

interface Props {
    sessionType: SessionState;
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

export type SessionState =
    | "UNAUTHENTICATED"
    | "INVALID_EMAIL"
    | "INVALID_PROFILE"
    | "AUTHENTICATED";
