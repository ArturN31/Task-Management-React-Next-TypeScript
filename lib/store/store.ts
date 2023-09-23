import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksListSlice';

//store setup
export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
	},
});

//exporting types for redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
