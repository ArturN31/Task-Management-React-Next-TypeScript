import { PayloadAction, createSlice } from '@reduxjs/toolkit';

let taskprops: TaskProps = {
	id: '',
	content: '',
	due: '',
	tags: [''],
	isCompleted: false,
	isOverdue: false,
	reminder: false,
};
let initialState: SearchProps = {
	searchByContent: [taskprops],
	searchByTags: [taskprops],
};

//redux toolkit slice setup
const searchSlice = createSlice({
	name: 'search',
	initialState: initialState,
	reducers: {
		taskSearchByContent(state, action: PayloadAction<TaskProps[]>) {
			state.searchByContent = action.payload;
		},
		taskSearchByTags(state, action: PayloadAction<TaskProps[]>) {
			state.searchByTags = action.payload;
		},
	},
});

//exporting reducers - to be used with dispatch hook
export const { taskSearchByContent, taskSearchByTags } = searchSlice.actions;
export default searchSlice.reducer;

//exporting redux store state
export const selectSearch = (state: SearchProps) => state;
