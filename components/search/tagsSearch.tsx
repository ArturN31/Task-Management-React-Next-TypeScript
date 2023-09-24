'use client';
import { Box, Tooltip, IconButton } from '@mui/material';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { addTagsToSearch, removeTagsToSearch } from '@/lib/store/inputsSlice';

export default function TagsSearch() {
	let borderColorCustom = { border: '1px solid #00000044' };
	const dispatch = useAppDispatch();
	const storeInputs = useAppSelector((state) => state.inputs); //redux inputs store

	//handles addition of a tag to array
	const addTag = (tag: string) => {
		dispatch(addTagsToSearch(tag));
	};

	//handles removal of a tag from array
	const removeTag = (tag: string) => {
		dispatch(removeTagsToSearch(tag));
	};

	return (
		<Box
			className='w-full p-1 mt-3 bg-white rounded shadow-inner'
			style={borderColorCustom}>
			<Box className='grid grid-flow-col-dense'>
				<p className='m-4'>Tags</p>
				<Box className='grid justify-center grid-flow-col auto-cols-max'>
					<Tooltip
						title='Important'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{storeInputs.searchByTagsInput.indexOf('Important') > -1 ? (
							<IconButton
								className=''
								color='primary'
								onClick={() => removeTag('Important')}>
								<NotificationImportantOutlinedIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => addTag('Important')}>
								<NotificationImportantOutlinedIcon />
							</IconButton>
						)}
					</Tooltip>

					<Tooltip
						title='Birthday'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{storeInputs.searchByTagsInput.indexOf('Birthday') > -1 ? (
							<IconButton
								color='primary'
								onClick={() => removeTag('Birthday')}>
								<CakeOutlinedIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => addTag('Birthday')}>
								<CakeOutlinedIcon />
							</IconButton>
						)}
					</Tooltip>

					<Tooltip
						title='Shopping'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{storeInputs.searchByTagsInput.indexOf('Shopping') > -1 ? (
							<IconButton
								color='primary'
								onClick={() => removeTag('Shopping')}>
								<ShoppingCartOutlinedIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => addTag('Shopping')}>
								<ShoppingCartOutlinedIcon />
							</IconButton>
						)}
					</Tooltip>

					<Tooltip
						title='Work'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{storeInputs.searchByTagsInput.indexOf('Work') > -1 ? (
							<IconButton
								color='primary'
								onClick={() => removeTag('Work')}>
								<BusinessCenterOutlinedIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => addTag('Work')}>
								<BusinessCenterOutlinedIcon />
							</IconButton>
						)}
					</Tooltip>

					<Tooltip
						title='Meeting'
						className='self-center m-1 shadow-md w-fit'
						sx={borderColorCustom}>
						{storeInputs.searchByTagsInput.indexOf('Meeting') > -1 ? (
							<IconButton
								color='primary'
								onClick={() => removeTag('Meeting')}>
								<GroupsOutlinedIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => addTag('Meeting')}>
								<GroupsOutlinedIcon />
							</IconButton>
						)}
					</Tooltip>
				</Box>
			</Box>
		</Box>
	);
}
