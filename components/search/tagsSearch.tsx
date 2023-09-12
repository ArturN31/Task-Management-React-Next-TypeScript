'use client'
import { Box, Tooltip, IconButton } from '@mui/material';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

export default function TagsSearch(
    {tagsSearch, setTagsSearch}: 
    {
        tagsSearch: string[], 
        setTagsSearch: Function}) {

    let borderColorCustom = {border:'1px solid #00000044'};

    //handles addition of a tag to array
    const addTag = (tag: string) => {
        let arr = [...tagsSearch];
        arr.push(tag);
        setTagsSearch(arr);
    }

    //handles removal of a tag from array
    const removeTag = (tag: string) => {
        let arr = tagsSearch.filter((storedTag:string) => {return storedTag !== tag})
        setTagsSearch(arr);
    }

    return (
        <Box 
        className="mt-3 rounded shadow-inner p-1 w-full bg-white" 
        style={borderColorCustom}>
            <Box className="grid grid-flow-col-dense">
                <p className="m-4">Tags</p>
                <Box className="grid grid-flow-col auto-cols-max justify-center">
                    <Tooltip 
                    title="Important" 
                    className="w-fit shadow-md m-1 self-center" 
                    sx={borderColorCustom}>
                        {tagsSearch.indexOf('Important') > -1
                            ? <IconButton
                                className=''
                                color="primary"
                                onClick={() => removeTag('Important')}>
                                <NotificationImportantOutlinedIcon/>
                            </IconButton>
                            : <IconButton
                                onClick={() => addTag('Important')}>
                                <NotificationImportantOutlinedIcon/>
                            </IconButton>
                        }
                    </Tooltip>

                    <Tooltip 
                    title="Birthday" 
                    className="w-fit shadow-md m-1 self-center" 
                    sx={borderColorCustom}>
                        {tagsSearch.indexOf('Birthday') > -1
                            ? <IconButton
                            color="primary"
                            onClick={() => removeTag('Birthday')}>
                                <CakeOutlinedIcon/>
                            </IconButton>
                            : <IconButton
                            onClick={() => addTag('Birthday')}>
                                <CakeOutlinedIcon/>
                            </IconButton>
                        }
                    </Tooltip>

                    <Tooltip 
                    title="Shopping" 
                    className="w-fit shadow-md m-1 self-center" 
                    sx={borderColorCustom}>
                        {tagsSearch.indexOf('Shopping') > -1
                            ? <IconButton
                            color="primary"
                            onClick={() => removeTag('Shopping')}>
                                <ShoppingCartOutlinedIcon/>
                            </IconButton>
                            : <IconButton
                            onClick={() => addTag('Shopping')}>
                            <ShoppingCartOutlinedIcon/>
                            </IconButton>
                        }
                    </Tooltip>

                    <Tooltip 
                    title="Work" 
                    className="w-fit shadow-md m-1 self-center" 
                    sx={borderColorCustom}>
                        {tagsSearch.indexOf('Work') > -1
                            ? <IconButton
                            color="primary"
                            onClick={() => removeTag('Work')}>
                                <BusinessCenterOutlinedIcon/>
                            </IconButton>
                            : <IconButton
                            onClick={() => addTag('Work')}>
                                <BusinessCenterOutlinedIcon/>
                            </IconButton>
                        }
                    </Tooltip>

                    <Tooltip 
                    title="Meeting" 
                    className="w-fit shadow-md m-1 self-center" 
                    sx={borderColorCustom}>
                        {tagsSearch.indexOf('Meeting') > -1
                            ? <IconButton
                            color="primary"
                            onClick={() => removeTag('Meeting')}>
                                <GroupsOutlinedIcon/>
                            </IconButton>
                            : <IconButton
                            onClick={() => addTag('Meeting')}>
                                <GroupsOutlinedIcon/>
                            </IconButton>
                        }
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    )
}
