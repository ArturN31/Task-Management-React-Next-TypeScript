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

import { TaskProps, isVisibleProps } from "@/lib/types";

// - Implement task editing.
// - Implement reminders for due dates.
// - Remove/Archive overdue tasks after a period of time ~ 1 day.

export default function Home() {
  const [list, setList] = useState<Array<TaskProps>>(Array<TaskProps>);
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

  const getLocalStorage = () => {
    if (localStorage.tasks) {
      let lsTasks: TaskProps[] = JSON.parse(localStorage.tasks);
      return lsTasks;
    } return []
  }

  useEffect(() => {
    let arr = getLocalStorage();
    if (arr) setList(arr);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prepDateToStringify = (date: Date | undefined) => {
    let utcDate = date  
    ? new Date(Date.UTC(
      date.getFullYear(), 
      date.getMonth(), 
      date.getDate(), 
      date.getHours(), 
      date.getMinutes()))
    : undefined;
    return utcDate;
  }

  //adding task
  const Add = async (
    input: string, 
    tags: string[], 
    due: Date | undefined
    ) => {
      if (input !== '') {
        let task = {
          id: 'id_' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2),
          content: input.charAt(0).toUpperCase() + input.slice(1),
          isCompleted: false,
          due: due ? due : undefined,
          tags: tags,
          isOverdue: false
        }
        if (list.length >= 1) { //list contains objects - add as last
          //preping task to add it to local storage
          let utcDate = prepDateToStringify(task.due);
          task.due = utcDate;
          let stringifiedTask = JSON.parse(JSON.stringify(task));

          //getting prev list of tasks and pushing new preped task to it
          let prevList: Array<TaskProps> = [...list];
          prevList.push(stringifiedTask);

          //setting ls
          localStorage.setItem('tasks', JSON.stringify(prevList));
        } else { //empty list - add as first
          //preping task to add it to local storage
          let utcDate = prepDateToStringify(task.due);
          task.due = utcDate;
          let arrToStringify: any = [];
          arrToStringify.push(task);

          //setting ls
          localStorage.setItem('tasks', JSON.stringify(arrToStringify));
        }

        //resetting inputs
        setTagsInput([]);
        setTaskInput('');
        setDueDate(undefined);
      }
  }

  //marks tasks as overdue when due date is in the past
  const MarkAsOverdue = (tasks: Array<TaskProps>) => {
    let arr = tasks.map((task: TaskProps) => {
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
          // updateTaskAPI(task._id, 'overdue', true); //updates task as overdue
          return task;
        } else return task;
      } return task;
    })
    setList(arr);
    localStorage.setItem('tasks', JSON.stringify(arr));
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
      <h1 className="text-2xl p-4 pb-1 text-center text-white">Task Management</h1>

      {/* FORM */}
      <Box className="grid grid-cols-1 md:grid-cols-2 w-full">
        <Box className="border border-black rounded m-4 mb-0 p-2 pb-4 h-fit shadow-lg bg-slate-900/[0.5]">
          {isFormVisible === true
            ? <Box
              component="form"
              onSubmit={() => Add(taskInput, tagsInput, dueDate)}
              noValidate
              autoComplete="off"
              className="w-full grid">
                <p className="pb-2 text-white">Add tasks</p>
                <TextField 
                id="task-input" 
                label="Task content"
                variant="filled" 

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
                    title='Hide form' 
                    className="shadow-md p-2 w-fit h-fit text-black bg-white mt-3 hover:bg-amber-500" 
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
                      className="shadow-md p-2 w-fit h-fit text-black bg-white mt-3 hover:bg-green-500" 
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
                title='Show form' 
                className="shadow-md p-2 w-fit h-fit text-black bg-white mt-3 hover:bg-amber-500" 
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
        <Box className="border border-black rounded m-4 mb-0 p-2 pb-4 h-fit shadow-lg bg-slate-900/[0.5]">
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
      <Box className="grid grid-flow-row-dense grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 w-full sm:w-fit">
        {isVisible.inProgress === true
          ? <ListOfInProgressTasks 
            tasks={...list} 
            list={list} 
            setList={setList}/>
          : ''
        }
        
        {isVisible.completed === true
          ? <ListOfCompletedTasks 
            tasks={...list} 
            list={list} 
            setList={setList}/>
          : ''
        }
        
        {isVisible.overdue === true
          ? <ListOfOverdueTasks 
            tasks={...list} 
            list={list} 
            setList={setList}/>
          : ''
        }
      </Box>
    </main>
  )
}