import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//redux toolkit slice setup
const componentVisibilitySlice = createSlice({
	name: 'visibility',
	initialState: {
		inProgress: true,
		completed: true,
		overdue: true,
		form: true,
		search: true,
		removeDialog: false,
	},
	reducers: {
		showInProgress(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.inProgress = action.payload;
		},
		hideInProgress(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.inProgress = action.payload;
		},
		showCompleted(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.completed = action.payload;
		},
		hideCompleted(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.completed = action.payload;
		},
		showOverdue(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.overdue = action.payload;
		},
		hideOverdue(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.overdue = action.payload;
		},
		showForm(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.form = action.payload;
		},
		hideForm(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.form = action.payload;
		},
		showSearch(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.search = action.payload;
		},
		hideSearch(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.search = action.payload;
		},
		showRemoveDialog(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.removeDialog = action.payload;
		},
		hideRemoveDialog(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.removeDialog = action.payload;
		},
	},
});

//exporting reducers - to be used with dispatch hook
export const {
	showInProgress,
	hideInProgress,
	showCompleted,
	hideCompleted,
	showOverdue,
	hideOverdue,
	showForm,
	hideForm,
	showSearch,
	hideSearch,
	showRemoveDialog,
	hideRemoveDialog,
} = componentVisibilitySlice.actions;
export default componentVisibilitySlice.reducer;

//exporting redux store state
export const selectTasksList = (state: ComponentsVisibility) => state;
