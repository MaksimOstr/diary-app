import { useGetTaskByIdQuery } from '@diary-app/shared'
import { CircularProgress, Dialog, DialogContent, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TaskEditForm from './components/TaskEditForm'
interface TaskEditFormHandle {
  onSubmit: () => void;
}

export const TaskEditPage = () => {

  const formRef = useRef<TaskEditFormHandle>(null!)
   const handleClose = () => formRef?.current?.onSubmit() 

  const { id } = useParams()
  const { data, isLoading } = useGetTaskByIdQuery(id)
  const navigate = useNavigate()


  return (
    <Dialog
      open={ true }
      onClose={ handleClose }
      PaperProps={{sx: { borderRadius: 3, width: '50%' }}}
    >
        {isLoading ? <CircularProgress/> : <TaskEditForm ref={ formRef } data={ data } id={ id }/>} 
    </Dialog>
  )
}

export default TaskEditPage

