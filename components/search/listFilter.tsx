'use client';
import { Box, Tooltip, IconButton } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { showInProgress, showCompleted, showOverdue } from '@/lib/store/componentVisibilitySlice';

export default function ListFilter() {
	const storeComponentVisibility = useAppSelector((state) => state.visibility); //redux component visibility store
	const dispatch = useAppDispatch();

	let borderColorCustom = { border: '1px solid #00000044' };

	return (
		<Box
			className='w-full p-1 mt-3 bg-white rounded shadow-inner'
			style={borderColorCustom}>
			<Box className='grid grid-flow-col-dense'>
				<p className='m-4'>Lists</p>
				<Box className='grid justify-center grid-flow-col auto-cols-max'>
					<Tooltip
						title='In Progress'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{storeComponentVisibility.inProgress === true ? (
							<IconButton
								color='primary'
								onClick={() => dispatch(showInProgress(false))}>
								<ScheduleIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => dispatch(showInProgress(true))}>
								<ScheduleIcon />
							</IconButton>
						)}
					</Tooltip>

					<Tooltip
						title='Completed'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{storeComponentVisibility.completed === true ? (
							<IconButton
								color='primary'
								onClick={() => dispatch(showCompleted(false))}>
								<EventAvailableIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => dispatch(showCompleted(true))}>
								<EventAvailableIcon />
							</IconButton>
						)}
					</Tooltip>

					<Tooltip
						title='Overdue'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{storeComponentVisibility.overdue === true ? (
							<IconButton
								color='primary'
								onClick={() => dispatch(showOverdue(false))}>
								<EventBusyIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => dispatch(showOverdue(true))}>
								<EventBusyIcon />
							</IconButton>
						)}
					</Tooltip>
				</Box>
			</Box>
		</Box>
	);
}
