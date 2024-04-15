import { SxProps, useTheme } from "@mui/material";

export const breakpointColumnsObj = {
  default: 7,
  1100: 3,
  700: 2,
  500: 1
};


export const selectColourForTask = (status: string) => {
  switch (status) {
    case 'NEUTRAL': return ''
    case 'URGENT': return 'yellow'
    case 'IMPORTANT': return 'red'
  }
}


