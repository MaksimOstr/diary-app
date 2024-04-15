import { useGetTaskByIdQuery } from '@diary-app/shared'
import { CircularProgress, Dialog } from '@mui/material'
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import TaskEditForm from './form/TaskEditForm'
import { TaskFormHandle } from '../../../features-MainPage/types'
import { notLoaded } from './styles'


export const TaskEditPage = () => {

  const formRef = useRef<TaskFormHandle>(null!)
   const handleClose = () => formRef?.current?.onSubmit() 

  const { id } = useParams()
  const { data, isLoading } = useGetTaskByIdQuery(id)
  


  return (
    <Dialog
      open={ true }
      onClose={ handleClose }
      maxWidth='sm'
      fullWidth
      PaperProps={{sx: isLoading ? notLoaded : { borderRadius: 3 }}}
    >
        {isLoading ? <CircularProgress/> : <TaskEditForm data={ data } id={ id } ref={ formRef }/>} 
    </Dialog>
  )
}

export default TaskEditPage

