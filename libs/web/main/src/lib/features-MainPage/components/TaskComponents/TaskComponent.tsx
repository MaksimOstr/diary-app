import { ITask, useDeleteTaskMutation, useGetTasksQuery } from '@diary-app/shared'
import { Box, Card, CardActionArea, CardContent, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { ITaskComponentProps } from '../../types'
import { breakpointColumnsObj, selectColourForTask } from './styles'
import Masonry from 'react-masonry-css'
import './styles.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import dateFormat, { masks } from "dateformat";

export const TaskComponent: React.FC<ITaskComponentProps> = ({ task }) => {
  const theme = useTheme()
  const [deleteTask] = useDeleteTaskMutation()
  const navigate = useNavigate()

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      {task?.map(task =>
        <Box className='rootBody'
          key={task.id}
          borderColor={selectColourForTask(task.status)}
        >
          <Box className='textSection'
            onClick={() => navigate(`/task/${task.id}`)}
          >
            {task.title === "" && task.description === "" ? <Box><Typography variant='h5'>Task is empty</Typography></Box> :
              <>
                <Typography className='title' variant='h6'>{task.title}</Typography>
                <Typography mt={1} className='description' fontWeight='400' variant='body1'>{task.description}</Typography>
              </>}
          </Box>
          <Box display={'flex'}>
            <Box
              className='Date'
            >
              <Typography fontSize='12px'>{dateFormat(task.createdAt, 'dd.mm.yyyy')}</Typography>
            </Box>
            <Box className='buttonSection'>
              <IconButton onClick={() => deleteTask({ taskId: task.id })} size='small'>
                <DeleteIcon color='secondary' />
              </IconButton>
            </Box>
          </Box>
        </Box>)}
    </Masonry>
  )
}
