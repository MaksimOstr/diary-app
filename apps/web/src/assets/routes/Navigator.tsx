import { useAppSelector } from '@diary-app/shared'
import { Box, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'


export function Navigator() {
  const { isAuth, user } = useAppSelector(state => state.auth)


  return (
    <Box>
      <Box>{user?.username}</Box>
      <Link to='SignUp'>to SingUp</Link>
      <Link to='SignIn'>to SingIn</Link>
    </Box>
  )
}


