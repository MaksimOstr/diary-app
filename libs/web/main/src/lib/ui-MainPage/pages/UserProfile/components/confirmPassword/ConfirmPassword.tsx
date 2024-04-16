import { Box, IconButton, Stack, TextField } from '@mui/material'
import React from 'react'
import { UsernameSxProps } from './styles'
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { IConfirmPasswordProps } from '../../../../../features-MainPage/types/index';

const ConfirmPassword: React.FC<IConfirmPasswordProps> = ({reject}) => {
  return (
    <Box
        sx={UsernameSxProps}
    >
        <TextField size='small' fullWidth/>
        <Stack
            direction='row'
            ml={2}
        >
             <IconButton onClick={() => reject()} color='error'>
                <DoDisturbIcon/>
             </IconButton>
            <IconButton color='secondary'>
                <CheckIcon/>
            </IconButton>
        </Stack>
    </Box>
  )
}

export default ConfirmPassword
