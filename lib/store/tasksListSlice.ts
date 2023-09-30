import { initialState } from './initialStoreState';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//redux toolkit slice setup
const taskListSlice = createSlice({
	name: 'tasks',
	initialState: initialState,
	reducers: {
		addTask(state: TaskState, action) {
			state.tasks.push({
				id: action.payload.id,
				content: action.payload.content,
				due: action.payload.due,
				tags: action.payload.tags,
				isCompleted: action.payload.isCompleted,
				isOverdue: action.payload.isOverdue,
				reminder: false,
			});
		},
		removeTask(state: TaskState, action: PayloadAction<string>) {
			state.tasks = state.tasks.filter((item: TaskProps) => {
				return item.id !== action.payload;
			});
		},
		completedTask: (state: TaskState, action: PayloadAction<string>) => {
			let obj = state.tasks.filter((item: TaskProps) => {
				return item.id === action.payload;
			});
			obj && obj[0].isCompleted !== true ? (obj[0].isCompleted = true) : (obj[0].isCompleted = false);
		},
		overdueTask(state: TaskState, action: PayloadAction<string>) {
			let obj = state.tasks.filter((item: TaskProps) => {
				return item.id === action.payload;
			});
			if (obj) obj[0].isOverdue = true;
		},
		setTaskReminder(state: TaskState, action: PayloadAction<TaskProps>) {
			let obj = state.tasks.filter((item: TaskProps) => {
				return item.id === action.payload.id;
			});
			if (obj) obj[0].reminder = true;
		},
	},
});

//exporting reducers - to be used with dispatch hook
export const { addTask, removeTask, completedTask, overdueTask, setTaskReminder } = taskListSlice.actions;
export default taskListSlice.reducer;

//exporting redux store state
export const selectTasksList = (state: TaskState) => state.tasks;
