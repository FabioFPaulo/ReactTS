import type { MyTextFieldBaseProps } from "@/@types/fields";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    type SelectProps,
} from "@mui/material";
import {
    useController,
    type FieldValues,
    type UseControllerProps,
} from "react-hook-form";

export default function MySelectField<T extends FieldValues>(
    props: MyTextFieldBaseProps &
        UseControllerProps<T> & {
            children: SelectProps["children"];
        }
) {
    const { field, fieldState, formState } = useController(props);

    return (
        <FormControl
            fullWidth
            error={!!fieldState.error}
            disabled={formState.isSubmitting}
            variant="filled"
        >
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                value={field.value}
                label={props.label}
                size="small"
                onChange={(v) => field.onChange(v)}
                name={field.name}
                autoComplete="off"
            >
                {props.children}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
}
