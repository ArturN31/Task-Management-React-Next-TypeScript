'use client'

type TaskProps = {
    content: string;
    due: Date | undefined;
    tags: string[];
    isCompleted: boolean;
    isOverdue: boolean;
}

type isVisibleProps = {
    inProgress: boolean;
    completed: boolean;
    overdue: boolean;
}

import { TextField, IconButton, Tooltip, Box } from "@mui/material";
import TagsSearch from "../search/tagsSearch";
import { useEffect, useState } from "react";
import ListFilter from "./listFilter";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Search(
    {searchInput, setSearchInput, tagsSearch, setTagsSearch, setList, isVisible, setIsVisible}: 
    {
        searchInput: string, 
        setSearchInput: Function,
        tagsSearch: string[],
        setTagsSearch: Function,
        setList: Function,
        isVisible: isVisibleProps,
        setIsVisible: Function
    }) {

    const [isSearchVisible, setIsSearchVisible] = useState<Boolean>(true);

    //handles search input
    const handleSearchInput = (event: Event) => {
        let e = event?.target as HTMLInputElement
        if (e) setSearchInput(e.value);
    }

    //retrieves tasks from local storage
    const getTasksFromLocalStorage = () => {
        let lsTasks: TaskProps[];
        if (localStorage.tasks) {
            lsTasks = JSON.parse(localStorage.tasks);
            return lsTasks;
        }
    }

    //retrieves tasks from api
    const getTasksFromAPI = async () => {
        let res: JSON = await fetch('api/tasks')
            .then((response) => response.json())
            .then((todos) => {return todos});
        return res;
    }

    const searchByTaskContent = async (input: string) => {
        let ls = getTasksFromLocalStorage();
        if (ls) { //local storage is set
            if (input !== '') { //if there is search input
                //filters the list with tasks and returns array with tasks that contain input
                let res: TaskProps[] = ls.filter((task: TaskProps) => 
                    task.content.toLowerCase().includes(input.toLowerCase()));
                if (res) setList(res);
            }   else setList(ls); //if no search input return list of tasks
        }   else { //local storage is not set
            let tasks = await getTasksFromAPI();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    const searchByTaskTags = async (input: string[]) => {
        let ls = getTasksFromLocalStorage();
        if(ls) { //local storage is set
            if (input.length > 0) { //if there is search input
                let res: TaskProps[] = ls.filter((task: TaskProps) => {
                    //returns tasks that match all and some filtering tags
                    if (task.tags.length === input.length || task.tags.length < input.length) 
                    return task.tags.every((tag: string) => input.indexOf(tag) >= 0)
                    
                    //if more filters than task tags match all
                    if (task.tags.length > input.length) 
                    return task.tags.some((tag: string) => input.indexOf(tag) >= 0)
                });
                if (res) setList(res);
            } else setList(ls); //if no search input return list of tasks
        }   else { //local storage is not set
            let tasks = await getTasksFromAPI();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    
    useEffect(() => {
        searchByTaskContent(searchInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput])

    useEffect(() => {
        searchByTaskTags(tagsSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagsSearch])

    return (
        isSearchVisible === true
        ?   <>
                <p className="pb-2 text-white">Filter tasks</p>
                <TextField 
                id="task-input" 
                label="Search for a task" 
                variant="filled" 
                className="shadow-inner bg-white grid self-center"
                value={searchInput}
                onChange={(e: any) => {handleSearchInput(e)}}/>
    
                <Box className="grid grid-cols-1 2xl:grid-cols-2">
                    <TagsSearch
                    tagsSearch={tagsSearch}
                    setTagsSearch={setTagsSearch}/>
        
                    <ListFilter
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}/>
                </Box>

                <Tooltip 
                title='Hide filters' 
                className="shadow-md p-2 w-fit h-fit text-black bg-white mt-3 hover:bg-amber-500" 
                sx={{
                    border: '1px solid', 
                    borderColor: '#00000044'
                }}>
                    <IconButton 
                    className="grid grid-cols-1 mx-auto"
                    onClick={() => {setIsSearchVisible(false)}}>
                        <KeyboardArrowUpIcon/>
                    </IconButton>
                </Tooltip>
            </>
        :   <Tooltip 
            title='Show filters' 
            className="shadow-md p-2 w-fit h-fit text-black bg-white mt-3 hover:bg-amber-500" 
            sx={{
                border: '1px solid', 
                borderColor: '#00000044'
            }}>
                <IconButton 
                className="grid grid-cols-1 mx-auto hover:bg-amber-500"
                onClick={() => {setIsSearchVisible(true)}}>
                    <KeyboardArrowDownIcon/>
                </IconButton>
            </Tooltip>
    )
}