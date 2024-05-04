import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { submitButtonProps } from '../styles/styles'
import { IUserReq, useLoginMutation } from '@diary-app/shared'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from '../schema/schema'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Form: React.FC = () => {
    
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
          .catch(err => {
            toast.error(err.data.message)
            reset()
          })
      }
    return (
        <Box
            width='100%'
            rowGap={3}
            component='form'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                control={control}
                name='username'
                render={({ field }) => (
                    <TextField
                        inputProps={{ "data-testid": "usernameField"}}
                        color='secondary'
                        autoComplete='true'
                        fullWidth
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
                        inputProps={{ "data-testid": "passwordField" }}
                        color='secondary'
                        autoComplete='true'
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
            <Button data-testid="submitBtn" color='secondary' type='submit' variant="outlined" sx={submitButtonProps}>Sign In</Button>
        </Box>
    )
}

export default Form