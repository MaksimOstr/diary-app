import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'
import { formBodyProps } from '../features-SignIn/styles/styles';
import { IUserReq, useLoginMutation } from '@diary-app/shared';
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Form from '../features-SignIn/components/Form';


export const SignIn: React.FC = () => {

  const theme = useTheme()

  

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        data-testid="formBody"
        bgcolor={theme.palette.background.paper}
        sx={formBodyProps}
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Typography data-testid="formTitle" mb={2} variant='h2' fontWeight='500'>Sign in</Typography>
        <Typography mb={6} variant='body2'>Still don't have an account? <Link to='/SignUp' style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }}>SignUp</Link></Typography>
        <Form/>
      </Box>
    </Box >
  )
}
