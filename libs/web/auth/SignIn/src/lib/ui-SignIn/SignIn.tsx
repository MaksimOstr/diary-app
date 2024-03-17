import React from 'react'
import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { formBodyProps, submitButtonProps } from '../features-SignIn/styles/styles';
import { formSchema } from '../features-SignIn/schema/schema';
import { ISignIn } from '@diary-app/shared';

export const SignIn: React.FC = () => {

  const theme = useTheme()
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ISignIn>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <Box
      sx={{ backgroundColor: theme.palette.background.default }}
      width='100vw'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        sx={ formBodyProps }
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Typography mb='10%' variant='h2'>Sign In</Typography>
        <Box
          width='100%'
          rowGap={3}
          component='form'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          onSubmit={ handleSubmit(onSubmit) }
        >
          <Controller
            control={control}
            name='username'
            render={({ field }) => (
              <TextField
                autoComplete='true'
                fullWidth
                color='secondary'
                label='Username'
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <TextField
                autoComplete='true'
                fullWidth
                color='secondary'
                label='Password'
                type='password'
                error={!!errors.password}
                onChange={(e) => field.onChange(e)}
                value={field.value}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button type='submit' color="secondary" variant="outlined" sx={ submitButtonProps }>Sign Ip</Button>
        </Box>
      </Box>
    </Box >
  )
}
