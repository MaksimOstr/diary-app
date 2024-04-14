import React, { useEffect, useState } from 'react'
import { Box, Fab } from '@mui/material'
import TopBar from '../features-MainPage/components/TopBar/TopBar'
import AddIcon from '@mui/icons-material/Add';
import { FabProps } from './styles';
import { ITask, setTasks, toggleCreateTask, useAppDispatch, useAppSelector, useGetTasksQuery } from '@diary-app/shared';
import CreateNewTaskForm from '../features-MainPage/components/CreateNewTaskForm/CreateNewTaskForm';
import { TaskComponent } from '../features-MainPage/components/TaskComponents/TaskComponent';
import UserProfilePage from '../features-MainPage/components/UserProfilePage/UserProfilePage';
import { Outlet } from 'react-router-dom';
import EmptyItem from '../features-MainPage/components/EmptyItem/EmptyItem';


export const MainPage: React.FC = () => {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const { isLoading } = useGetTasksQuery()
  const tasks = useAppSelector(state => state.tasks.tasks)
  
  


  
  return (
    <Box>
      <TopBar/>
      {isAuth ?
        <Fab onClick={() => dispatch(toggleCreateTask())} sx={FabProps.sx} color="secondary" aria-label="add">
          <AddIcon />
        </Fab> :
        ''}
      <CreateNewTaskForm />
      <UserProfilePage />
      {isAuth ? isLoading ? '' : tasks.length === 0 ? <EmptyItem/> : <TaskComponent task={tasks}/> : ''}
      <Outlet />
    </Box>
  )
}
