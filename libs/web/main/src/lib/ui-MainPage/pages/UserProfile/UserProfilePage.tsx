import { useFetchUserQuery } from '@diary-app/shared'
import { Dialog } from '@mui/material'
import React from 'react'
import HeadPaper from './components/HeadPaper/HeadPaper'
import { useNavigate } from 'react-router-dom'
import BodyPaper from './components/BodyPaper/BodyPaper'



export const UserProfilePage = () => {

    const navigate = useNavigate()
    const { data } = useFetchUserQuery()

    return (
            <Dialog
                onClose={() => navigate('/')}
                open
                PaperProps={{ sx: { padding: 2, borderRadius: 4 } }}
                fullWidth
            >
                <HeadPaper data={data} />
                <BodyPaper data={data} />
                <Dialog open>test</Dialog>
            </Dialog>
    )
}

