import type React from "react";

export interface MyTextFieldBaseProps {
    label: string;
    isLoading?: boolean;
    type?: React.HTMLInputTypeAttribute;
}

export interface MyButtonSubmitProps {
    label: string;
    isLoading?: boolean;
}
