'use client'

type TaskProps = {
    content: string;
    due: Date | undefined;
    tags: string[];
    isCompleted: boolean;
    isOverdue: boolean;
}

import ListOutput from "./listOutput";
import { Box } from "@mui/material";

export default function ListOfOverdueTasks(
    {tasks, list, setList, updateTaskAPI}: 
    {
        tasks: Array<TaskProps & {_id: string}>, 
        list: Array<TaskProps & {_id: string}>, 
        setList: any, 
        updateTaskAPI: any}) {

    let arr: any;
    if (tasks !== undefined) {
        //returns tasks that are marked as overdue
        if (Object.keys(tasks).length > 1) {
        arr = Object.keys(tasks).map((item: any) => {
            if (tasks[item].isOverdue === true) return tasks[item]})
        } else {if (tasks[0] && tasks[0].isOverdue === true) arr = tasks}

        //filters undefined elements from array
        if (arr && arr.length > 0) {arr = arr.filter((el:any) => {return el})}
    }

    return (
        <Box className="border border-black rounded m-4 mb-0 p-2 pb-4 h-fit shadow-lg bg-slate-900/[0.5]">
            <h2 className="text-xl text-center mt-4 text-white">Overdue</h2>
            <ListOutput 
            tasks={...arr}  
            list={list} 
            setList={setList} 
            updateTaskAPI={updateTaskAPI}/>
        </Box>
    )
}