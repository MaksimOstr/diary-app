import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        background: {
            default: '#130017'
        },
    },
    typography: {
        fontFamily: [
            "Changa",
            "sans-serif"
        ].join(',')
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1600,
        },
    },
})