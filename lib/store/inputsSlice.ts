import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//redux toolkit slice setup
const inputsSlice = createSlice({
	name: 'inputs',
	initialState: {
		taskContentInput: '',
		taskTagsInput: [''],
		taskDateInput: new Date().toString(),
		searchByContentInput: '',
		searchByTagsInput: [''],
	},
	reducers: {
		setTaskContentInput(state, action: PayloadAction<string>) {
			state.taskContentInput = action.payload;
		},
		addTaskTags(state, action: PayloadAction<string>) {
			let arr: string[] = [];
			if (state.taskTagsInput[0] !== '') {
				arr = [...state.taskTagsInput];
				arr.push(action.payload);
			} else arr[0] = action.payload;
			state.taskTagsInput = arr;
		},
		removeTaskTags(state, action: PayloadAction<string>) {
			let arr = state.taskTagsInput.filter((storedTag: string) => {
				return storedTag !== action.payload;
			});
			state.taskTagsInput = arr;
		},
		setTaskTagsToEmpty(state, action: PayloadAction<string[]>) {
			state.taskTagsInput = action.payload;
		},
		setTaskDateInput(state, action: PayloadAction<string>) {
			state.taskDateInput = action.payload.toString();
		},
		setSearchByContentInput(state, action: PayloadAction<string>) {
			state.searchByContentInput = action.payload;
		},
		addTagsToSearch(state, action: PayloadAction<string>) {
			let arr: string[] = [];
			if (state.searchByTagsInput[0] !== '') {
				arr = [...state.searchByTagsInput];
				arr.push(action.payload);
			} else arr[0] = action.payload;
			state.searchByTagsInput = arr;
		},
		removeTagsToSearch(state, action: PayloadAction<string>) {
			let arr = state.searchByTagsInput.filter((storedTag: string) => {
				return storedTag !== action.payload;
			});
			state.searchByTagsInput = arr;
		},
	},
});

//exporting reducers - to be used with dispatch hook
export const {
	setTaskContentInput,
	addTaskTags,
	removeTaskTags,
	setTaskTagsToEmpty,
	setTaskDateInput,
	setSearchByContentInput,
	addTagsToSearch,
	removeTagsToSearch,
} = inputsSlice.actions;
export default inputsSlice.reducer;

//exporting redux store state
export const selectInputs = (state: InputProps) => state;
