'use client'
import { useEffect, useState } from "react"
import { Box, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Tags from '@/components/form/tags';
import Datepicker from "@/components/form/datepicker";
import ListOfOverdueTasks from "@/components/tasks/overdueTasks";
import ListOfCompletedTasks from "@/components/tasks/completedTasks";
import ListOfInProgressTasks from "@/components/tasks/inProgressTasks";

// - Implement task editing.
// - Implement a search by name & tag function to find tasks quickly.
// - Implement reminders for due dates.
// - Remove overdue tasks after a period of time ~ 1 day.

export default function Home() {
  const [list, setList] = useState<Array<TaskProps & {_id: string}>>(
    [{
      _id: '',
      content: '',
      due: undefined,
      tags: [],
      isCompleted: false,
      isOverdue: false
    }]);
  const [taskInput, setTaskInput] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date>();

  let borderColorCustom = {borderColor: '#00000044'};

  type TaskProps = {
    content: string;
    due: Date | undefined;
    tags: string[];
    isCompleted: boolean;
    isOverdue: boolean;
  }

  //getting tasks from an api
  const getApiData = async () => {
    let data = await fetch('api/tasks')
      .then((response) => response.json())
      .then((todos) => {return todos})
    setList(data);
  }
  
  //get data from mongodb on page load
  useEffect(() => {
    getApiData();
  }, [])

  //posting task to api
  const addTaskAPI = async (task: TaskProps) => {
    //getting utc date to keep timezone when stringifying date
    let date = task.due;
    let utcDate = date  
    ? new Date(Date.UTC(
      date.getFullYear(), 
      date.getMonth(), 
      date.getDate(), 
      date.getHours(), 
      date.getMinutes()))
    : undefined;

    let req = {...task, due: utcDate}

    await fetch('api/tasks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
  }

  //adding task
  const Add = (
    input: string, 
    tags: string[], 
    due: Date | undefined
    ) => {
      if (input !== '') {
        let task = {
          content: input.charAt(0).toUpperCase() + input.slice(1),
          isCompleted: false,
          due: due,
          tags: tags,
          isOverdue: false
        }
        addTaskAPI(task); //adds task to db
      }
  }

  //handles update of tasks edit/completed/overdue
  const updateTaskAPI = async (id: string, functionality: string, state?: boolean) => {
    let req = {'id': id, 'functionality': functionality, 'state': state};
    await fetch('api/tasks', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
  }

  //marks tasks as overdue when due date is in the past
  const MarkAsOverdue = (tasks: Array<TaskProps & {_id: string}>) => {
    let arr = tasks.map((task: TaskProps & {_id: string}) => {
      //if task is not overdue and the task is not marked as completed
      if (task.isOverdue !== true && task.isCompleted !== true) {
        //getting utc date to keep timezone when stringifying date
        let newDate = new Date();
        let now = JSON.parse(
                    JSON.stringify(
                      new Date(
                        Date.UTC(
                          newDate.getFullYear(), 
                          newDate.getMonth(), 
                          newDate.getDate(), 
                          newDate.getHours(), 
                          newDate.getMinutes()
                  ))));
        //if tasks due date is in the past set task as overdue
        if (task.due) {
          if (task.due < now) {
            task.isOverdue = true;
            updateTaskAPI(task._id, 'overdue', true); //updates task as overdue
            return task;
          } else return task;
        }
      } return task;
    })
    //filters out updated tasks
    const results = tasks.filter(({ isOverdue: id1 }) => !arr.some(({ isOverdue: id2 }) => id2 === id1));
    //if there are any changes update the state
    if (results.length !== 0) setList(arr);
  }

  useEffect(() => {
    const interval = setInterval(() => {MarkAsOverdue(list)}, 10000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  //handles the input of task 
  const handleTaskInput = (event: Event) => {
    let value: string = '';
    let e = event?.target as HTMLInputElement
    if (e) {
      value = e.value;
    }
    
    return setTaskInput(value);
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
      onSubmit={(e) => Add(taskInput, tagsInput, dueDate)}
      noValidate
      autoComplete="off"
      className="p-4 border w-full sm:w-full md:w-4/5 xl:w-4/5 grid bg-slate-50 rounded-bl-md rounded-br-md shadow-md" 
      style={borderColorCustom}>
        <TextField 
        id="task-input" 
        label="Task" 
        variant="outlined" 
        className="shadow-inner bg-white"
        value={taskInput}
        onChange={(e: any) => {handleTaskInput(e)}}/>
        <Box className="grid grid-cols-1 xl:grid-cols-3">
          <Tags 
          tagsInput={tagsInput} 
          setTagsInput={setTagsInput}/>

          <Datepicker 
          dueDate={dueDate} 
          setDueDate={setDueDate}/>

          <Box className="w-full h-full flex justify-end">
            <IconButton
            type="submit"
            className="shadow-md p-2 w-fit h-fit text-black bg-white self-center mt-3" 
            sx={{
              border: '1px solid', 
              borderColor: '#00000044'
            }}>
              <AddIcon/>
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box className="grid grid-flow-row-dense grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        <ListOfInProgressTasks 
        tasks={...list} 
        list={list} 
        setList={setList} 
        updateTaskAPI={updateTaskAPI}/>

        <ListOfCompletedTasks 
        tasks={...list} 
        list={list} 
        setList={setList} 
        updateTaskAPI={updateTaskAPI}/>

        <ListOfOverdueTasks 
        tasks={...list} 
        list={list} 
        setList={setList} 
        updateTaskAPI={updateTaskAPI}/>
      </Box>
    </main>
  )
}