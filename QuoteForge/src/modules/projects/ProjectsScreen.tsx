import usePrivateLayout from "@/hooks/usePrivateLayout";
import { useCallback, useEffect, useState } from "react";

import CardListItem from "@/components/cards/CardListItem";
import useProjectsFirebase from "@/hooks/useProjectsFirebase";
import ProjectForm from "@/modules/projects/ProjectForm";
import Project from "@/repositories/ProjectRepository/models/Project";
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeIcon from "@mui/icons-material/Home";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Grid, LinearProgress, Stack, Typography } from "@mui/material";

export default function ProjectsScreen() {
    const { initPage, userId } = usePrivateLayout();
    const [projects, projectActions] = useProjectsFirebase(userId!);

    const [formOpen, setFormOpen] = useState<Project | null>(null);

    const onFormSubmit = useCallback(
        async (data: Project) => {
            if (data.id === "") {
                // create
                await projectActions.add(data);
            } else {
                // update
                await projectActions.update(data);
            }
            setFormOpen(null);
        },
        [projectActions]
    );

    useEffect(() => {
        initPage(
            "Projects",
            "Check out all your projects",
            [
                {
                    to: "/",
                    Icon: HomeIcon,
                    label: "Home",
                    active: false,
                },
                {
                    to: "/projects",
                    Icon: ConstructionIcon,
                    label: "My projects",
                    active: true,
                },
            ],
            true,
            {
                label: "New Project",
                onClick() {
                    setFormOpen(Project.empty);
                },
                startIcon: <AddIcon />,
            }
        );
    }, [initPage]);
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12} textAlign="center" height={4}>
                    {projects.loading && <LinearProgress />}
                </Grid>

                {projects.data.length === 0 && (
                    <Grid size={12}>
                        <Stack alignItems="center">
                            <Typography>
                                <SentimentDissatisfiedIcon />
                            </Typography>
                            <Typography>No projects found</Typography>
                        </Stack>
                    </Grid>
                )}
                {projects.data.length > 0 &&
                    projects.data.map((project) => (
                        <CardListItem
                            label={project.name}
                            size={{ xs: 6, md: 4, lg: 3, xl: 2 }}
                            key={project.id}
                            loading={projectActions.loading}
                            onUpdate={() => setFormOpen(project)}
                            onDelete={() => projectActions.remove(project.id)}
                        />
                    ))}
            </Grid>
            <ProjectForm
                handleClose={() => setFormOpen(null)}
                handleSubmit={onFormSubmit}
                project={formOpen}
                loading={projectActions.loading}
            />
        </>
    );
}
