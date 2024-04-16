import { Box, ButtonBase, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { PaperSxProps, UsernameSxProps } from './styles'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonOutline from '@mui/icons-material/PersonOutline';
import { UserProfileProps } from '../../../../../features-MainPage/types/index';
import LockIcon from '@mui/icons-material/Lock';

import { useNavigate } from 'react-router-dom';
import ConfirmPassword from '../confirmPassword/confirmPassword';
const BodyPaper: React.FC<UserProfileProps> = ({ data }) => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)


    const reject = () => {
        setOpen(false)
    }


    return (
        <Paper
            elevation={7}
            sx={PaperSxProps}
        >
            <ButtonBase
                sx={UsernameSxProps}
                onClick={() => navigate('/profile/changeUsername')}
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
            {open ?
                <ConfirmPassword reject={reject}/> : <ButtonBase
                sx={UsernameSxProps}
                onClick={() => setOpen(true)}
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
                        <LockIcon/>
                        <Typography ml={2} variant='body1'>Change password</Typography>
                    </Box>
                </Box>
            </ButtonBase>}
        </Paper>
    )
}

export default BodyPaper

