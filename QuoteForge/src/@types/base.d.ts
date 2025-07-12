export interface BaseListState<T> {
    data: T[];
    loading: boolean;
}

export interface BaseRepositoryActions<T> {
    remove(id: string, callback?: CallableFunction): Promise<void>;
    update(data: T, callback?: CallableFunction): Promise<void>;
    add(data: T, callback?: CallableFunction): Promise<void>;
    get(id: string): Promise<T>;
    loading: boolean;
}

export type BaseListReturn<T> = [BaseListState<T>, () => Promise<void>];
