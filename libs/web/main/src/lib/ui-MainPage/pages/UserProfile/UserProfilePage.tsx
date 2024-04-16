import { useFetchUserQuery } from '@diary-app/shared'
import { Box, Dialog } from '@mui/material'
import React from 'react'
import HeadPaper from './components/HeadPaper/HeadPaper'
import { Outlet, useNavigate } from 'react-router-dom'
import BodyPaper from './components/BodyPaper/BodyPaper'
import { ChangeUsernameForm } from './components/ChangeUsernameForm/ChangeUsernameForm'



export const UserProfilePage = () => {

    const navigate = useNavigate()
    const { data, isLoading } = useFetchUserQuery()

    return (
        <Dialog
            onClose={() => navigate('/')}
            open
            PaperProps={{ sx: { padding: 2, borderRadius: 4, position: 'relative' } }}
            fullWidth
        >
            <HeadPaper data={data} />
            <BodyPaper data={data} />
            <Outlet />
        </Dialog>
    )
}

