'use client';

import { SnackbarContent } from '@mui/material';
import { useEffect, useState } from 'react';

export default function TaskReminder({
	due,
	isOverdue,
	reminder,
}: {
	due: string;
	isOverdue: boolean;
	reminder: boolean;
}) {
	let countdownDate = new Date(Date.parse(due)).getTime();
	const [countdown, setCountdown] = useState(countdownDate - new Date().getTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(countdownDate - new Date().getTime());
		}, 1000);
		return () => clearInterval(interval);
	}, [countdownDate]);

	const formatTime = (time: number) => {
		let days = Math.floor(time / (1000 * 60 * 60 * 24));
		let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((time % (1000 * 60)) / 1000);

		if (days && hours && minutes && seconds) return `Due in ${days} d ${hours}h ${minutes}m ${seconds}s`;
		if (!days && hours && minutes && seconds) return `Due in ${hours}h ${minutes}m ${seconds}s`;
		if (!days && !hours && minutes && seconds) return `Due in ${minutes}m ${seconds}s`;
		if (!days && !hours && !minutes && seconds) return `Due in ${seconds}s`;
	};

	return isOverdue === false && reminder === true ? (
		<SnackbarContent
			className='p-0 pl-2 grid justify-center'
			message={formatTime(countdown)}
		/>
	) : (
		''
	);
}
