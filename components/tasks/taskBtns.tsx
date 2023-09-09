'use client'

type TaskProps = {
  content: string;
  isCompleted: boolean;
  due: Date | undefined;
  tags: string[];
  isOverdue: boolean;
}

import { Box, IconButton, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskBtns( 
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

    return (
      <Box className="flex justify-center">
        {isCompleted === true 
          //if completed display undo button
          ? <Tooltip 
            className='hover:text-rose-600'
            title="Mark as not completed">
              <IconButton 
              onClick={() => {MarkAsCompleted(id, content, due, tags)}}>
                <UndoIcon/>
                </IconButton>
            </Tooltip>
          : isOverdue !== true 
            //if not completed and task is not overdue display completed button
            ? <Tooltip 
              className='hover:text-green-600'
              title="Mark as completed">
                <IconButton 
                onClick={() => {MarkAsCompleted(id, content, due, tags)}}>
                  <CheckIcon/>
                </IconButton>
              </Tooltip>
            //if not completed and task is overdue display disabled overdue buttone
            : ''
        }

        <Tooltip 
        className='hover:text-blue-600'
        title="Edit task">
          <IconButton 
          onClick={() => {}}>
            <EditIcon/>
          </IconButton>
        </Tooltip>

        <Tooltip 
        className='hover:text-red-600'
        title="Remove task">
          <IconButton 
          onClick={() => {Remove(id, content, due, tags)}}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      </Box>
    )
}
