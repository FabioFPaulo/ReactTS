import type { BaseListReturn, BaseListState } from "@/@types/base";
import useMyAlert from "@/hooks/useMyAlert";
import FirebaseProjectRepository from "@/repositories/ProjectRepository/FirebaseProjectRepository";
import type Project from "@/repositories/ProjectRepository/models/Project";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useProjects(
    userId: string,
    fetchOnInit: boolean = true
): BaseListReturn<Project> {
    const [projects, setProjects] = useState<BaseListState<Project>>({
        loading: false,
        data: [],
    });

    const updateLoading = useCallback((loading: boolean) => {
        setProjects((e) => ({ ...e, loading }));
    }, []);

    const repo = useMemo(() => new FirebaseProjectRepository(userId), [userId]);
    const alert = useMyAlert();

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

    useEffect(() => {
        if (fetchOnInit) {
            getAll();
        }
    }, [fetchOnInit, getAll]);

    return [projects, getAll];
}
