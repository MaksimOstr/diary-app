import { ITask, setTasks, useAppDispatch } from '@diary-app/shared'
import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import { ISearchTextFieldfProps } from '../../types'


const SearchTextField: React.FC<ISearchTextFieldfProps> = ({ tasks, isLoading }) => {

  const dispatch = useAppDispatch()
  const search = (value: string) => {
    if (tasks?.length === 0) return
    const filteredTasks = tasks?.filter((task: ITask) => {
      return task.title.toString().toLowerCase().includes(value.toLowerCase()) || task.description.toString().toLowerCase().includes(value.toLowerCase())
    })
    console.log(filteredTasks)
    dispatch(setTasks(filteredTasks))
  }
  return (
      isLoading ? '' : <TextField focused sx={{ width: '50%', ml: 5, mb: 2 }} autoComplete='off' color='secondary' variant='filled' placeholder='Search some tasks' size='small' onChange={(e) => search(e.target.value)} />
  )
}

export default SearchTextField


