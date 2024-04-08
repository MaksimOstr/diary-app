import { toggleCreateTask, useAppDispatch, useAppSelector, useCreateTaskMutation } from '@diary-app/shared'
import { Backdrop, Box, Button, Stack, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import { bodyTaskFormProps } from './styles'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ICreateFormData } from '../../types';

const CreateNewTaskForm = () => {

    const isOpen = useAppSelector(state => state.toggler.createTask)
    const theme = useTheme()
    const [create] = useCreateTaskMutation()
    const dispatch = useAppDispatch()
    const { control, handleSubmit, reset } = useForm<ICreateFormData>({
        defaultValues: {
            description: '',
            title: ''
        }
    })
    const onSubmit: SubmitHandler<ICreateFormData> = async (data) => {
        await create(data)
        reset()
        dispatch(toggleCreateTask())
    }


    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={ isOpen }
        >
            <Box
                sx={ bodyTaskFormProps }
                bgcolor={ theme.palette.background.paper }
                p='25px 40px'
            >
                <Typography variant='h5'>Create a new task</Typography>
                <Box
                    component='form'
                    width='100%'
                    mt={5}
                    onSubmit={ handleSubmit(onSubmit) }
                >
                    <Stack
                        spacing={4}
                    >
                        <Controller
                            control={ control }
                            name='title'
                            render={({ field }) => (
                                <TextField
                                    color='secondary'
                                    autoComplete='false'
                                    fullWidth
                                    label='Title'
                                    onChange={ (e) => field.onChange(e) }
                                    value={ field.value }
                                />
                            )}
                        />
                        <Controller
                            control={ control }
                            name='description'
                            render={({ field }) => (
                                <TextField
                                    rows={9}
                                    color='secondary'
                                    autoComplete='false'
                                    fullWidth
                                    multiline
                                    label='Description'
                                    onChange={ (e) => field.onChange(e) }
                                    value={ field.value }
                                />
                            )}
                        />
                    </Stack>
                    <Stack
                        justifyContent='end'
                        direction='row'
                        spacing={3}
                        mt={5}
                    >
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={ () => dispatch(toggleCreateTask()) }
                        >Cancel</Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            type='submit'
                        >Create</Button>
                    </Stack>
                </Box>
            </Box>
        </Backdrop>
    )
}

export default CreateNewTaskForm
