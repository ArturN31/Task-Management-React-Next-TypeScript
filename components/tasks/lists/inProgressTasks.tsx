'use client';

import { TaskProps } from '@/lib/types';

import ListOutput from './listOutput';
import { Box } from '@mui/material';

export default function ListOfInProgressTasks({
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
		//returns tasks that are not marked as overdue and completed
		if (Object.keys(tasks).length > 1) {
			arr = Object.keys(tasks).map((item: any) => {
				if (
					tasks[item].isOverdue === false &&
					tasks[item].isCompleted === false
				)
					return tasks[item];
			});
		} else {
			if (
				tasks[0] &&
				tasks[0].isOverdue === false &&
				tasks[0].isCompleted === false
			)
				arr = tasks;
		}

		//filters undefined elements from array
		if (arr && arr.length > 0) {
			arr = arr.filter((el: Element) => {
				return el;
			});
		}
	}

	return (
		<Box className='border border-black rounded m-4 mb-0 p-2 pb-4 h-fit shadow-lg bg-slate-900/[0.5]'>
			<h2 className='mt-4 text-xl text-center text-white'>In progress</h2>
			<ListOutput
				tasks={...arr}
				list={list}
				setList={setList}
			/>
		</Box>
	);
}
