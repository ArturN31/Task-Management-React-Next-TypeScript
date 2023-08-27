'use client'
import { Box, Button, List, ListItem, ListItemText} from '@mui/material';
import { useEffect } from 'react';

export default function Task(props: any) {
  let borderColorCustom = {borderColor: '#00000044'};

  let completedStyle = {};
  props.isCompleted === true 
    ? completedStyle = {
      background: 'linear-gradient(to top, white, white 15%, rgb(4 120 87))'} 
    : completedStyle = {}

  let overdueStyle = {};
  props.isOverdue === true
    ? overdueStyle = {
      background: 'linear-gradient(to top, white, white 15%, rgb(205 25 0))'}
    : overdueStyle = {}

  type TaskProps = {
      content: string;
      isCompleted: boolean;
      due: Date | undefined;
      tags: string[];
      isOverdue: boolean;
  }

  //handles removal of a task
  const Remove = (
    content: string, 
    due: Date | undefined, 
    tags: string[]
    ) => {
      let arr = props.list.filter((task: TaskProps) => {
        //returns all tasks beside the one that matches the passed task data effectively removing it from task list
        if (task.content !== content 
        && task.due !== due 
        && task.tags !== tags) return task;
        else return;
      })
      props.setList(arr);
  }

  //allows to mark task as completed/not completed
  const MarkAsCompleted = (
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
            return task;
          } else return task; //if not then return task
        }
      })
      props.setList(arr);
  }

  //marks tasks as overdue when due date is in the past
  const MarkAsOverdue = (list: TaskProps[]) => {
    let arr = list.map((task: TaskProps) => {
      //if task is not overdue and the task is not marked as completed
      if (task.isOverdue !== true && task.isCompleted !== true) {
        //if tasks due date is in the past set task as overdue
        if (task.due && task.due < new Date()) {
          task.isOverdue = true;
          return task;
        } else return task;
      } return task;
    })
    props.setList(arr);
  }

  useEffect(() => {
    const interval = setInterval(() => {MarkAsOverdue(props.list)}, 10000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const TaskContent = ({content, due, tags}: TaskProps) => {
    return (
      <List className="grid grid-flow-col-dense">
        <ListItem className="grid content-start">
          <ListItemText
          className="text-center break-words"
          primary='Task'
          secondary={content} />
        </ListItem>
        {due
          ? <ListItem className="grid content-start">
              <ListItemText
              className="text-center"
              primary='Due' 
              secondary={
                <>
                  <p>{due?.toDateString()}</p>
                  <p>{due?.toLocaleTimeString()}</p>
                </>
              } />
            </ListItem>
          : ''
        }
        {tags.length >= 1
          ? <ListItem className="grid content-start">
              <ListItemText 
              className="text-center"
              primary='Tags' 
              secondary={tags.map((tag: string) => {
                return (
                  <p key={tag}>{tag}</p>
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
      <Box className="grid grid-flow-col-dense">
        {props.isCompleted === true 
          //if completed display undo button
          ? <Button 
          onClick={() => {MarkAsCompleted(props.content, props.due, props.tags)}} 
          className="text-black" 
          sx={{
            borderTop: '1px solid #00000044', 
            borderBottom: '1px solid #00000044',
            borderRadius: '0px'
          }}>Undo</Button>
          : props.isOverdue !== true 
            //if not completed and task is not overdue display completed button
            ? <Button 
              onClick={() => {MarkAsCompleted(props.content, props.due, props.tags)}} 
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
        onClick={() => {Remove(props.content, props.due, props.tags)}}
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
      {props.isCompleted === true
        ? <p 
          className="text-center p-2 border-b shadow-sm font-medium" 
          style={borderColorCustom}>Task completed</p>
        : ''}
      
      {props.isOverdue === true
        ? <p 
          className="text-center p-2 border-b shadow-sm font-medium" 
          style={borderColorCustom}>Task Overdue</p>
        : ''}

      <TaskContent 
      content={props.content} 
      due={props.due} 
      tags={props.tags}
      isCompleted={props.isCompleted}
      isOverdue={props.isOverdue}/>

      <TaskBtns/>
    </Box>
  )
}
