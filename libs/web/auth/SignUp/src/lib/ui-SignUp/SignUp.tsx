import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formSchema } from '../features-SignUp/schema/schema'
import { yupResolver } from '@hookform/resolvers/yup';
import { formBodyProps } from '../features-SignUp/styles/styles'
import { IUserReq, useRegisterMutation } from '@diary-app/shared';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ISignUp } from '../features-SignUp/types';
import Form from '../features-SignUp/components/Form';

export const SignUp: React.FC = () => {

    const theme = useTheme()
    const navigate = useNavigate()
    const [register] = useRegisterMutation()
    const { control, handleSubmit, reset, formState: { errors } } = useForm<ISignUp>({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: ''
        }
    })
    const onSubmit: SubmitHandler<IUserReq> = async (data) => {
        await register(data).unwrap()
            .then(res => navigate('/SignIn'))
            .catch(error => {
                toast.error(error.data.message)
            })
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
                sx={formBodyProps}
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
            >
                <Typography mb={6} variant='h2'>Sign Up</Typography>
                <Form submit={handleSubmit} control={control} errors={errors} onSubmit={onSubmit} />
            </Box>
        </Box >
    )
}

