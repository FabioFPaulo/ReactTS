import type { BaseRepositoryActions } from "@/@types/base";
import useMyAlert from "@/hooks/useMyAlert";
import FirebaseBudgetRepository from "@/repositories/BudgetsRepository/FirebaseBudgetRepository";
import type Budget from "@/repositories/BudgetsRepository/models/Budget";
import { useCallback, useMemo, useState } from "react";

export default function useBudgetActions(
    userId: string,
    projectId: string
): BaseRepositoryActions<Budget> {
    const [loadingAction, setLoadingAction] = useState<boolean>(false);

    const repo = useMemo(
        () => new FirebaseBudgetRepository(userId, projectId),
        [projectId, userId]
    );
    const alert = useMyAlert();

    const update = useCallback(
        async (budget: Budget, callback?: CallableFunction) => {
            try {
                setLoadingAction(true);
                await repo.update(budget);
                if (callback) callback();
                setLoadingAction(false);
            } catch {
                alert.openAlert("error", "Error on update data");
                setLoadingAction(false);
            }
        },
        [alert, repo]
    );

    const add = useCallback(
        async (budget: Budget, callback?: CallableFunction) => {
            try {
                setLoadingAction(true);
                await repo.add(budget);
                if (callback) callback();
                setLoadingAction(false);
            } catch {
                alert.openAlert("error", "Error on add data");
                setLoadingAction(false);
            }
        },
        [alert, repo]
    );

    const getOne = useCallback(
        async (id: string) => {
            try {
                setLoadingAction(true);
                const budget = await repo.get(id);
                setLoadingAction(false);
                return budget;
            } catch {
                alert.openAlert("error", "Error on get budget data");
                setLoadingAction(false);
                throw "Error on get budget";
            }
        },
        [alert, repo]
    );

    const remove = useCallback(
        async (id: string, callback?: CallableFunction) => {
            try {
                setLoadingAction(true);
                await repo.remove(id);
                if (callback) callback();
                setLoadingAction(false);
            } catch {
                alert.openAlert("error", "Error on remove data");
                setLoadingAction(false);
            }
        },
        [alert, repo]
    );

    return {
        add,
        update,
        remove,
        loading: loadingAction,
        get: getOne,
    };
}
