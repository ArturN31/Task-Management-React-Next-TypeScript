'use client';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { setTaskReminder } from '@/lib/store/tasksListSlice';
import { overdueTask } from '@/lib/store/tasksListSlice';
import { setTasksToDisplay } from '@/lib/store/tasksDisplaySlice';

import Form from '@/components/form/form';
import TasksOutput from '@/components/tasks/task/tasksOutput';

// - Implement task editing.
// - Remove/Archive overdue tasks after a period of time ~ 1 day.

export default function Home() {
	const storeTasks = useAppSelector((state) => state.tasks.tasks); //redux tasks store
	const storeTasksSearch = useAppSelector((state) => state.search); //redux task search store
	const dispatch = useAppDispatch();

	//setting default tasks display state
	useEffect(() => {
		dispatch(setTasksToDisplay(storeTasks));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeTasks]);

	//setting tasks display state based on search state
	useEffect(() => {
		//if searching by content
		if (storeTasksSearch.searchByContent.length > 0 && storeTasksSearch.searchByContent[0].id !== '')
			dispatch(setTasksToDisplay(storeTasksSearch.searchByContent));

		//if searching by tags
		if (storeTasksSearch.searchByTags.length > 0) dispatch(setTasksToDisplay(storeTasksSearch.searchByTags));

		//if content search empty
		if (storeTasksSearch.searchByContent.length === 0 && storeTasksSearch.searchByTags.length > 0)
			dispatch(setTasksToDisplay(storeTasksSearch.searchByContent));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeTasksSearch]);

	//marks tasks as overdue when due date is in the past
	const MarkAsOverdue = (tasks: Array<TaskProps>) => {
		tasks.map((task: TaskProps) => {
			//if task is not overdue and the task is not marked as completed
			if (task.due && task.isOverdue !== true && task.isCompleted !== true) {
				let newDate = new Date();
				Reminder(task);
				//if tasks due date is in the past set task as overdue
				if (new Date(task.due) < newDate) dispatch(overdueTask(task.id));
			}
		});
	};

	//sets reminder if task is due in one day
	const Reminder = (task: TaskProps) => {
		let date: Date, dayBefore: number;
		if (task.due) {
			date = new Date(task.due);
			dayBefore = 72 * 60 * 60 * 1000;
			if (new Date() > new Date(Date.parse(task.due) - dayBefore)) {
				dispatch(setTaskReminder(task));
			}
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			MarkAsOverdue(storeTasks);
		}, 1000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeTasks]);

	return (
		<html lang='en'>
			<body className={inter.className}>
				<main className='grid grid-cols-1 justify-items-center'>
					<h1 className='p-4 pb-1 text-2xl text-center text-white'>Task Management</h1>

					{/* FORM */}
					<Form />

					{/* TASKS output */}
					<TasksOutput />
				</main>
			</body>
		</html>
	);
}
