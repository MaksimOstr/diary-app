import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { ISignInFormProps } from '../types'
import { submitButtonProps } from '../styles/styles'

const Form: React.FC<ISignInFormProps> = ({ submit, control, errors, onSubmit }) => {
    return (
        <Box
            width='100%'
            rowGap={3}
            component='form'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            onSubmit={submit(onSubmit)}
        >
            <Controller
                control={control}
                name='username'
                render={({ field }) => (
                    <TextField
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
            <Button type='submit' variant="outlined" sx={submitButtonProps}>Sign Ip</Button>
        </Box>
    )
}

export default Form