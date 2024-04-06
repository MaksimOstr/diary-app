import { Box, Grid, TextField, Button } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { submitButtonProps } from '../styles/styles'
import { ISignUpFormProps } from '../types'

const Form: React.FC<ISignUpFormProps> = ({ submit, control, errors, onSubmit }) => {
    return (
        <Box
            width='100%'
            component='form'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            onSubmit={submit(onSubmit)}
        >
            <Grid container width='100%' spacing={2} display='flex' alignItems='center' justifyContent='center'>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name='username'
                        render={({ field }) => (
                            <TextField
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
