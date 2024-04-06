import React from 'react'
import { Box, Fab } from '@mui/material'
import TopBar from '../features-MainPage/components/TopBar/TopBar'
import AddIcon from '@mui/icons-material/Add';
import { FabProps } from './styles';
import { openCreateTask, useAppDispatch, useAppSelector } from '@diary-app/shared';
import CreateNewTaskForm from '../features-MainPage/components/CreateNewTaskForm/CreateNewTaskForm';


export const MainPage: React.FC = () => {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)

  return (
    <Box
      width='100vw'
      height='100vh'
    >
      <TopBar />
      { isAuth ? 
        <Fab onClick={() => dispatch(openCreateTask())} sx={FabProps.sx} color="secondary" aria-label="add">
          <AddIcon />
        </Fab> :
        '' }
      <CreateNewTaskForm />
    </Box>
  )
}