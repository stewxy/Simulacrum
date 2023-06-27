export interface APIResponse<T> {
    loading: boolean;
    error: boolean;
    data: T | null;
}