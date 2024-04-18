import React, { useEffect } from 'react'
import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { formBodyProps, submitButtonProps } from '../features-SignIn/styles/styles';
import { IUserReq, useAppDispatch, useAppSelector, useLoginMutation } from '@diary-app/shared';
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Form from '../features-SignIn/components/Form';
import { formSchema } from '../features-SignIn/schema/schema';


export const SignIn: React.FC = () => {

  const theme = useTheme()
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const { control, handleSubmit, reset, formState: { errors } } = useForm<IUserReq>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })


  const onSubmit: SubmitHandler<IUserReq> = async (data) => {
    await login(data).unwrap()
      .then(res => {
        toast.success(`Authorization is successful! Hello ${data.username}!`)
        navigate('/')
      })
      .catch(err => toast.error(err.data.message))
    reset()
  }

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        bgcolor={theme.palette.background.paper}
        sx={formBodyProps}
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Typography mb={2} variant='h2' fontWeight='500'>Sign In</Typography>
        <Typography mb={6} variant='body2'>Still don't have an account? <Link to='/SignUp' style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }} >SignUp</Link></Typography>
        <Form onSubmit={onSubmit} control={control} errors={errors} submit={handleSubmit} />
      </Box>
    </Box >
  )
}
