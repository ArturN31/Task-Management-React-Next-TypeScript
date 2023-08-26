'use client'
import { useState } from "react"
import { Box, TextField, Button} from '@mui/material';

import Tags from '@/components/form/tags';
import Datepicker from "@/components/form/datepicker";
import Task from "@/components/task";

// - Implement a search by name & tag function to find tasks quickly.

export default function Home() {
  const [list, setList] = useState<Array<TaskProps>>(Array<TaskProps>);
  const [taskInput, setTaskInput] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date>();

  let borderColorCustom = {borderColor: '#00000044'};

  type TaskProps = {
    content: string;
    isCompleted: boolean;
    due: Date | undefined;
    tags: string[];
  }

  const Add = (
    input: string, 
    tags: string[], 
    due: Date | undefined, 
    event: any
    ) => {
      event.preventDefault();
      if (input !== '') {
        let task = {
          content: input.charAt(0).toUpperCase() + input.slice(1),
          isCompleted: false,
          due: due ? due : undefined,
          tags: tags
        }
        
        if (list.length >= 1) { //list contains objects - add as last
          let prevList: Array<TaskProps> = [...list];
          prevList.push(task);
          let newList: Array<TaskProps> = prevList;
          setList(newList);
        } else { //empty list - add as first
          let newList = [];
          newList.push(task);
          setList(newList);
        }
    
        setTagsInput([]);
        setTaskInput('');
        setDueDate(undefined);
      }
  }

  const ListOfTasks = (tasks: Array<any>) => {
    return (
      <Box className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
        {
          Object.keys(tasks).length > 1
            ? Object.keys(tasks).map((item: any) => (
                <Task 
                key={tasks[item].content} 
                list={list}
                setList={setList}
                content={tasks[item].content} 
                isCompleted={tasks[item].isCompleted} 
                due={tasks[item].due} 
                tags={tasks[item].tags}/>
              ))
            : Object.keys(tasks).length === 1 
              ? <Task
                key={tasks[0].content} 
                list={list}
                setList={setList}
                content={tasks[0].content} 
                isCompleted={tasks[0].isCompleted} 
                due={tasks[0].due} 
                tags={tasks[0].tags}/>
              : ''
        }
      </Box>
    )
  }

  //handles the input of task 
  const handleTaskInput = (event: any) => {
    let value = event.target.value;
    setTaskInput(value);
  }

  return (
    <main className="grid grid-cols-1 justify-items-center">
      <h1 
      className="text-2xl p-4 w-screen bg-emerald-700 text-center border-b" 
      style={borderColorCustom}>
        HEADER
      </h1>
      <Box
      component="form"
      onSubmit={(e) => Add(taskInput, tagsInput, dueDate, e)}
      noValidate
      autoComplete="off"
      className="p-4 border w-3/4 xl:w-4/5 grid bg-slate-50 rounded-bl-md rounded-br-md shadow-md" 
      style={borderColorCustom}>
        <TextField 
        id="task-input" 
        label="Task" 
        variant="outlined" 
        className="shadow-inner bg-white"
        value={taskInput}
        onChange={handleTaskInput}/>
        <Box className="grid grid-cols-1 xl:grid-cols-3">
          <Tags 
          tagsInput={tagsInput} 
          setTagsInput={setTagsInput}/>

          <Datepicker 
          dueDate={dueDate} 
          setDueDate={setDueDate}/>

          <Box className="w-full h-full flex justify-end">
            <Button
            type="submit"
            className="mt-3 shadow-md p-2 w-fit text-black bg-white" 
            sx={{
              border: '1px solid', 
              borderColor: '#00000044'
            }}>
              Add task
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <ListOfTasks {...list}/>
      </Box>
    </main>
  )
}
