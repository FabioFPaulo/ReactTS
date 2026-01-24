import type { MyButtonSubmitProps } from "@/@types/fields";
import { Button } from "@mui/material";
import { PulseLoader } from "react-spinners";

export default function MyButtonSubmit(props: MyButtonSubmitProps) {
    return (
        <Button
            loading={props.isLoading}
            loadingIndicator={<PulseLoader size={10} color="#111D67" />}
            variant="contained"
            type="submit"
        >
            {props.label}
        </Button>
    );
}
