'use client'
import { Box, Tooltip, IconButton } from '@mui/material';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

export default function Tags(props:any) {
  //handles addition of a tag to array
  const addTag = (tag: string) => {
    let arr = [...props.tagsInput];
    arr.push(tag);
    props.setTagsInput(arr);
  }

  //handles removal of a tag from array
  const removeTag = (tag: string) => {
    let arr = props.tagsInput.filter((storedTag:string) => {
      return storedTag !== tag
    })
    props.setTagsInput(arr);
  }

  return (
    <Box 
    className="mt-3 border rounded shadow-inner p-1 w-full bg-white" 
    style={{borderColor: '#00000044'}}>
        <Box className="grid grid-flow-col auto-cols-max justify-center">
            <p className="m-4">Tags</p>
            <Tooltip 
            title="Important" 
            className="w-fit shadow-md m-1 self-center">
            {props.tagsInput.indexOf('Important') > -1
                ? <IconButton
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
            className="w-fit shadow-md m-1 self-center">
            {props.tagsInput.indexOf('Birthday') > -1
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
            className="w-fit shadow-md m-1 self-center">
            {props.tagsInput.indexOf('Shopping') > -1
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
            className="w-fit shadow-md m-1 self-center">
            {props.tagsInput.indexOf('Work') > -1
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
            className="w-fit shadow-md m-1 self-center">
            {props.tagsInput.indexOf('Meeting') > -1
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
  )
}
