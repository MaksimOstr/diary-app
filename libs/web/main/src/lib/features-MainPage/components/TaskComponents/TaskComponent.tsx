import { ITask, useDeleteTaskMutation, useGetTasksQuery } from '@diary-app/shared'
import { Box, Card, CardActionArea, CardContent, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { ITaskComponentProps } from '../../types'
import { breakpointColumnsObj } from './styles'
import Masonry from 'react-masonry-css'
import './styles.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'

export const TaskComponent: React.FC<ITaskComponentProps> = ({ task }) => {
  const { data } = useGetTasksQuery()
  const theme = useTheme()
  const [deleteTask] = useDeleteTaskMutation()
  const navigate = useNavigate()

  console.log(task)
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      {data?.map(task =>
        <Box className='rootBody'
          key={task.id}
        >
          <Box className='textSection'
            onClick={() => navigate(`/task/${task.id}`)}
          >
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
