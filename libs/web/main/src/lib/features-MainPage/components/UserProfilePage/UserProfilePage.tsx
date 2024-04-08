import { useAppSelector } from '@diary-app/shared'
import { Backdrop, Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { BodySxProps } from './styles'


const UserProfilePage = () => {

    const isOpen = useAppSelector(state => state.toggler.userInfoPage)
    const theme = useTheme()

  return (
    <Backdrop
        open = {isOpen}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
        <Box
            bgcolor={ theme.palette.background.paper }
            sx={ BodySxProps }
        >
            <Typography variant='h3'>User Profile</Typography>
        </Box>
    </Backdrop>
  )
}

export default UserProfilePage
