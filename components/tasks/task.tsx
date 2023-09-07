'use client'

type TaskProps = {
  content: string;
  isCompleted: boolean;
  due: Date | undefined;
  tags: string[];
  isOverdue: boolean;
}

import { Box, Button, List, ListItem, ListItemText} from '@mui/material';

export default function Task( 
  {list, setList, id, content, isCompleted, due, tags, isOverdue, updateTaskAPI}: 
  {
    list: TaskProps[], 
    setList: Function, 
    id: string, 
    content: string, 
    isCompleted: boolean, 
    due: Date | undefined, 
    tags: string[], 
    isOverdue: boolean, 
    updateTaskAPI: Function}) {

  let completedStyle = {};
  isCompleted === true 
    ? completedStyle = {
      background: 'linear-gradient(to top, white, white 15%, rgb(4 190 137))'} 
    : completedStyle = {}

  let overdueStyle = {};
  isOverdue === true
    ? overdueStyle = {
      background: 'linear-gradient(to top, white, white 15%, rgb(255 85 80))'}
    : overdueStyle = {}

  //deleting task
  const deleteTaskAPI = async (id: string) => {
    await fetch('api/tasks', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })
  }

  //handles removal of a task
  const Remove = (
    id: string,
    content: string, 
    due: Date | undefined, 
    tags: string[]
    ) => {
      deleteTaskAPI(id); //deletes task from db
      
      //returns all tasks beside the one that matches the passed task data
      //effectively removing it from list state
      let arr = list.filter((task: TaskProps) => {
        if (task.content !== content 
        && task.due !== due 
        && task.tags !== tags) return task;
        else return;
      })
      setList(arr);
  }

  //allows to mark task as completed/not completed
  const MarkAsCompleted = (
    id: string,
    content: string, 
    due: Date | undefined, 
    tags: string[]
    ) => {
      let arr = list.map((task: TaskProps) => {
        //if task not completed
        if (task.isCompleted !== true) { 
          //if task data is equal to clicked task data set completed to true
          if (task.content === content 
          && task.due === due 
          && task.tags === tags) {
            task.isCompleted = true;
            updateTaskAPI(id, 'completed', true); //updates task as completed 
            return task;
          } else return task; //if not then return task
        } 
        //if task completed
        else { 
          //if task data is equal to clicked task data set completed to false
          if (task.content === content 
          && task.due === due 
          && task.tags === tags) {
            task.isCompleted = false;
            updateTaskAPI(id, 'completed', false); //updates task as not completed 
            return task;
          } else return task; //if not then return task
        }
      })
      setList(arr);
  }

  const TaskContent = ({content, due, tags}: TaskProps) => {
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

  const TaskBtns = () => {
    return (
      <Box className="grid grid-cols-1 sm:grid-cols-2">
        {isCompleted === true 
          //if completed display undo button
          ? <Button 
          onClick={() => {MarkAsCompleted(id, content, due, tags)}} 
          className="text-black" 
          sx={{
            borderTop: '1px solid #00000044', 
            borderBottom: '1px solid #00000044',
            borderRadius: '0px'
          }}>Undo</Button>
          : isOverdue !== true 
            //if not completed and task is not overdue display completed button
            ? <Button 
              onClick={() => {MarkAsCompleted(id, content, due, tags)}} 
              className="text-black" 
              sx={{
                borderTop: '1px solid #00000044', 
                borderBottom: '1px solid #00000044',
                borderRadius: '0px'
              }}>Completed</Button>
            //if not completed and task is overdue display disabled overdue buttone
            : <Button
              className="text-black"
              disabled 
              sx={{
                borderTop: '1px solid #00000044', 
                borderBottom: '1px solid #00000044',
                borderRadius: '0px'
              }}>Overdue</Button>
        }
        <Button 
        onClick={() => {Remove(id, content, due, tags)}}
        className="text-black" 
        sx={{
          borderTop: '1px solid #00000044', 
          borderBottom: '1px solid #00000044', 
          borderLeft: '1px solid #0000000f',
          borderRadius: '0px'
        }}>Remove</Button>
      </Box>
    )
  }
  
  return (
    <Box 
    className="mt-4 mx-2 border rounded bg-white shadow-md h-fit" 
    style={{...completedStyle, ...overdueStyle}} 
    sx={{
      borderLeft: '1px solid #00000044',
      borderRight: '1px solid #00000044',
      borderTop: '1ps solid #00000044'
    }}>
      <TaskContent
      key={id}
      content={content} 
      due={due} 
      tags={tags}
      isCompleted={isCompleted}
      isOverdue={isOverdue}/>

      <TaskBtns/>
    </Box>
  )
}
