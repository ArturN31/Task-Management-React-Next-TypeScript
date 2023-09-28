'use client';

import { TextField, IconButton, Tooltip, Box } from '@mui/material';
import TagsSearch from '../search/tagsSearch';
import { useEffect } from 'react';
import ListFilter from './listFilter';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { setSearchByContentInput } from '@/lib/store/inputsSlice';
import { taskSearchByContent, taskSearchByTags } from '@/lib/store/searchTasksListSlice';
import { showSearch } from '@/lib/store/componentVisibilitySlice';

export default function Search() {
	const storeTasks = useAppSelector((state) => state.tasks.tasks); //redux tasks store
	const storeInputs = useAppSelector((state) => state.inputs); //redux inputs store
	const storeComponentVisibility = useAppSelector((state) => state.visibility); //redux component visibility store

	const dispatch = useAppDispatch();

	//handles search input
	const handleSearchInput = (event: Event) => {
		let e = event?.target as HTMLInputElement;
		if (e) dispatch(setSearchByContentInput(e.value));
	};

	const searchByTaskContent = async (input: string) => {
		if (input !== '') {
			//if there is search input
			//filters the list with tasks and returns array with tasks that contain input
			let res: TaskProps[] = storeTasks.filter((task: TaskProps) =>
				task.content.toLowerCase().includes(input.toLowerCase())
			);
			if (res) {
				dispatch(taskSearchByContent(res)); //setting search state
			}
		} else {
			dispatch(taskSearchByContent(storeTasks));
		}
	};

	const searchByTaskTags = async (input: string[]) => {
		console.log(input);
		//local storage is set
		if (input[0] !== '') {
			//if there is search input
			let res: TaskProps[] = storeTasks.filter((task: TaskProps) => {
				//returns tasks that match all and some filtering tags
				if (task.tags.length === input.length || task.tags.length < input.length)
					return task.tags.every((tag: string) => input.indexOf(tag) >= 0);
				//if more filters than task tags match all
				if (task.tags.length > input.length) return task.tags.some((tag: string) => input.indexOf(tag) >= 0);
			});
			if (res) dispatch(taskSearchByTags(res)); //setting search state
		} else {
			dispatch(taskSearchByTags(storeTasks));
		}
	};

	useEffect(() => {
		searchByTaskContent(storeInputs.searchByContentInput);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeInputs.searchByContentInput]);

	useEffect(() => {
		searchByTaskTags(storeInputs.searchByTagsInput);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeInputs.searchByTagsInput]);

	return storeComponentVisibility.search === true ? (
		<>
			<p className='pb-2 text-white'>Filter tasks</p>
			<TextField
				id='task-input'
				label='Search for a task'
				variant='filled'
				className='grid self-center bg-white shadow-inner'
				value={storeInputs.searchByContentInput}
				onChange={(e: any) => {
					handleSearchInput(e);
				}}
			/>

			<Box className='grid grid-cols-1 2xl:grid-cols-2'>
				<TagsSearch />
				<ListFilter />
			</Box>

			<Tooltip
				title='Hide filters'
				className='p-2 mt-3 text-black bg-white shadow-md w-fit h-fit hover:bg-amber-500'
				sx={{
					border: '1px solid',
					borderColor: '#00000044',
				}}>
				<IconButton
					className='grid grid-cols-1 mx-auto'
					onClick={() => {
						dispatch(showSearch(false));
					}}>
					<KeyboardArrowUpIcon />
				</IconButton>
			</Tooltip>
		</>
	) : (
		<Tooltip
			title='Show filters'
			className='p-2 mt-3 text-black bg-white shadow-md w-fit h-fit hover:bg-amber-500'
			sx={{
				border: '1px solid',
				borderColor: '#00000044',
			}}>
			<IconButton
				className='grid grid-cols-1 mx-auto hover:bg-amber-500'
				onClick={() => {
					dispatch(showSearch(true));
				}}>
				<KeyboardArrowDownIcon />
			</IconButton>
		</Tooltip>
	);
}
