'use client'
import { Box } from '@mui/material';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Datepicker(
    {dueDate, setDueDate}: 
    {
        dueDate: Date | undefined, 
        setDueDate: Function}) {

    //handles date choice
    const handleDueDate = (date: Date) => setDueDate(date);

    let borderColorCustom = {borderColor: '#00000044'};

    return (
        <Box 
        className="mt-3 flex justify-center border rounded shadow-inner p-1 w-full bg-white" 
        style={borderColorCustom}>
            <Box className="grid grid-flow-col-dense w-full">
                <p className="m-4">Due</p>
                <Box className="grid justify-center items-center">
                    <DatePicker
                    id='datepicker'
                    selected={dueDate}
                    placeholderText="Choose date"
                    onChange={(date: Date) => handleDueDate(date)}
                    withPortal
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="d MMMM, yyyy h:mm aa"
                    className="cursor-pointer hover:bg-slate-100 mr-2 rounded p-2 shadow-md border w-full"/>
                </Box>
            </Box>
        </Box>
    )
}
