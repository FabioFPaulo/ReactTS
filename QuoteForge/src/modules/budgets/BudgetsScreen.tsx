import usePrivateLayout from "@/hooks/usePrivateLayout";
import useProjectActions from "@/hooks/useProjectActions";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import CardListItem from "@/components/cards/CardListItem";
import useBudgetActions from "@/hooks/useBudgetActions";
import useBudgets from "@/hooks/useBudgets";
import BudgetForm from "@/modules/budgets/BudgetForm";
import Budget from "@/repositories/BudgetsRepository/models/Budget";
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Grid, LinearProgress, Stack, Typography } from "@mui/material";

export default function BudgetsScreen() {
    const params = useParams();
    const navigate = useNavigate();

    const { initPage, userId } = usePrivateLayout();

    const { get: getProject } = useProjectActions(userId!);

    const [budgets, refetchBudgets] = useBudgets(userId!, params.projectId!);
    const budgetActions = useBudgetActions(userId!, params.projectId!);

    const [formOpen, setFormOpen] = useState<Budget | null>(null);

    const init = useCallback(async () => {
        const project = await getProject(params.projectId!);
        initPage(
            "Budgets",
            "Check out all your budgets",
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
                    active: false,
                },
                {
                    to: `/projects/${project.id}`,
                    Icon: FolderIcon,
                    label: project.name,
                    active: true,
                },
            ],
            true,
            {
                label: "New Budgett",
                onClick() {
                    setFormOpen(Budget.empty);
                },
                startIcon: <AddIcon />,
            }
        );
    }, [initPage, params.projectId, getProject]);

    const onFormSubmit = useCallback(
        async (data: Budget) => {
            if (data.id === "") {
                // create
                await budgetActions.add(data, refetchBudgets);
            } else {
                // update
                await budgetActions.update(data, refetchBudgets);
            }
            setFormOpen(null);
        },
        [budgetActions, refetchBudgets]
    );

    useEffect(() => {
        init();
    }, [init]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12} textAlign="center" height={4}>
                    {budgets.loading && <LinearProgress />}
                </Grid>

                {budgets.data.length === 0 && (
                    <Grid size={12}>
                        <Stack alignItems="center">
                            <Typography>
                                <SentimentDissatisfiedIcon />
                            </Typography>
                            <Typography>No budgets found</Typography>
                        </Stack>
                    </Grid>
                )}
                {budgets.data.length > 0 &&
                    budgets.data.map((budget) => (
                        <CardListItem
                            label={budget.name}
                            size={{ xs: 6, md: 4, lg: 3, xl: 2 }}
                            key={budget.id}
                            loading={budgetActions.loading}
                            onUpdate={() => setFormOpen(budget)}
                            onDelete={() =>
                                budgetActions.remove(budget.id, refetchBudgets)
                            }
                            onClick={() =>
                                navigate(
                                    `/projects/${params.projectId!}/${
                                        budget.id
                                    }`
                                )
                            }
                        />
                    ))}
            </Grid>
            <BudgetForm
                handleClose={() => setFormOpen(null)}
                handleSubmit={onFormSubmit}
                budget={formOpen}
                loading={budgetActions.loading}
            />
        </>
    );
}
