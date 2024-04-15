import { ICreateTaskReq, useAppDispatch, useAppSelector, useCreateTaskMutation } from '@diary-app/shared'
import { Backdrop, Box, Button, Dialog, MenuItem, Select, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { bodyTaskFormProps } from './styles'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CreateTaskForm from './form/CreateTaskForm';
import { useNavigate } from 'react-router-dom';
import { TaskFormHandle } from '../../../features-MainPage/types';


export const CreateTaskPage = () => {

    const formRef = useRef<TaskFormHandle>(null!)
    const handleClose = () => formRef?.current?.onSubmit() 

    return (
        <Dialog
            PaperProps={{sx: bodyTaskFormProps}}
            open
            onClose={ handleClose }
            fullWidth
            maxWidth="md"
        >
                <Typography variant='h5'>Create a new task</Typography>
                <CreateTaskForm ref={formRef}/>
        </Dialog>
    )
}

