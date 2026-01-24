import type { InputProps, TextFieldProps } from "@mui/material";
import type React from "react";

export interface MyTextFieldBaseProps {
  label: string;
  isLoading?: boolean;
  type?: React.HTMLInputTypeAttribute;
  variant?: TextFieldProps["variant"];
  endAndornment?: (disabled: boolean) => InputProps["endAdornment"];
  size?: TextFieldProps["size"];
}

export interface MyButtonSubmitProps {
  label: string;
  isLoading?: boolean;
}

export interface MySwitchProps {
  label: string;
}
