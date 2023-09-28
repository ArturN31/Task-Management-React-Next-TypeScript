import { PayloadAction, createSlice } from '@reduxjs/toolkit';

let taskprops: TaskProps = {
	id: '',
	content: '',
	due: undefined,
	tags: [''],
	isCompleted: false,
	isOverdue: false,
};
let initialState: TaskState = {
	tasks: [taskprops],
};

//redux toolkit slice setup
const taskDisplaySlice = createSlice({
	name: 'display',
	initialState: initialState,
	reducers: {
		setTasksToDisplay(state: TaskState, action: PayloadAction<TaskProps[]>) {
			state.tasks = action.payload;
		},
	},
});

//exporting reducers - to be used with dispatch hook
export const { setTasksToDisplay } = taskDisplaySlice.actions;
export default taskDisplaySlice.reducer;

//exporting redux store state
export const selectTasksDisplay = (state: TaskState) => state.tasks;
