'use client';

import { List, ListItem, ListItemText } from '@mui/material';

export default function TaskContent({
	content,
	due,
	tags,
}: {
	content: string;
	due: string | undefined;
	tags: string[];
}) {
	let date: string[] = [];
	if (due) {
		let d = new Date(due);
		date = d.toString().split('GMT');
	}

	return (
		<List className='grid grid-cols-1 text-center sm:grid-cols-3'>
			<ListItem className='flex items-start'>
				<ListItemText
					className='text-center break-words'
					primary='Task'
					secondary={content}
				/>
			</ListItem>
			{due ? (
				<ListItem className='flex items-start'>
					<ListItemText
						className='text-center'
						primary='Due'
						secondary={<span>{date[0]}</span>}
					/>
				</ListItem>
			) : (
				''
			)}
			{tags.length >= 1 ? (
				<ListItem className='flex items-start'>
					<ListItemText
						className='text-center'
						primary='Tags'
						secondary={tags.map((tag: string) => {
							return (
								<span key={tag}>
									<span>{tag}</span>
									<br></br>
								</span>
							);
						})}
					/>
				</ListItem>
			) : (
				''
			)}
		</List>
	);
}
