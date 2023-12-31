'use client';

import { Box } from '@mui/material';
import TaskContent from './taskContent';
import TaskBtns from './taskBtns';

import TaskReminder from './taskReminder';

export default function Task({
	id,
	content,
	isCompleted,
	due,
	tags,
	isOverdue,
	reminder,
}: {
	id: string;
	content: string;
	isCompleted: boolean;
	due: string;
	tags: string[];
	isOverdue: boolean;
	reminder: boolean;
}) {
	return (
		<Box
			className='mx-2 mt-4 bg-white border rounded shadow-md h-fit'
			sx={{
				borderLeft: '1px solid #00000044',
				borderRight: '1px solid #00000044',
				borderTop: '1ps solid #00000044',
			}}>
			<TaskReminder
				due={due}
				isOverdue={isOverdue}
				reminder={reminder}
			/>

			<TaskContent
				key={content}
				content={content}
				due={due}
				tags={tags}
			/>

			<TaskBtns
				id={id}
				isCompleted={isCompleted}
				isOverdue={isOverdue}
			/>
		</Box>
	);
}
