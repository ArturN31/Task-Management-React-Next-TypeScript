'use client'
import { useEffect, useState } from "react"
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Tags from '@/components/form/tags';
import Datepicker from "@/components/form/datepicker";
import ListOfOverdueTasks from "@/components/tasks/lists/overdueTasks";
import ListOfCompletedTasks from "@/components/tasks/lists/completedTasks";
import ListOfInProgressTasks from "@/components/tasks/lists/inProgressTasks";
import Search from "@/components/search/search";

// - Implement task editing.
// - Implement reminders for due dates.
// - Remove/Archive overdue tasks after a period of time ~ 1 day.
// - Task removal confirmation dialog box.

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
  const [searchInput, setSearchInput] = useState<string>('');
  const [tagsSearch, setTagsSearch] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<isVisibleProps>({
    inProgress: true,
    completed: true,
    overdue: true
  })
  const [isFormVisible, setIsFormVisible] = useState<Boolean>(true);

  let borderColorCustom = {borderColor: '#00000044'};

  type isVisibleProps = {
    inProgress: boolean;
    completed: boolean;
    overdue: boolean;
  }

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
      if (task.due && task.isOverdue !== true && task.isCompleted !== true) {
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
    //filters out updated tasks
    //const results = tasks.filter(({ isOverdue: id1 }) => !arr.some(({ isOverdue: id2 }) => id2 === id1));
    //console.log(results);
    //if there are any changes update the state
    //if (results.length !== 0) setList(arr)
    setList(arr);
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
    if (e) value = e.value;
    return setTaskInput(value);
  }

  return (
    <main className="grid grid-cols-1 justify-items-center">
      <h1 
      className="text-2xl p-4 w-screen bg-emerald-700 text-center border-b" 
      style={borderColorCustom}>
        HEADER
      </h1>

      {/* FORM */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Box 
        className="p-4 border bg-slate-50 rounded-bl-md rounded-br-md shadow-md h-fit" 
        style={borderColorCustom}>
          {isFormVisible === true
            ? <Box
              component="form"
              onSubmit={(e) => Add(taskInput, tagsInput, dueDate)}
              noValidate
              autoComplete="off"
              className="w-full grid">
                <p className="pb-2">Add</p>
                <TextField 
                id="task-input" 
                label="Task content" 
                variant="outlined" 
                className="shadow-inner bg-white"
                value={taskInput}
                onChange={(e: any) => {handleTaskInput(e)}}/>
                <Box className="grid grid-cols-1 2xl:grid-cols-2">
                  <Tags 
                  tagsInput={tagsInput} 
                  setTagsInput={setTagsInput}/>
      
                  <Datepicker 
                  dueDate={dueDate} 
                  setDueDate={setDueDate}/>
                </Box>
                <Box className="grid">
                  <Box className="flex justify-center gap-4">
                    <Tooltip 
                    title='Show filters' 
                    className="shadow-md p-2 w-fit h-fit text-black bg-white mt-3" 
                    sx={{
                        border: '1px solid', 
                        borderColor: '#00000044'
                    }}>
                        <IconButton onClick={() => {setIsFormVisible(false)}}>
                            <KeyboardArrowUpIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Add task'>
                      <IconButton
                      type="submit"
                      className="shadow-md p-2 w-fit h-fit text-black bg-white mt-3" 
                      sx={{
                        border: '1px solid', 
                        borderColor: '#00000044'
                      }}>
                        <AddIcon/>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            : <Box className="flex justify-center">
                <Tooltip 
                title='Show filters' 
                className="shadow-md p-2 w-fit h-fit text-black bg-white mt-3" 
                sx={{
                    border: '1px solid', 
                    borderColor: '#00000044'
                }}>
                    <IconButton 
                    className="grid grid-cols-1 mx-auto"
                    onClick={() => {setIsFormVisible(true)}}>
                        <KeyboardArrowDownIcon/>
                    </IconButton>
                </Tooltip>
              </Box>
          }
        </Box>
        <Box 
        className="p-4 border bg-slate-50 rounded-bl-md rounded-br-md shadow-md h-fit" 
        style={borderColorCustom}>
          <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          tagsSearch={tagsSearch}
          setTagsSearch={setTagsSearch}
          setList={setList}
          isVisible={isVisible}
          setIsVisible={setIsVisible}/>
        </Box>
      </Box>
        
      {/* TASKS output */}
      <Box className="grid grid-flow-row-dense grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 w-full">
        {isVisible.inProgress === true
          ? <ListOfInProgressTasks 
            tasks={...list} 
            list={list} 
            setList={setList} 
            updateTaskAPI={updateTaskAPI}/>
          : ''
        }
        
        {isVisible.completed === true
          ? <ListOfCompletedTasks 
            tasks={...list} 
            list={list} 
            setList={setList} 
            updateTaskAPI={updateTaskAPI}/>
          : ''
        }
        
        {isVisible.overdue === true
          ? <ListOfOverdueTasks 
            tasks={...list} 
            list={list} 
            setList={setList} 
            updateTaskAPI={updateTaskAPI}/>
          : ''
        }
      </Box>
    </main>
  )
}