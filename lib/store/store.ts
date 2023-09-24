import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksListSlice';
import inputsReducer from './inputsSlice';
import visibilityReducer from './componentVisibilitySlice';

//store setup
export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		inputs: inputsReducer,
		visibility: visibilityReducer,
	},
});

//exporting types for redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
