import type { MyTextFieldBaseProps } from "@/@types/fields";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
    useController,
    type FieldValues,
    type UseControllerProps,
} from "react-hook-form";

export default function MyDateField<T extends FieldValues>(
    props: MyTextFieldBaseProps & UseControllerProps<T>
) {
    const { field, fieldState, formState } = useController(props);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                label={props.label}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                name={field.name}
                slotProps={{
                    textField: {
                        variant: "filled",
                        size: "small",
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                        autoComplete: "off",
                        disabled: formState.isSubmitting,
                    },
                }}
            />
        </LocalizationProvider>
    );
}
