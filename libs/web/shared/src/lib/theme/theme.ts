import { alpha, createTheme, getContrastRatio } from "@mui/material/styles";


export const theme = createTheme({
    palette: {
        primary: {
            main: '#4a4b4e',
            light: '#C5C6C7',
            dark: '#0B0C10',
            contrastText: '#00d4ae'
        },
        secondary: {
            main: '#00d4ae',
            light: '#a8eddc',
            dark: '#00895f',
            contrastText: '#0B0C10'
        },
        background: {
            default: '#0B0C10',
            paper: '#3e4651'
        },
        text: {
            primary: '#ffffff',
            secondary: '#C5C6C7'
        },
    },
    typography: {
        fontFamily: [
            "Roboto",
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