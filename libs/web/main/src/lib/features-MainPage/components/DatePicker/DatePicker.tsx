import React from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useTheme } from '@mui/material';

function DatePicker() {

    const theme = useTheme()

    return (
        <DesktopDatePicker
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