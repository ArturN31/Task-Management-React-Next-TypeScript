'use client'

import { TaskProps } from "@/lib/types";

import { Box } from '@mui/material';
import TaskContent from './taskContent';
import TaskBtns from './taskBtns';

export default function Task( 
  {id, list, setList, content, isCompleted, due, tags, isOverdue}: 
  {
    id: string,
    list: TaskProps[], 
    setList: Function,
    content: string, 
    isCompleted: boolean, 
    due: Date | undefined, 
    tags: string[], 
    isOverdue: boolean}) {

  return (
    <Box 
    className="mt-4 mx-2 border rounded bg-white shadow-md h-fit"
    sx={{
      borderLeft: '1px solid #00000044',
      borderRight: '1px solid #00000044',
      borderTop: '1ps solid #00000044'
    }}>
      <TaskContent
      key={content}
      content={content} 
      due={due} 
      tags={tags}/>

      <TaskBtns
      id={id}
      list={list}
      setList={setList}
      content={content}
      isCompleted={isCompleted}
      due={due}
      tags={tags}
      isOverdue={isOverdue}/>
    </Box>
  )
}
