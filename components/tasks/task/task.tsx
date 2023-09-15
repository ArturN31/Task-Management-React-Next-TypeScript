'use client'

type TaskProps = {
  content: string;
  isCompleted: boolean;
  due: Date | undefined;
  tags: string[];
  isOverdue: boolean;
}

import { Box } from '@mui/material';
import TaskContent from './taskContent';
import TaskBtns from './taskBtns';

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

  return (
    <Box 
    className="mt-4 mx-2 border rounded bg-white shadow-md h-fit"
    sx={{
      borderLeft: '1px solid #00000044',
      borderRight: '1px solid #00000044',
      borderTop: '1ps solid #00000044'
    }}>
      <TaskContent
      key={id}
      content={content} 
      due={due} 
      tags={tags}/>

      <TaskBtns
      list={list}
      setList={setList} 
      id={id}
      content={content}
      isCompleted={isCompleted}
      due={due}
      tags={tags}
      isOverdue={isOverdue} 
      updateTaskAPI={updateTaskAPI}/>
    </Box>
  )
}
