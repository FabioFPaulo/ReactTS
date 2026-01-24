import type { BaseListReturn, BaseListState } from "@/@types/base";
import useMyAlert from "@/hooks/useMyAlert";
import FirebaseBudgetRepository from "@/repositories/BudgetsRepository/FirebaseBudgetRepository";
import type Budget from "@/repositories/BudgetsRepository/models/Budget";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useBudgets(
    userId: string,
    projectId: string
): BaseListReturn<Budget> {
    const [budgets, setBudgets] = useState<BaseListState<Budget>>({
        loading: false,
        data: [],
    });

    const updateLoading = useCallback((loading: boolean) => {
        setBudgets((e) => ({ ...e, loading }));
    }, []);

    const repo = useMemo(
        () => new FirebaseBudgetRepository(userId, projectId),
        [projectId, userId]
    );
    const alert = useMyAlert();

    const getAll = useCallback(async () => {
        try {
            updateLoading(true);
            const b = await repo.getAll();
            setBudgets({
                data: b,
                loading: false,
            });
        } catch {
            alert.openAlert("error", "Error on get budgets");
            updateLoading(false);
        }
    }, [alert, repo, updateLoading]);

    useEffect(() => {
        getAll();
    }, [getAll]);

    return [budgets, getAll];
}
