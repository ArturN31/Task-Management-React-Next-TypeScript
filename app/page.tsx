'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { addTask, overdueTask } from '@/lib/store/tasksListSlice';
import { setTaskContentInput, setTaskTagsToEmpty, setTaskDateInput } from '@/lib/store/inputsSlice';
import {
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
} from '@/lib/store/componentVisibilitySlice';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import { useEffect } from 'react';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Tags from '@/components/form/tags';
import Datepicker from '@/components/form/datepicker';
import ListOfOverdueTasks from '@/components/tasks/lists/overdueTasks';
import ListOfCompletedTasks from '@/components/tasks/lists/completedTasks';
import ListOfInProgressTasks from '@/components/tasks/lists/inProgressTasks';
import Search from '@/components/search/search';

// - Implement task editing.
// - Implement reminders for due dates.
// - Remove/Archive overdue tasks after a period of time ~ 1 day.

export default function Home() {
	const storeTasks = useAppSelector((state) => state.tasks.tasks); //redux tasks store
	const storeInputs = useAppSelector((state) => state.inputs); //redux inputs store
	const storeComponentVisibility = useAppSelector((state) => state.visibility); //redux component visibility store
	const dispatch = useAppDispatch();

	//adding task
	const Add = async (input: string, tags: string[], due: Date | undefined, event: Event) => {
		event.preventDefault();
		if (input !== '') {
			let task = {
				id: 'id_' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2),
				content: input.charAt(0).toUpperCase() + input.slice(1),
				isCompleted: false,
				due: due ? due.toISOString() : undefined,
				tags: tags,
				isOverdue: false,
			};
			if (task) dispatch(addTask(task)); //adding task to redux store

			//resetting inputs
			dispatch(setTaskContentInput(''));
			dispatch(setTaskTagsToEmpty(['']));
			dispatch(setTaskDateInput(new Date()));
		}
	};

	//marks tasks as overdue when due date is in the past
	const MarkAsOverdue = (tasks: Array<TaskProps>) => {
		tasks.map((task: TaskProps) => {
			//if task is not overdue and the task is not marked as completed
			if (task.due && task.isOverdue !== true && task.isCompleted !== true) {
				//getting utc date to keep timezone when stringifying date
				let newDate = new Date();
				let now = JSON.parse(
					JSON.stringify(
						new Date(
							Date.UTC(
								newDate.getFullYear(),
								newDate.getMonth(),
								newDate.getDate(),
								newDate.getHours(),
								newDate.getMinutes()
							)
						)
					)
				);
				//if tasks due date is in the past set task as overdue
				if (task.due < now) dispatch(overdueTask(task.id));
			}
		});
	};

	useEffect(() => {
		const interval = setInterval(() => {
			MarkAsOverdue(storeTasks);
		}, 10000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeTasks]);

	//handles the input of task
	const handleTaskInput = (event: Event) => {
		let e = event?.target as HTMLInputElement;
		if (e) dispatch(setTaskContentInput(e.value));
	};

	return (
		<html lang='en'>
			<body className={inter.className}>
				<main className='grid grid-cols-1 justify-items-center'>
					<h1 className='p-4 pb-1 text-2xl text-center text-white'>Task Management</h1>

					{/* FORM */}
					<Box className='grid w-full grid-cols-1 md:grid-cols-2'>
						<Box className='border border-black rounded m-4 mb-0 p-2 pb-4 h-fit shadow-lg bg-slate-900/[0.5]'>
							{storeComponentVisibility.form === true ? (
								<Box
									component='form'
									onSubmit={(e: any) =>
										Add(storeInputs.taskContentInput, storeInputs.taskTagsInput, storeInputs.taskDateInput, e)
									}
									noValidate
									autoComplete='off'
									className='grid w-full'>
									<p className='pb-2 text-white'>Add tasks</p>
									<TextField
										id='task-input'
										label='Task content'
										variant='filled'
										className='bg-white shadow-inner'
										value={storeInputs.taskContentInput}
										onChange={(e: any) => {
											handleTaskInput(e);
										}}
									/>
									<Box className='grid grid-cols-1 2xl:grid-cols-2'>
										<Tags />

										<Datepicker />
									</Box>
									<Box className='grid'>
										<Box className='flex justify-center gap-4'>
											<Tooltip
												title='Hide form'
												className='p-2 mt-3 text-black bg-white shadow-md w-fit h-fit hover:bg-amber-500'
												sx={{
													border: '1px solid',
													borderColor: '#00000044',
												}}>
												<IconButton
													onClick={() => {
														dispatch(showForm(false));
													}}>
													<KeyboardArrowUpIcon />
												</IconButton>
											</Tooltip>
											<Tooltip title='Add task'>
												<IconButton
													type='submit'
													className='p-2 mt-3 text-black bg-white shadow-md w-fit h-fit hover:bg-green-500'
													sx={{
														border: '1px solid',
														borderColor: '#00000044',
													}}>
													<AddIcon />
												</IconButton>
											</Tooltip>
										</Box>
									</Box>
								</Box>
							) : (
								<Box className='flex justify-center'>
									<Tooltip
										title='Show form'
										className='p-2 mt-3 text-black bg-white shadow-md w-fit h-fit hover:bg-amber-500'
										sx={{
											border: '1px solid',
											borderColor: '#00000044',
										}}>
										<IconButton
											className='grid grid-cols-1 mx-auto'
											onClick={() => {
												dispatch(showForm(true));
											}}>
											<KeyboardArrowDownIcon />
										</IconButton>
									</Tooltip>
								</Box>
							)}
						</Box>
						<Box className='border border-black rounded m-4 mb-0 p-2 pb-4 h-fit shadow-lg bg-slate-900/[0.5]'>
							<Search />
						</Box>
					</Box>

					{/* TASKS output */}
					<Box className='grid w-full grid-flow-row-dense grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 sm:w-fit'>
						{storeComponentVisibility.inProgress === true ? <ListOfInProgressTasks tasks={...storeTasks} /> : ''}

						{storeComponentVisibility.completed === true ? <ListOfCompletedTasks tasks={...storeTasks} /> : ''}

						{storeComponentVisibility.overdue === true ? <ListOfOverdueTasks tasks={...storeTasks} /> : ''}
					</Box>
				</main>
			</body>
		</html>
	);
}
