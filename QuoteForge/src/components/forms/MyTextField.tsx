import type { MyTextFieldBaseProps } from "@/@types/fields";
import { TextField } from "@mui/material";
import {
    useController,
    type FieldValues,
    type UseControllerProps,
} from "react-hook-form";

export default function MyTextField<T extends FieldValues>(
    props: MyTextFieldBaseProps & UseControllerProps<T>
) {
    const { field, fieldState, formState } = useController(props);

    return (
        <TextField
            label={props.label}
            variant="filled"
            fullWidth
            size="small"
            name={field.name}
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            autoComplete="off"
            disabled={formState.isSubmitting}
            type={props.type}
        />
    );
}
