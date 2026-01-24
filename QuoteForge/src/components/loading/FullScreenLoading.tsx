import type { LoadingProps } from "@/@types/loading";
import { Backdrop, Stack, Typography } from "@mui/material";
import { BounceLoader } from "react-spinners";
export default function FullScreenLoading(props: LoadingProps) {
    return (
        <Backdrop open>
            <Stack alignItems="center" color="white">
                <BounceLoader color="white" />
                <Typography variant="overline" fontWeight="bold">
                    {props.label}
                </Typography>
            </Stack>
        </Backdrop>
    );
}
