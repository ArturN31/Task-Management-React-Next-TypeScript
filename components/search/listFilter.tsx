'use client';
import { Box, Tooltip, IconButton } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

import { isVisibleProps } from '@/lib/types';

export default function ListFilter({
	isVisible,
	setIsVisible,
}: {
	isVisible: isVisibleProps;
	setIsVisible: Function;
}) {
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
						{isVisible.inProgress === true ? (
							<IconButton
								color='primary'
								onClick={() =>
									setIsVisible({ ...isVisible, inProgress: false })
								}>
								<ScheduleIcon />
							</IconButton>
						) : (
							<IconButton
								onClick={() =>
									setIsVisible({ ...isVisible, inProgress: true })
								}>
								<ScheduleIcon />
							</IconButton>
						)}
					</Tooltip>

					<Tooltip
						title='Completed'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{isVisible.completed === true ? (
							<IconButton
								color='primary'
								onClick={() =>
									setIsVisible({ ...isVisible, completed: false })
								}>
								<EventAvailableIcon />
							</IconButton>
						) : (
							<IconButton
								onClick={() => setIsVisible({ ...isVisible, completed: true })}>
								<EventAvailableIcon />
							</IconButton>
						)}
					</Tooltip>

					<Tooltip
						title='Overdue'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{isVisible.overdue === true ? (
							<IconButton
								color='primary'
								onClick={() => setIsVisible({ ...isVisible, overdue: false })}>
								<EventBusyIcon />
							</IconButton>
						) : (
							<IconButton
								onClick={() => setIsVisible({ ...isVisible, overdue: true })}>
								<EventBusyIcon />
							</IconButton>
						)}
					</Tooltip>
				</Box>
			</Box>
		</Box>
	);
}
