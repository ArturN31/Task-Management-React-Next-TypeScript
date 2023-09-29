'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { addTask } from '@/lib/store/tasksListSlice';
import { setTaskContentInput, setTaskTagsToEmpty, setTaskDateInput } from '@/lib/store/inputsSlice';
import { showForm } from '@/lib/store/componentVisibilitySlice';

import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Tags from '@/components/form/tags';
import Datepicker from '@/components/form/datepicker';
import Search from '@/components/search/search';

export default function Form() {
	const storeInputs = useAppSelector((state) => state.inputs); //redux inputs store
	const storeComponentVisibility = useAppSelector((state) => state.visibility); //redux component visibility store
	const dispatch = useAppDispatch();

	//adding task
	const Add = async (input: string, tags: string[], due: string | undefined, event: Event) => {
		event.preventDefault();
		if (input !== '' && tags[0] !== '') {
			let task = {
				id: 'id_' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2),
				content: input.charAt(0).toUpperCase() + input.slice(1),
				isCompleted: false,
				due: due ? due : undefined,
				tags: tags,
				isOverdue: false,
			};
			if (task) dispatch(addTask(task)); //adding task to redux store

			//resetting inputs
			dispatch(setTaskContentInput(''));
			dispatch(setTaskTagsToEmpty(['']));
			dispatch(setTaskDateInput(new Date().toString()));
		}
	};

	//handles the input of task
	const handleTaskInput = (event: Event) => {
		let e = event?.target as HTMLInputElement;
		if (e) dispatch(setTaskContentInput(e.value));
	};

	return (
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
	);
}
