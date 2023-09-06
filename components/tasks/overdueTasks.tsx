'use client'

type TaskProps = {
    content: string;
    due: Date | undefined;
    tags: string[];
    isCompleted: boolean;
    isOverdue: boolean;
}

import ListOfTasks from "./listOfTasks";
import { Box } from "@mui/material";

export default function ListOfOverdueTasks(
    {tasks, list, setList, updateTaskAPI}: 
    {tasks: Array<TaskProps & {_id: string}>, 
    list: TaskProps, 
    setList: any, 
    updateTaskAPI: any}) {

    let arr: any;
    if (tasks !== undefined) {
        if (Object.keys(tasks).length > 1) {
        arr = Object.keys(tasks).map((item: any) => {
            if (tasks[item].isOverdue === true) return tasks[item]})
        } else arr = tasks;

        if (arr.length > 0) {arr = arr.filter((el:any) => {return el})}
    }

    return (
        <Box className="border rounded m-4 mb-0 p-2 pb-4 h-fit shadow-sm">
            <h2 className="text-xl text-center mt-4">Overdue</h2>
            <ListOfTasks 
            tasks={...arr}  
            list={list} 
            setList={setList} 
            updateTaskAPI={updateTaskAPI}/>
        </Box>
    )
}