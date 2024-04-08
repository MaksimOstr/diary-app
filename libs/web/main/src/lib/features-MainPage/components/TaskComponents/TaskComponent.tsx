import { ITask, useDeleteTaskMutation } from '@diary-app/shared'
import { Box, Card, CardActionArea, CardContent, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { ITaskComponentProps } from '../../types'
import { breakpointColumnsObj } from './styles'
import Masonry from 'react-masonry-css'
import './styles.scss'
import DeleteIcon from '@mui/icons-material/Delete';

const TaskComponent: React.FC<ITaskComponentProps> = ({ task }) => {
  const theme = useTheme()
  const [deleteTask] = useDeleteTaskMutation()
  console.log(task)
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      {task?.map(task =>
        <Box className='rootBody'
          onClick={() => console.log(task.id)}
          key={task.id}
        >
          <Box className='textSection'>
            <Typography className='title' variant='h6'>{task.title}</Typography>
            <Typography mt={1} className='description' fontWeight='400' variant='body2'>{task.description}</Typography>
          </Box>
          <Box className='buttonSection'>
            <IconButton onClick={() => deleteTask({ taskId: task.id })} size='small'>
              <DeleteIcon color='secondary' />
            </IconButton>
          </Box>
        </Box>)}
    </Masonry>
  )
}

export default TaskComponent