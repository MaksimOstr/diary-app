import { ICreateTaskReq, useCreateTaskMutation } from '@diary-app/shared'
import { Box, Button, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


// eslint-disable-next-line no-empty-pattern
const CreateTaskForm = forwardRef(({}, ref) => {

    const navigate = useNavigate()
    const [create] = useCreateTaskMutation()

    const { control, handleSubmit, reset, getValues } = useForm<ICreateTaskReq>({
        defaultValues: {
            description: '',
            title: '',
            status: 'NEUTRAL'
        }
    })

    useImperativeHandle(ref, () => ({
        onSubmit: async () => {
            onSubmit(getValues())
        }
    }))

    const onSubmit: SubmitHandler<ICreateTaskReq> = async (data) => {
        if (data.description === "" && data.title === "") {
            navigate('/')
            return
        }
        await create(data)
        reset()
        navigate('/')
    }


    return (
        <Box
            component='form'
            width='100%'
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack
                spacing={2}
            >
                <Box
                    display='flex'
                >
                    <Controller
                        control={control}
                        name='title'
                        render={({ field }) => (
                            <TextField
                                color='secondary'
                                autoComplete='false'
                                maxRows={2}
                                multiline
                                fullWidth
                                label='Title'
                                onChange={(e) => field.onChange(e)}
                                value={field.value}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='status'
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onChange={(e) => field.onChange(e)}
                                sx={{ ml: 1, width: '20%' }}
                            >
                                <MenuItem value={'NEUTRAL'}>Neutral</MenuItem>
                                <MenuItem value={'URGENT'}>Urgent</MenuItem>
                                <MenuItem value={'IMPORTANT'}>Important</MenuItem>
                            </Select>
                        )}
                    />
                </Box>
                <Controller
                    control={control}
                    name='description'
                    render={({ field }) => (
                        <TextField
                            rows={9}
                            color='secondary'
                            autoComplete='false'
                            fullWidth
                            multiline
                            label='Description'
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
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
                    onClick={() => navigate('/')}
                >Cancel</Button>
                <Button
                    variant='outlined'
                    color='secondary'
                    type='submit'
                >Create</Button>
            </Stack>
        </Box>
    )
})

export default CreateTaskForm
