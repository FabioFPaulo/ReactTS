import type { MyTextFieldBaseProps } from "@/@types/fields";
import InputMask from "@mona-health/react-input-mask";
import { TextField } from "@mui/material";
import {
    useController,
    type FieldValues,
    type UseControllerProps,
} from "react-hook-form";

export default function MyTextField<T extends FieldValues>(
    props: MyTextFieldBaseProps & UseControllerProps<T> & { mask?: string }
) {
    const { field, fieldState, formState } = useController(props);

    if (props.mask)
        return (
            <InputMask
                mask={props.mask}
                disabled={formState.isSubmitting}
                value={field.value}
                onChange={
                    ((event) => field.onChange(event.target.value)) as
                        | React.ChangeEventHandler<
                              HTMLInputElement | HTMLTextAreaElement
                          >
                        | undefined
                }
            >
                <TextField
                    label={props.label}
                    variant="filled"
                    fullWidth
                    size="small"
                    name={field.name}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    autoComplete="off"
                    disabled={formState.isSubmitting}
                    type={props.type}
                />
            </InputMask>
        );

    return (
        <TextField
            label={props.label}
            variant="filled"
            fullWidth
            size="small"
            name={field.name}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            autoComplete="off"
            disabled={formState.isSubmitting}
            type={props.type}
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
        />
    );
}
