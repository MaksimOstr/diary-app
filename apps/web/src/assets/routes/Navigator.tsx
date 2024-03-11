import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Navigator() {
  return (
    <Box>
        <Link to='SignUp'>to SingUp</Link>
        <Link to='SignIn'>to SingIn</Link>
    </Box>
  )
}

export default Navigator
    