'use client';

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
import { useAppDispatch } from '@/lib/store/hooks';
import { removeTask, completedTask } from '@/lib/store/tasksListSlice';

export default function TaskBtns({
	id,
	isCompleted,
	isOverdue,
}: {
	id: string;
	isCompleted: boolean;
	isOverdue: boolean;
}) {
	const [openDialog, setOpenDialog] = useState(false);
	const dispatch = useAppDispatch();

	//handles removal of a task
	const Remove = (id: string) => {
		dispatch(removeTask(id)); //removing task from redux store
	};

	//allows to mark task as completed/not completed
	const MarkAsCompleted = (id: string) => {
		dispatch(completedTask(id)); //altering task in redux store
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
