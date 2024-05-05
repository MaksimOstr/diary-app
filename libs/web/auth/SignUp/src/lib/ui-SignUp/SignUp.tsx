import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formSchema } from '../features-SignUp/schema/schema'
import { yupResolver } from '@hookform/resolvers/yup';
import { formBodyProps } from '../features-SignUp/styles/styles'
import { IUserReq, useRegisterMutation } from '@diary-app/shared';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ISignUp } from '../features-SignUp/types';
import Form from '../features-SignUp/components/Form';

export const SignUp: React.FC = () => {

    const theme = useTheme()

    return (
        <Box
            width='100vw'
            height='100vh'
            display='flex'
            justifyContent='center'
            alignItems='center'
            data-testid="background"
        >
            <Box
                bgcolor={theme.palette.background.paper}
                sx={formBodyProps}
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                data-testid="paper"
            >
                <Typography data-testid="title" mb={2} variant='h2' fontWeight='500'>Sign up</Typography>
                <Typography mb={6} variant='body2'>You already have an account? <Link to='/SignIn' data-testid="link" style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }}>SignUp</Link></Typography>
                <Form/>
            </Box>
        </Box >
    )
}

