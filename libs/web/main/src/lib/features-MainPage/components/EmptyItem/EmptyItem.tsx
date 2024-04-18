import { Box, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const EmptyItem = () => {
  return (
    <Box
        width='100vw'
        height='90vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
    >
        <SearchIcon sx={{ fontSize: '100px' }} color="primary"/>
        <Typography color='primary' variant='h4'>Folder is empty!</Typography>
    </Box>
  )
}

export default EmptyItem
