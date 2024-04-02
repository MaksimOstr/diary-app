import { alpha, createTheme, getContrastRatio } from "@mui/material";

const violetBase = '#32013D';
const violetMain = alpha(violetBase, 0.7);

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2e0050',
            light: '#573373',
            dark: '#200038',
            contrastText: '#b39ddb'
        },
        secondary: {
            main: '#7b1fa2',
            light: '#954bb4',
            dark: '#561571',
            contrastText: '#EDE7F6'
        },
        background: {
            default: '#2e0050',
            paper: '#d1c4e9'
        }
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