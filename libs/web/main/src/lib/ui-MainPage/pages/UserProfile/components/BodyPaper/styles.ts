import { SxProps } from "@mui/material";

export const PaperSxProps = {
    mt: 1,
    display: 'flex',
    borderRadius: 4,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 0'
} as SxProps

export const UsernameSxProps = {
    width: '100%',
    cursor: 'pointer',
    p: '10px 30px',
    ":hover": {
        transition: '0.4s',
        background: '#30363e'
    }
} as SxProps