'use client'

import { Box } from '@mui/material';
import Task from "@/components/tasks/task";

export default function ListOfTasks(
    {tasks, list, setList, updateTaskAPI}: 
    {tasks: any, list: any, setList: any, updateTaskAPI: any}) {

    //renders a grid of tasks
    return (
        tasks !== undefined
        ?   <Box 
            className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
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
                        isOverdue={tasks[item].isOverdue}
                        updateTaskAPI={updateTaskAPI}/>
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
                        isOverdue={tasks[0].isOverdue}
                        updateTaskAPI={updateTaskAPI}/>
                    : ''
                }
            </Box>
        :   ''
    )
}