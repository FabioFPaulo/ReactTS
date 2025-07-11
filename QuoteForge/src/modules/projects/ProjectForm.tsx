import MyTextField from "@/components/forms/MyTextField";
import type Project from "@/repositories/ProjectRepository/models/Project";
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

type ComponentProps = {
    handleClose(): void;
    handleSubmit(data: Project): void;
    project: Project | null;
    loading: boolean;
};

interface FormValues {
    name: string;
}

export default function ProjectForm(props: ComponentProps) {
    const { control, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = useCallback(
        (data: FormValues) => {
            const x = props.project!;
            x.name = data.name;

            props.handleSubmit(x);
        },
        [props]
    );

    useEffect(() => {
        setValue("name", props.project?.name ?? "");
    }, [props.project, setValue]);

    return (
        <Dialog open={!!props.project}>
            {props.loading && <LinearProgress />}
            <DialogTitle>
                {props.project?.id === "" ? "New Project" : "Update Project"}
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
