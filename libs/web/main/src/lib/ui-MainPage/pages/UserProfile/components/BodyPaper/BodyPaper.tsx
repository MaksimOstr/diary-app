import { Box, ButtonBase, Paper, Typography } from '@mui/material'
import React from 'react'
import { PaperSxProps, UsernameSxProps } from './styles'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonOutline from '@mui/icons-material/PersonOutline';
import { UserProfileProps } from '../../../../../features-MainPage/types/index';
const BodyPaper: React.FC<UserProfileProps> = ({ data }) => {
    return (
        <Paper
            elevation={7}
            sx={PaperSxProps}
        >
            <ButtonBase
                sx={UsernameSxProps}
            >
                <Box
                    width='100%'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Box
                        display='flex'
                        alignItems='center'
                    >
                        <PersonOutlineIcon />
                        <Typography ml={2} variant='body1'>Username</Typography>
                    </Box>
                    <Typography variant='h6'>{data?.username}</Typography>
                </Box>
            </ButtonBase>
        </Paper>
    )
}

export default BodyPaper

