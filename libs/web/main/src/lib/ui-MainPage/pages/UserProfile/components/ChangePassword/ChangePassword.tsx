import { Button, Dialog, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PaperProps } from './styles'
import { Controller } from 'react-hook-form'
import { IChangePasswordForm } from '../../../../../features-MainPage/types/index'
import { useChangePasswordMutation } from '@diary-app/shared'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './schema/schema'

export const ChangePassword = () => {

    const navigate = useNavigate()
    const [changePassword, { isLoading }] = useChangePasswordMutation()

    const { reset, control, handleSubmit, formState: { errors } } = useForm<IChangePasswordForm>({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit: SubmitHandler<IChangePasswordForm> = async (data) => {
        const id = toast.loading("Please wait...")
        await changePassword(data).unwrap()
            .then(res => {
                toast.update(id, { render: "Password has been changed successfully", type: "success", isLoading: isLoading, autoClose: 4000 });
                navigate('/')
            }).catch(err => {
                toast.update(id, { render: err.data.message, type: "error", isLoading: isLoading, autoClose: 4000 });
            });
        reset()
    }

    return (
        <Dialog
            open
            onClose={() => navigate(-1)}
            PaperProps={{ sx: PaperProps }}
            maxWidth='xs'
            fullWidth
        >
            <Typography variant='h5'>Create a new password</Typography>
            <Stack mt={3} spacing={3}>
                <Controller
                    control={control}
                    name='password'
                    render={({ field }) => (
                        <TextField
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            color='secondary'
                            label='Password'
                            variant='standard'
                            autoComplete='false'
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <TextField
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            color='secondary'
                            label='Confirm password'
                            variant='standard'
                            autoComplete='false'
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                        />
                    )}
                />
            </Stack>
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

