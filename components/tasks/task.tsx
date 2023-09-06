'use client'
import { Box, Button, List, ListItem, ListItemText} from '@mui/material';

export default function Task(props: any) {
  let completedStyle = {};
  props.isCompleted === true 
    ? completedStyle = {
      background: 'linear-gradient(to top, white, white 15%, rgb(4 190 137))'} 
    : completedStyle = {}

  let overdueStyle = {};
  props.isOverdue === true
    ? overdueStyle = {
      background: 'linear-gradient(to top, white, white 15%, rgb(255 85 80))'}
    : overdueStyle = {}

  type TaskProps = {
      content: string;
      isCompleted: boolean;
      due: Date | undefined;
      tags: string[];
      isOverdue: boolean;
  }

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
      let arr = props.list.filter((task: TaskProps) => {
        if (task.content !== content 
        && task.due !== due 
        && task.tags !== tags) return task;
        else return;
      })
      props.setList(arr);
  }

  //allows to mark task as completed/not completed
  const MarkAsCompleted = (
    id: string,
    content: string, 
    due: Date | undefined, 
    tags: string[]
    ) => {
      let arr = props.list.map((task: TaskProps) => {
        //if task not completed
        if (task.isCompleted !== true) { 
          //if task data is equal to clicked task data set completed to true
          if (task.content === content 
          && task.due === due 
          && task.tags === tags) {
            task.isCompleted = true;
            props.updateTaskAPI(id, 'completed', true); //updates task as completed 
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
            props.updateTaskAPI(id, 'completed', false); //updates task as not completed 
            return task;
          } else return task; //if not then return task
        }
      })
      props.setList(arr);
  }

  const TaskContent = ({content, due, tags}: TaskProps) => {
    let dateArray: any = [];
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
        {props.isCompleted === true 
          //if completed display undo button
          ? <Button 
          onClick={() => {MarkAsCompleted(props.id, props.content, props.due, props.tags)}} 
          className="text-black" 
          sx={{
            borderTop: '1px solid #00000044', 
            borderBottom: '1px solid #00000044',
            borderRadius: '0px'
          }}>Undo</Button>
          : props.isOverdue !== true 
            //if not completed and task is not overdue display completed button
            ? <Button 
              onClick={() => {MarkAsCompleted(props.id, props.content, props.due, props.tags)}} 
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
        onClick={() => {Remove(props.id, props.content, props.due, props.tags)}}
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
      key={props.id}
      content={props.content} 
      due={props.due} 
      tags={props.tags}
      isCompleted={props.isCompleted}
      isOverdue={props.isOverdue}/>

      <TaskBtns/>
    </Box>
  )
}
