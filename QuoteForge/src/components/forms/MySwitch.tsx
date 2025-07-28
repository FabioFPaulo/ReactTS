import type { MySwitchProps } from "@/@types/fields";
import { FormControlLabel, Switch } from "@mui/material";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

export default function MySwitch<T extends FieldValues>(
  props: MySwitchProps & UseControllerProps<T>,
) {
  const { field, formState } = useController(props);

  return (
    <FormControlLabel
      labelPlacement="start"
      disabled={formState.isSubmitting}
      label={props.label}
      sx={{ display: "flex", margin: 0, width: "100%" }}
      control={
        <Switch
          sx={{ ml: "auto" }}
          checked={field.value}
          onChange={(v) => field.onChange(v.target.checked)}
        />
      }
    />
  );
}
