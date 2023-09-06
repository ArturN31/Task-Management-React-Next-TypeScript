'use client'

type TaskProps = {
    content: string;
    due: Date | undefined;
    tags: string[];
    isCompleted: boolean;
    isOverdue: boolean;
}

import ListOfTasks from "./listOfTasks";

export default function ListOfInProgressTasks(
    {tasks, list, setList, updateTaskAPI}: 
    {tasks: Array<TaskProps & {_id: string}>, 
    list: TaskProps, 
    setList: any, 
    updateTaskAPI: any}) {

        let arr: any;
        if (Object.keys(tasks).length > 1) {
        arr = Object.keys(tasks).map((item: any) => {
            if (tasks[item].isOverdue === false && tasks[item].isCompleted === false) return tasks[item]})
        } else arr = tasks;
        
        if (arr.length > 0) {arr = arr.filter((el:any) => {return el})}
        
        return (
            <ListOfTasks tasks={...arr}  list={list} setList={setList} updateTaskAPI={updateTaskAPI}/>
        )
}