'use client';

import { TaskProps } from '@/lib/types';

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export default function TaskBtns({
	id,
	list,
	setList,
	isCompleted,
	isOverdue,
}: {
	id: string;
	list: TaskProps[];
	setList: Function;
	content: string;
	isCompleted: boolean;
	due: Date | undefined;
	tags: string[];
	isOverdue: boolean;
}) {
	const [openDialog, setOpenDialog] = useState(false);

	//handles removal of a task
	const Remove = (id: string) => {
		//returns all tasks beside the one that matches task id
		//effectively removing it from list state
		let arr = list.filter((task: TaskProps) => {
			if (task.id !== id) return task;
			else return;
		});
		setList(arr);
		localStorage.setItem('tasks', JSON.stringify(arr));
	};

	//allows to mark task as completed/not completed
	const MarkAsCompleted = (id: string) => {
		let arr = list.map((task: TaskProps) => {
			//if task not completed
			if (task.isCompleted !== true) {
				//if task id is the same as clicked task id set completed to true
				if (task.id === id) {
					task.isCompleted = true;
					return task;
				} else return task; //if not then return task
			}
			//if task completed
			else {
				//if task data is equal to clicked task data set completed to false
				if (task.id === id) {
					task.isCompleted = false;
					return task;
				} else return task; //if not then return task
			}
		});
		setList(arr);
		localStorage.setItem('tasks', JSON.stringify(arr));
	};

	return (
		<>
			<Box className='flex justify-center'>
				{isCompleted === true ? (
					//if completed display undo button
					<Tooltip
						className='hover:text-rose-600'
						title='Mark as not completed'>
						<IconButton
							onClick={() => {
								MarkAsCompleted(id);
							}}>
							<UndoIcon />
						</IconButton>
					</Tooltip>
				) : isOverdue !== true ? (
					//if not completed and task is not overdue display completed button
					<Tooltip
						className='hover:text-green-600'
						title='Mark as completed'>
						<IconButton
							onClick={() => {
								MarkAsCompleted(id);
							}}>
							<CheckIcon />
						</IconButton>
					</Tooltip>
				) : (
					//if not completed and task is overdue display disabled overdue buttone
					''
				)}

				{/* <Tooltip 
          className='hover:text-blue-600'
          title="Edit task">
            <IconButton 
            onClick={() => {}}>
              <EditIcon/>
            </IconButton>
          </Tooltip> */}

				<Tooltip
					className='hover:text-red-600'
					title='Remove task'>
					<IconButton
						onClick={async () => {
							setOpenDialog(true);
						}}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</Box>

			<Dialog
				open={openDialog}
				onClose={() => {
					setOpenDialog(false);
				}}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>
					Do you really want to delete this task?
				</DialogTitle>
				<DialogActions>
					<Button
						onClick={() => {
							setOpenDialog(false);
						}}>
						No
					</Button>
					<Button
						onClick={() => {
							setOpenDialog(false);
							Remove(id);
						}}
						autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
