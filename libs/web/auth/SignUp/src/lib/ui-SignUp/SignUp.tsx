import React from 'react'
import { Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material'
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form'
import { formSchema } from '../features-SignUp/schema/schema'
import { yupResolver } from '@hookform/resolvers/yup';
import { formBodyProps, submitButtonProps } from '../features-SignUp/styles/styles'
import { ISignUp } from '@diary-app/shared';




export const SignUp: React.FC = () => {

    const theme = useTheme()
    



    const { control, handleSubmit, reset, formState: { errors } } = useForm<ISignUp>({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit: SubmitHandler<ISignUp> = (data) => {
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
                sx={formBodyProps}
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
            >
                <Typography marginBottom='10%' variant='h2'>Sign Up</Typography>
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
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='password'
                                render={({ field }) => (
                                    <TextField
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
                        </Grid>
                        <Grid item xs={6}  >
                            <Controller
                                control={control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        type='password'
                                        label='Confirm password'
                                        color='secondary'
                                        error={!!errors.confirmPassword}
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value}
                                        helperText={errors.confirmPassword?.message}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' color="secondary" variant="outlined" sx={submitButtonProps}>Sign Up</Button>
                </Box>
            </Box>
        </Box >
    )
}

