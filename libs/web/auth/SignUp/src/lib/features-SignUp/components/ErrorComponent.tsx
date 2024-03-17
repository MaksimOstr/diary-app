import { useSignUpMutation } from '@diary-app/shared'
import { Typography } from '@mui/material'
import { IMutationError } from '../types/types'

interface ITest {
  error: any
}

export const ErrorComponent: React.FC<ITest> = ({ error }) => {
  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in error ? error.error : error.data.message

      return (
        <div>
          <Typography color='error' mb={3} variant='h6'>{errMsg}</Typography>
        </div>
      )
    } else {
      // you can access all properties of `SerializedError` here
      return <div>{error.message}</div>
    }
  }
  return null
}