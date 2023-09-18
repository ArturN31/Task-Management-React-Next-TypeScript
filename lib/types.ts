export interface TaskProps {
    id: string,
    content: string;
    due: Date | undefined;
    tags: string[];
    isCompleted: boolean;
    isOverdue: boolean;
}

export interface isVisibleProps {
    inProgress: boolean;
    completed: boolean;
    overdue: boolean;
  }