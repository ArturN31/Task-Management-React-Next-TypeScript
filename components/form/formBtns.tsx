'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { showForm, hideSubmitPopover } from '@/lib/store/componentVisibilitySlice';

import { Box, IconButton, Tooltip, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function FormBtns() {
	const storeComponentVisibility = useAppSelector((state) => state.visibility); //redux component visibility store
	const dispatch = useAppDispatch();

	const handlePopoverClose = () => {
		dispatch(hideSubmitPopover());
	};

	return (
		<Box className='grid'>
			<Box className='flex justify-center gap-4'>
				<Tooltip
					title='Hide form'
					className='p-2 mt-3 text-black bg-white shadow-md w-fit h-fit hover:bg-amber-500'
					sx={{
						border: '1px solid',
						borderColor: '#00000044',
					}}>
					<IconButton
						onClick={() => {
							dispatch(showForm(false));
						}}>
						<KeyboardArrowUpIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title='Add task'>
					<IconButton
						type='submit'
						className='p-2 mt-3 text-black bg-white shadow-md w-fit h-fit hover:bg-green-500'
						sx={{
							border: '1px solid',
							borderColor: '#00000044',
						}}>
						<AddIcon />
					</IconButton>
				</Tooltip>
				<Popover
					className='mt-2'
					open={Boolean(storeComponentVisibility.submitPopover)}
					anchorEl={storeComponentVisibility.submitPopover}
					onClose={handlePopoverClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}>
					<p className='p-2'>Please enter task content, tags, and date before submitting</p>
				</Popover>
			</Box>
		</Box>
	);
}
