'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { Box } from '@mui/material';
import ListOfOverdueTasks from '@/components/tasks/lists/overdueTasks';
import ListOfCompletedTasks from '@/components/tasks/lists/completedTasks';
import ListOfInProgressTasks from '@/components/tasks/lists/inProgressTasks';

export default function TasksOutput() {
	const storeComponentVisibility = useAppSelector((state) => state.visibility); //redux component visibility store
	const storeTasksDisplay = useAppSelector((state) => state.display.tasks); //redux tasks display store

	return (
		<Box className='grid w-full grid-flow-row-dense grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 sm:w-fit'>
			{storeComponentVisibility.inProgress === true ? (
				<ListOfInProgressTasks tasks={...storeTasksDisplay} />
			) : (
				''
			)}

			{storeComponentVisibility.completed === true ? (
				<ListOfCompletedTasks tasks={...storeTasksDisplay} />
			) : (
				''
			)}

			{storeComponentVisibility.overdue === true ? <ListOfOverdueTasks tasks={...storeTasksDisplay} /> : ''}
		</Box>
	);
}
