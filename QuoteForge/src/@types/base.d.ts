export interface FirebaseDataState<T> {
    data: T[];
    loading: boolean;
}

export interface BaseRepositoryActions<T> {
    remove(id: string): Promise<void>;
    update(data: T): Promise<void>;
    add(data: T): Promise<void>;
    getAll(): Promise<void>;
    loading: boolean;
}

export type FirebaseHookReturn<T> = [
    FirebaseDataState<T>,
    BaseRepositoryActions<T>
];
