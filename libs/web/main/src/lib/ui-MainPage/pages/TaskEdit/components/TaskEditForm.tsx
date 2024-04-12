import { IChangeTaskReq, ICreateTaskReq, useChangeTaskMutation } from '@diary-app/shared'
import { Box, Button, InputBase, TextField } from '@mui/material'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { InputsSection, RootSxProps } from '../styles'
import { IChangeTaskPageProps } from '../../../../features-MainPage/types'

const TaskEditForm = forwardRef<any, IChangeTaskPageProps>(({ data, id }, ref) => {

  const navigate = useNavigate()
  const [changeTask] = useChangeTaskMutation()
  console.log(data)
  const { control, handleSubmit, reset, getValues } = useForm<ICreateTaskReq>({
    defaultValues: {
      title: data?.title,
      description: data?.description
    }
  })

  useImperativeHandle(ref, () => ({
    onSubmit: async () => {
      const reqBody = {
        taskData: getValues(),
        taskId: id
      } as IChangeTaskReq
      await changeTask(reqBody).unwrap()
      navigate('/')
    }
  }))

  const onSubmit: SubmitHandler<ICreateTaskReq> = async (data) => {
    const reqData = {
      taskId: id,
      taskData: data
    } as IChangeTaskReq
    await changeTask(reqData)
    navigate('/')
  }

  return (
    <Box
      sx={ RootSxProps }
      component='form'
      onSubmit={ handleSubmit(onSubmit) }
    >
      <Box
        sx={ InputsSection }
      >
        <Controller
          control={control}
          name='title'
          render={({ field }) => (
            <InputBase
              sx={{ fontSize: '25px' }}
              placeholder='Enter a title'
              color='secondary'
              autoComplete='false'
              fullWidth
              multiline
              onChange={(e) => field.onChange(e)}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name='description'
          render={({ field }) => (
            <InputBase
              maxRows={25}
              sx={{ mt: 1 }}
              color='secondary'
              placeholder='Enter a description'
              autoComplete='false'
              fullWidth
              multiline
              onChange={(e) => field.onChange(e)}
              value={field.value}
            />
          )}
        />
      </Box>
      <Box
        mt={3}
      >
        <Button size='large' type='submit' color='secondary' variant='outlined'>Submit</Button>
      </Box>
    </Box>
  )
})

export default TaskEditForm
