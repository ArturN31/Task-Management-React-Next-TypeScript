'use client';

import { TaskProps } from '@/lib/types';

import ListOutput from './listOutput';
import { Box } from '@mui/material';

export default function ListOfCompletedTasks({
	tasks,
	list,
	setList,
}: {
	tasks: Array<TaskProps>;
	list: Array<TaskProps>;
	setList: Function;
}) {
	let arr: any;

	if (tasks !== undefined) {
		//returns tasks that are marked as completed
		if (Object.keys(tasks).length > 1) {
			arr = Object.keys(tasks).map((item: any) => {
				if (tasks[item].isCompleted === true) return tasks[item];
			});
		} else {
			if (tasks[0] && tasks[0].isCompleted === true) arr = tasks;
		}

		//filters undefined elements from array
		if (arr && arr.length > 0) {
			arr = arr.filter((el: any) => {
				return el;
			});
		}
	}

	return (
		<Box className='border border-black rounded m-4 mb-0 p-2 pb-4 h-fit shadow-lg bg-slate-900/[0.5]'>
			<h2 className='mt-4 text-xl text-center text-white'>Completed</h2>
			<ListOutput
				tasks={...arr}
				list={list}
				setList={setList}
			/>
		</Box>
	);
}
