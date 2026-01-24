import type { BaseRepositoryActions } from "@/@types/base";
import useMyAlert from "@/hooks/useMyAlert";
import FirebaseProjectRepository from "@/repositories/ProjectRepository/FirebaseProjectRepository";
import type Project from "@/repositories/ProjectRepository/models/Project";
import { useCallback, useMemo, useState } from "react";

export default function useProjectActions(
    userId: string
): BaseRepositoryActions<Project> {
    const [loadingAction, setLoadingAction] = useState<boolean>(false);

    const repo = useMemo(() => new FirebaseProjectRepository(userId), [userId]);
    const alert = useMyAlert();

    const update = useCallback(
        async (project: Project, callback?: CallableFunction) => {
            try {
                setLoadingAction(true);
                await repo.update(project);
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
        async (project: Project, callback?: CallableFunction) => {
            try {
                setLoadingAction(true);
                await repo.add(project);
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
                const project = await repo.get(id);
                setLoadingAction(false);
                return project;
            } catch {
                alert.openAlert("error", "Error on get project data");
                setLoadingAction(false);
                throw "Error on get project";
            }
        },
        [alert, repo]
    );

    const remove = useCallback(
        async (projectId: string, callback?: CallableFunction) => {
            try {
                setLoadingAction(true);
                await repo.remove(projectId);
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
