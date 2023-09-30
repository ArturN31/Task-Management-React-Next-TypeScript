'use client';

import { Box } from '@mui/material';
import Task from '@/components/tasks/task/task';

export default function ListOutput({ tasks }: { tasks: Array<TaskProps> }) {
	//renders a grid of tasks
	return tasks !== undefined ? (
		<Box>
			{Object.keys(tasks).length > 1 ? (
				Object.keys(tasks).map((item: any) => (
					<Task
						key={tasks[item].id}
						id={tasks[item].id}
						content={tasks[item].content}
						isCompleted={tasks[item].isCompleted}
						due={tasks[item].due}
						tags={tasks[item].tags}
						isOverdue={tasks[item].isOverdue}
						reminder={tasks[item].reminder}
					/>
				))
			) : Object.keys(tasks).length === 1 ? (
				<Task
					key={tasks[0].id}
					id={tasks[0].id}
					content={tasks[0].content}
					isCompleted={tasks[0].isCompleted}
					due={tasks[0].due}
					tags={tasks[0].tags}
					isOverdue={tasks[0].isOverdue}
					reminder={tasks[0].reminder}
				/>
			) : (
				''
			)}
		</Box>
	) : (
		''
	);
}
