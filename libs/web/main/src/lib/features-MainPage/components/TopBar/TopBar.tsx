import { AppBar, Button, Container, useTheme, Toolbar, Chip, ListItemIcon, MenuItem, Menu, TextField, Box } from '@mui/material'
import React from 'react'
import BookIcon from '@mui/icons-material/Book';
import { Typography } from '@mui/material';
import { useAppSelector, useGetTasksQuery, useLogoutMutation } from '@diary-app/shared';
import { useNavigate } from 'react-router-dom';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DatePicker from '../DatePicker/DatePicker'
import SearchTextField from '../SearchTextField/SearchTextField';
import UserDropIcon from '../UserDropIcon/UserDropIcon';

export default function TopBar() {

    const { user, isAuth } = useAppSelector(state => state.auth)
    const theme = useTheme()
    const navigate = useNavigate()
    const { data, isLoading } = useGetTasksQuery()



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppBar sx={{ bgcolor: theme.palette.background.default }} position='static' elevation={0}>
                <Toolbar>
                    <Box flexGrow='1' display='flex' alignItems='center' >
                        <BookIcon fontSize='large' />
                        <Typography fontWeight='600' ml={1.5} variant='h5'>Diary</Typography>
                        {isAuth ? <SearchTextField tasks={data} isLoading={isLoading} /> : ''}
                        {isAuth ? <DatePicker tasks={data} isLoading={isLoading} /> : ''}
                    </Box>
                    {isAuth ? <UserDropIcon user={user} navigate={navigate} /> : <Button size='medium' color='secondary' onClick={() => navigate('/SignIn')} variant="contained">Log In</Button>}
                </Toolbar>
            </AppBar>
        </LocalizationProvider>
    )
}

