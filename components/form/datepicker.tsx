'use client';
import { Box } from '@mui/material';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { setTaskDateInput } from '@/lib/store/inputsSlice';

export default function Datepicker() {
	const dispatch = useAppDispatch();
	const storeInputs = useAppSelector((state) => state.inputs);
	const handleDueDate = (date: Date) => dispatch(setTaskDateInput(date));

	let borderColorCustom = { borderColor: '#00000044' };

	return (
		<Box
			className='flex justify-center w-full p-1 mt-3 bg-white border rounded shadow-inner'
			style={borderColorCustom}>
			<Box className='grid w-full grid-flow-col-dense'>
				<p className='m-4'>Due</p>
				<Box className='grid items-center justify-center'>
					<DatePicker
						id='datepicker'
						selected={storeInputs.taskDateInput}
						placeholderText='Choose date'
						onChange={(date: Date) => handleDueDate(date)}
						withPortal
						showTimeSelect
						timeFormat='HH:mm'
						timeIntervals={5}
						timeCaption='time'
						dateFormat='d MMMM, yyyy h:mm aa'
						className='w-full p-2 mr-2 border rounded shadow-md cursor-pointer hover:bg-slate-100'
					/>
				</Box>
			</Box>
		</Box>
	);
}
