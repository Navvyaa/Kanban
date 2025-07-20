export interface TaskType {
    id:string,
    title: string,
    priority: 'low' | 'medium' | 'high',
    assignee: string,
    columnId: string,
}

export interface ColumnType {
    id: string,
    title: string;
}