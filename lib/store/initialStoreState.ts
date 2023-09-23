//initial tasks loaded into the management system
export const initialState: TaskState = {
	tasks: [
		{
			id:
				'id_' +
				Math.random().toString(16).slice(2) +
				Math.random().toString(16).slice(2),
			content: 'Sample task - overdue',
			due: new Date('2023-09-01').toISOString(),
			tags: ['Important'],
			isCompleted: false,
			isOverdue: true,
		},
		{
			id:
				'id_' +
				Math.random().toString(16).slice(2) +
				Math.random().toString(16).slice(2),
			content: 'Sample task - in progress',
			due: new Date('2023-12-01').toISOString(),
			tags: ['Important, Meeting'],
			isCompleted: false,
			isOverdue: false,
		},
		{
			id:
				'id_' +
				Math.random().toString(16).slice(2) +
				Math.random().toString(16).slice(2),
			content: 'Sample task - completed',
			due: new Date().toISOString(),
			tags: ['Important, Meeting'],
			isCompleted: true,
			isOverdue: false,
		},
		{
			id:
				'id_' +
				Math.random().toString(16).slice(2) +
				Math.random().toString(16).slice(2),
			content: 'Sample task - no date',
			due: undefined,
			tags: ['Shopping'],
			isCompleted: false,
			isOverdue: false,
		},
		{
			id:
				'id_' +
				Math.random().toString(16).slice(2) +
				Math.random().toString(16).slice(2),
			content: 'Sample task - no date & tags',
			due: undefined,
			tags: [],
			isCompleted: false,
			isOverdue: false,
		},
	],
};
