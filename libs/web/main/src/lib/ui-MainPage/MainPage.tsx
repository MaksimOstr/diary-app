import React from 'react'
import { Box, Fab } from '@mui/material'
import TopBar from '../features-MainPage/components/TopBar/TopBar'
import AddIcon from '@mui/icons-material/Add';
import { FabProps } from './styles';
import { useAppSelector, useGetTasksQuery } from '@diary-app/shared';
import { TaskComponent } from '../features-MainPage/components/TaskComponents/TaskComponent';
import { Outlet, useNavigate } from 'react-router-dom';
import EmptyItem from '../features-MainPage/components/EmptyItem/EmptyItem';


export const MainPage: React.FC = () => {

  const navigate = useNavigate()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const { isLoading } = useGetTasksQuery()
  const tasks = useAppSelector(state => state.tasks.tasks)
  
  return (
    <Box>
      <TopBar/>
      {isAuth ?
        <Fab data-testid='addNewTaskPage' onClick={() => navigate('/task/create')} sx={FabProps.sx} color="secondary" aria-label="add">
          <AddIcon />
        </Fab> :
        ''}
      {isAuth ? isLoading ? '' : tasks.length === 0 ? <EmptyItem/> : <TaskComponent task={tasks}/> : ''}
      <Outlet />
    </Box>
  )
}
