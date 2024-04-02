import React from 'react'
import { Box, useTheme } from '@mui/material'
import TopBar from '../features-MainPage/components/TopBar/TopBar'

export const MainPage:React.FC =() => {

  const theme = useTheme()

  return (
    <Box
      width='100vw'
      height='100vh'
      sx={{ background: theme.palette.primary.dark}}
    >
        <TopBar/>
    </Box>
  )
}