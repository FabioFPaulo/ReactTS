import MyTextField from "@/components/forms/MyTextField";
import type Budget from "@/repositories/BudgetsRepository/models/Budget";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
    name: string;
}

type ComponentProps = {
    handleClose(): void;
    handleSubmit(data: Budget): void;
    budget: Budget | null;
    loading: boolean;
};

export default function BudgetForm(props: ComponentProps) {
    const { control, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = useCallback(
        (data: FormValues) => {
            const x = props.budget!;
            x.name = data.name;

            props.handleSubmit(x);
        },
        [props]
    );

    useEffect(() => {
        setValue("name", props.budget?.name ?? "");
    }, [props.budget?.name, setValue]);

    return (
        <Dialog open={!!props.budget}>
            {props.loading && <LinearProgress />}
            <DialogTitle>
                {props.budget?.id === "" ? "New Budget" : "Update Budget"}
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: 0 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MyTextField
                        control={control}
                        name="name"
                        label="Name"
                        isLoading={props.loading}
                        rules={{
                            required: "Name is required",
                        }}
                    />
                    <DialogActions>
                        <Button
                            type="button"
                            onClick={props.handleClose}
                            disabled={props.loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={props.loading}>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
