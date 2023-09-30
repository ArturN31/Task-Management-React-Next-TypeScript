interface TaskProps {
	id: string;
	content: string;
	due: string;
	tags: string[];
	isCompleted: boolean;
	isOverdue: boolean;
	reminder: boolean;
}

interface InputProps {
	taskInput: string;
	tagsInput: string[];
	dateInput: string;
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
	submitPopover: EventTarget | null;
}

interface ReminderProps {
	task: string;
	countdown: number;
}

type TaskState = {
	tasks: TaskProps[];
};

type TaskAction = {
	type: string;
	task: TaskProps;
};

type DispatchType = (args: TaskAction) => TaskAction;
