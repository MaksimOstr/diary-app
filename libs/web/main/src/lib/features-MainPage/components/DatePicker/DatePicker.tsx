import React from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useTheme } from '@mui/material';
import { ISearchTextFieldfProps } from '../../types';
import { ITask, setTasks, useAppDispatch } from '@diary-app/shared';
import { parseISO, format } from 'date-fns';

function DatePicker({ tasks, isLoading }: ISearchTextFieldfProps) {

    const theme = useTheme()
    const dispatch = useAppDispatch()

    

    const searchByDate = (value: Date | undefined) => {
        if(!value) return
        const valueDate = format(value, 'dd/MM/yyyy')
        const searchRes = tasks?.filter((task: ITask) => {
            const taskDate = format(parseISO(task.createdAt), 'dd/MM/yyyy')
            return taskDate === valueDate
        })
       dispatch(setTasks(searchRes))
    }


    return (
       isLoading ? '' :
       <DesktopDatePicker
       onChange={(e) => searchByDate(e?.toDate())}
       slotProps={{
           openPickerButton: { sx: { color: theme.palette.secondary.main, position: 'absolute', right: 5 } },
           textField: {
               variant: 'filled',
               focused: true,
               color: 'secondary',
               sx: { mb: 3, ml: 5, color: 'red' }
           }
       }}
   />
    )
}

export default DatePicker