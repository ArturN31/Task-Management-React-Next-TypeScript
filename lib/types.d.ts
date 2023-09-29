interface TaskProps {
	id: string;
	content: string;
	due: string | undefined;
	tags: string[];
	isCompleted: boolean;
	isOverdue: boolean;
}

interface InputProps {
	taskInput: string;
	tagsInput: string[];
	dateInput: string | undefined;
	searchByContentInput: string;
	searchByTagsInput: string[];
}

interface SearchProps {
	searchByContent: TaskProps[];
	searchByTags: TaskProps[];
}

interface ComponentsVisibility {
	inProgress: boolean;
	completed: boolean;
	overdue: boolean;
	form: boolean;
	search: boolean;
	removeDialog: boolean;
}

type TaskState = {
	tasks: TaskProps[];
};

type TaskAction = {
	type: string;
	task: TaskProps;
};

type DispatchType = (args: TaskAction) => TaskAction;
