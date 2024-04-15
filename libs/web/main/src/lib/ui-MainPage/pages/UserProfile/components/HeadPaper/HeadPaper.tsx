import { UserProfileProps } from '../../../../../features-MainPage/types/index'
import { Avatar, Dialog, Paper, Typography } from '@mui/material'
import React from 'react'
import { PaperSxProps } from './styles'

const HeadPaper: React.FC<UserProfileProps> = ({ data }) => {
  return (
    <Paper
        sx={PaperSxProps}
        elevation={7}
    >
        <Avatar sx={{ width: '100px', height: '100px', fontSize: '50px' }}>{data?.username[0]}</Avatar>
        <Typography mt={2} variant='h4'>{data?.username}</Typography>
    </Paper>
  )
}

export default HeadPaper
