import { AppBar, Button, Container, useTheme, Toolbar, Chip, ListItemIcon, MenuItem, Menu } from '@mui/material'
import React from 'react'
import BookIcon from '@mui/icons-material/Book';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AccountMenu from '../AccountsMenu/AccountMenu';
import { useAppSelector, useLogoutMutation } from '@diary-app/shared';
import { useNavigate } from 'react-router-dom';


export default function TopBar() {

    const [logout] = useLogoutMutation()
    const { user, isAuth } = useAppSelector(state => state.auth)
    const theme = useTheme()
    const navigate = useNavigate()




    return (
        <AppBar position='static'>
            <Toolbar>
                <BookIcon fontSize='large' />
                <Typography sx={{ flexGrow: 1 }} ml={2} variant='h5'>Diary</Typography>
                {isAuth ? <AccountMenu user={user} logout={ logout } navigate={ navigate }/> : <Button size='large' onClick={() => navigate('/SignIn')} sx={{ bgcolor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }} variant="contained">Log In</Button>}
            </Toolbar>
        </AppBar>
    )
}

