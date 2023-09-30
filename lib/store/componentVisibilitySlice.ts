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
		submitPopover: null,
	},
	reducers: {
		//inProgress list
		showInProgress(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.inProgress = action.payload;
		},
		hideInProgress(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.inProgress = action.payload;
		},

		//completed list
		showCompleted(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.completed = action.payload;
		},
		hideCompleted(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.completed = action.payload;
		},

		//overdue list
		showOverdue(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.overdue = action.payload;
		},
		hideOverdue(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.overdue = action.payload;
		},

		//form
		showForm(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.form = action.payload;
		},
		hideForm(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.form = action.payload;
		},

		//search
		showSearch(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.search = action.payload;
		},
		hideSearch(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.search = action.payload;
		},

		//remove dialog
		showRemoveDialog(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.removeDialog = action.payload;
		},
		hideRemoveDialog(state: ComponentsVisibility, action: PayloadAction<boolean>) {
			state.removeDialog = action.payload;
		},

		//form submit popover
		showSubmitPopover(state: ComponentsVisibility, action: PayloadAction<EventTarget>) {
			state.submitPopover = action.payload;
		},
		hideSubmitPopover(state: ComponentsVisibility) {
			state.submitPopover = null;
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
	showSubmitPopover,
	hideSubmitPopover,
} = componentVisibilitySlice.actions;
export default componentVisibilitySlice.reducer;

//exporting redux store state
export const selectTasksList = (state: ComponentsVisibility) => state;
