import { IChangeTaskReq, ICreateTaskReq, useChangeTaskMutation } from '@diary-app/shared'
import { Box, Button, InputBase, MenuItem, Select, TextField } from '@mui/material'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { InputsSection, RootSxProps } from '../styles'
import { IChangeTaskPageProps } from '../../../../features-MainPage/types'

const TaskEditForm = forwardRef<any, IChangeTaskPageProps>(({ data, id }, ref) => {

  const navigate = useNavigate()
  const [changeTask] = useChangeTaskMutation()
  const { control, handleSubmit, reset, getValues } = useForm<ICreateTaskReq>({
    defaultValues: {
      title: data?.title,
      description: data?.description,
      status: data?.status
    }
  })

  useImperativeHandle(ref, () => ({
    onSubmit: async () => {
      onSubmit(getValues())
    }
  }))

  const onSubmit: SubmitHandler<ICreateTaskReq> = async (taskData) => {
    const reqData = {
      taskId: id,
      taskData: getValues()
    } as IChangeTaskReq
    if(data?.description === taskData.description && data.title === taskData.title && data.status === taskData.status) {
      reset()
      navigate('/')
      return
    }
    await changeTask(reqData)
    reset()
    navigate('/')
  }

  return (
    <Box
      sx={RootSxProps}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={InputsSection}
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
              maxRows={4}
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
        display='flex'
        justifyContent='space-between'
        mt={3}
      >
          <Controller
            control={control}
            name='status'
            render={({ field }) => (
              <Select
                sx={{ width: '30%' }}
                onChange={(e) => field.onChange(e)}
                value={field.value}
              >
                <MenuItem value={'NEUTRAL'}>Neutral</MenuItem>
                <MenuItem value={'URGENT'}>Urgent</MenuItem>
                <MenuItem value={'IMPORTANT'}>Important</MenuItem>
              </Select>
            )}
          />
          <Button size='large' type='submit' color='secondary' variant='outlined'>Submit</Button>
      </Box>
    </Box>
  )
})

export default TaskEditForm
