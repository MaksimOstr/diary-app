import { Box, Grid, TextField, Button } from '@mui/material'
import React from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'
import { submitButtonProps } from '../styles/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from '../schema/schema'
import { ISignUp } from '../types'
import { IUserReq, useRegisterMutation } from '@diary-app/shared'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Form: React.FC = () => {
    

    const [register] = useRegisterMutation()
    const navigate = useNavigate()
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
            .then(res => {
                toast.success('Account is successfully created!')
                navigate('/SignIn')
            })
            .catch(error => {
                toast.error(error.data.message)
                reset()
            })
    }

    return (
        <Box
            width='100%'
            component='form'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid container width='100%' spacing={2} display='flex' alignItems='center' justifyContent='center'>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name='username'
                        render={({ field }) => (
                            <TextField
                                inputProps={{ "data-testid": "usernameField" }}
                                color='secondary'
                                autoComplete='false'
                                fullWidth
                                label='Username'
                                onChange={(e) => field.onChange(e)}
                                value={field.value}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        control={control}
                        name='password'
                        render={({ field }) => (
                            <TextField
                                inputProps={{ "data-testid": "passwordField" }}
                                color='secondary'
                                autoComplete='false'
                                fullWidth
                                label='Password'
                                type='password'
                                error={!!errors.password}
                                onChange={(e) => field.onChange(e)}
                                value={field.value}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}  >
                    <Controller
                        control={control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <TextField
                                inputProps={{ "data-testid": "confirmPasswordField" }}
                                color='secondary'
                                autoComplete='false'
                                fullWidth
                                type='password'
                                label='Confirm password'
                                error={!!errors.confirmPassword}
                                onChange={(e) => field.onChange(e)}
                                value={field.value}
                                helperText={errors.confirmPassword?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Button color='secondary' type='submit' variant="outlined" sx={submitButtonProps}>Sign Up</Button>
        </Box>
    )
}

export default Form
