
import { Box, Button, Dialog, Modal, Stack, TextField, Typography } from '@mui/material'
import { UserProfileProps } from '../../../../../features-MainPage/types/index'
import React from 'react'
import { RootSxProps } from './styles'
import { useNavigate } from 'react-router-dom'
import { ICreateTaskReq, useChangeUsernameMutation, useFetchUserQuery } from '@diary-app/shared'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './schema/schema'
import { toast } from 'react-toastify'

export const ChangeUsernameForm: React.FC = () => {

  const navigate = useNavigate()
  const { data } = useFetchUserQuery()
  const [changeUsername] = useChangeUsernameMutation()
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm<{ username: string }>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: data?.username
    }
  })

  const onSubmit = async (data: {username: string}) => {
    await changeUsername(data).unwrap()
      .then(res => {
        toast.success(`Username was changed on ${data.username}`)
        navigate('/profile')
      })
      .catch(error => toast.error(error.data.message))
    reset()
  }

  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      open
      PaperProps={{ sx: RootSxProps }}
      onClose={() => navigate('/profile')}
    >
      <Typography variant='h5'>Editing username</Typography>
      <Controller
        control={control}
        name='username'
        render={({ field }) => (
          <TextField
            sx={{ mt: 2}}
            color='secondary'
            label='Username'
            variant='standard'
            autoComplete='false'
            error={!!errors.username}
            onChange={(e) => field.onChange(e)}
            value={field.value}
            helperText={errors.username?.message}
          />
        )}
      />
      <Stack
        direction='row'
        mt={3}
        spacing={2}
        justifyContent='end'
      >
        <Button onClick={() => navigate(-1)} variant='outlined' color='error'>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant='outlined' color='secondary'>Change</Button>
      </Stack>
    </Dialog>
  )
}

