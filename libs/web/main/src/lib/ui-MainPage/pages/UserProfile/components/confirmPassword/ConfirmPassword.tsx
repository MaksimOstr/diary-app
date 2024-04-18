import { Box, IconButton, Stack, TextField } from '@mui/material'
import React from 'react'
import { UsernameSxProps } from './styles'
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { IConfirmPasswordProps } from '../../../../../features-MainPage/types/index';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLazyConfirmPasswordQuery } from '@diary-app/shared';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './schema/schema';

const ConfirmPassword: React.FC<IConfirmPasswordProps> = ({ reject }) => {
    const { control, reset, formState: { errors }, handleSubmit } = useForm<{ password: string }>({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            password: ''
        }
    })
const navigate = useNavigate()

    const [confirmPassword, { isLoading }] = useLazyConfirmPasswordQuery()

    const onSubmit: SubmitHandler<{ password: string }> = async (data) => {
        const id = toast.loading("Please wait...")
        await confirmPassword(data).unwrap()
        .then(res => { 
            toast.update(id, {render: "Password confirmed successfully!", type: "success", isLoading: isLoading, autoClose: 4000});
            reset()
            reject()
            navigate('changePassword')
       }).catch(err => {
              toast.update(id, {render: err.data.message, type: "error", isLoading: isLoading, autoClose: 4000 });
         });

    }

    return (
        <Box
            sx={UsernameSxProps}
        >
            <Controller
                control={control}
                name='password'
                render={({ field }) => (
                    <TextField
                        size='small'
                        fullWidth
                        color='secondary'
                        label='Confirm your password'
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />
            <Stack
                direction='row'
                ml={2}
            >
                <IconButton onClick={() => reject()} color='error'>
                    <DoDisturbIcon />
                </IconButton>
                <IconButton onClick={handleSubmit(onSubmit)} color='secondary'>
                    <CheckIcon />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default ConfirmPassword
