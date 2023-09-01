'use client'
import { useEffect, useState } from "react"
import { Box, TextField, Button} from '@mui/material';

import Tags from '@/components/form/tags';
import Datepicker from "@/components/form/datepicker";
import Task from "@/components/task";

// - Implement task editing.
// - Implement a search by name & tag function to find tasks quickly.
// - Implement reminders for due dates.
// - Implement kanban style boards for overdue, completed, and in progress tasks.

export default function Home() {
  const [list, setList] = useState<any>();
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

  //getting tasks form an api
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
    let date = task.due;

    //getting utc date to keep timezone when stringifying date
    let utcDate = date  
    ? new Date(
      Date.UTC(
        date.getFullYear(), 
        date.getMonth(), 
        date.getDate(), 
        date.getHours(), 
        date.getMinutes()
      ))
    : undefined;

    let req = {
      ...task,
      due: utcDate
    }

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

  useEffect(() => {
    const interval = setInterval(() => {MarkAsOverdue(list)}, 10000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  //marks tasks as overdue when due date is in the past
  const MarkAsOverdue = (tasks: TaskProps[]) => {
    let arr = tasks.map((task: any) => {
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
        if (task.due < now) {
          task.isOverdue = true;
          updateTaskAPI(task._id, 'overdue', true); //updates task as overdue
          return task;
        } else return task;
      } return task;
    })
    setList(arr);
  }

  //renders a grid of tasks
  const ListOfTasks = (tasks: Array<any>) => {
    return (
      <Box className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
        {
          Object.keys(tasks).length > 1
            ? Object.keys(tasks).map((item: any) => (
                <Task 
                key={tasks[item]._id} 
                list={list}
                setList={setList}
                id={tasks[item]._id}
                content={tasks[item].content} 
                isCompleted={tasks[item].isCompleted} 
                due={tasks[item].due} 
                tags={tasks[item].tags}
                isOverdue={tasks[item].isOverdue}/>
              ))
            : Object.keys(tasks).length === 1 
              ? <Task
                key={tasks[0]._id} 
                list={list}
                setList={setList}
                id={tasks[0]._id}
                content={tasks[0].content} 
                isCompleted={tasks[0].isCompleted} 
                due={tasks[0].due} 
                tags={tasks[0].tags}
                isOverdue={tasks[0].isOverdue}/>
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