'use client'

import { List, ListItem, ListItemText} from '@mui/material';

export default function TaskContent( 
    {content, due, tags }: 
    {
        content: string, 
        due: Date | undefined, 
        tags: string[]
    }) {

    let dateArray: string[] = [];
    if (due) { 
      dateArray = due?.toString().split('T')
      dateArray[1] = dateArray[1].split('.')[0];
    }

    return (
        <List className="grid grid-cols-1 sm:grid-cols-3 text-center">
            <ListItem className='flex items-start'>
                <ListItemText
                className="text-center break-words"
                primary='Task'
                secondary={content} />
            </ListItem>
            {due
                ? <ListItem className='flex items-start'>
                    <ListItemText
                    className="text-center"
                    primary='Due' 
                    secondary={
                        <>
                            <span>{dateArray[0]}</span><br></br>
                            <span>{dateArray[1]}</span>
                        </>
                    } />
                    </ListItem>
                : ''
            }
            {tags.length >= 1
                ? <ListItem className='flex items-start'>
                    <ListItemText 
                    className="text-center"
                    primary='Tags' 
                    secondary={tags.map((tag: string) => {
                        return (
                        <span key={tag}><span>{tag}</span><br></br></span>
                        )})
                    }/>
                    </ListItem>
                : ''
            }
        </List>
    )
}
