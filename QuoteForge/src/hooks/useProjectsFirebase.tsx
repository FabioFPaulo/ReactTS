import type { FirebaseDataState, FirebaseHookReturn } from "@/@types/base";
import useMyAlert from "@/hooks/useMyAlert";
import FirebaseProjectRepository from "@/repositories/ProjectRepository/FirebaseProjectRepository";
import type Project from "@/repositories/ProjectRepository/models/Project";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useProjectsFirebase(
    userId: string,
    fetchOnInit: boolean = true
): FirebaseHookReturn<Project> {
    const [projects, setProjects] = useState<FirebaseDataState<Project>>({
        data: [],
        loading: false,
    });

    const [loadingAction, setLoadingAction] = useState<boolean>(false);

    const repo = useMemo(() => new FirebaseProjectRepository(userId), [userId]);
    const alert = useMyAlert();

    const updateLoading = useCallback((loading: boolean) => {
        setProjects((e) => ({ ...e, loading }));
    }, []);

    const getAll = useCallback(async () => {
        try {
            updateLoading(true);
            const p = await repo.getAll();
            setProjects({
                data: p,
                loading: false,
            });
        } catch {
            alert.openAlert("error", "Error on get projects");
            updateLoading(false);
        }
    }, [alert, repo, updateLoading]);

    const update = useCallback(
        async (project: Project) => {
            try {
                setLoadingAction(true);
                await repo.update(project);
                getAll();
                setLoadingAction(false);
            } catch {
                alert.openAlert("error", "Error on update data");
                setLoadingAction(false);
            }
        },
        [alert, getAll, repo]
    );

    const add = useCallback(
        async (project: Project) => {
            try {
                setLoadingAction(true);
                await repo.add(project);
                getAll();
                setLoadingAction(false);
            } catch {
                alert.openAlert("error", "Error on add data");
                setLoadingAction(false);
            }
        },
        [alert, getAll, repo]
    );

    const remove = useCallback(
        async (projectId: string) => {
            try {
                setLoadingAction(true);
                await repo.remove(projectId);
                getAll();
                setLoadingAction(false);
            } catch {
                alert.openAlert("error", "Error on remove data");
                setLoadingAction(false);
            }
        },
        [alert, getAll, repo]
    );

    useEffect(() => {
        if (fetchOnInit) {
            getAll();
        }
    }, [fetchOnInit, getAll]);

    return [
        projects,
        {
            getAll,
            add,
            update,
            remove,
            loading: loadingAction,
        },
    ];
}
