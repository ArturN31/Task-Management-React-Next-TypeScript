interface TaskProps {
	id: string;
	content: string;
	due: string | undefined;
	tags: string[];
	isCompleted: boolean;
	isOverdue: boolean;
}

interface isVisibleProps {
	inProgress: boolean;
	completed: boolean;
	overdue: boolean;
}

type TaskState = {
	tasks: TaskProps[];
};

type TaskAction = {
	type: string;
	task: TaskProps;
};

type DispatchType = (args: TaskAction) => TaskAction;
