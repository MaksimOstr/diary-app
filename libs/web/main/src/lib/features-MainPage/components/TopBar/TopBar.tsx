import { AppBar, Container, Toolbar } from '@mui/material'
import React from 'react'
import BookIcon from '@mui/icons-material/Book';
import { Typography } from '@mui/material';

function TopBar() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <BookIcon fontSize='large'/>
                <Typography ml={2} variant='h5'>Diary</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar