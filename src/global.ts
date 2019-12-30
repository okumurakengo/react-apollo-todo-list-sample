export interface ITodo {
    id: string;
    text: string;
    completed: boolean;
}

export enum FILTER {
    SHOW_ALL = 'SHOW_ALL',
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    SHOW_ACTIVE = 'SHOW_ACTIVE',
}
