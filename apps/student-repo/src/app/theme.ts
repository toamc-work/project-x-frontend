import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

export const muiTheme = createTheme({
  components: {

    MuiPaper: {
      variants: [
        {
          props: { variant: 'circle' },
          style: {
            borderRadius: '50%',
            boxShadow:'black 1px 1px 1px 1px'
          }
        }
      ]
    }
  },
  palette: {
    primary: {
      main: blue.A200, // Blue
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontSize: '2rem', fontWeight: 700 },
    h2: { fontSize: '1.75rem', fontWeight: 700 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.875em', fontWeight: 400 },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none', // Elevation 0
    '0px 1px 3px rgba(0, 0, 0, 0.12)', // Elevation 1
    '0px 1px 5px rgba(0, 0, 0, 0.14)', // Elevation 2
    '0px 1px 8px rgba(0, 0, 0, 0.20)', // Elevation 3
    '0px 2px 4px rgba(0, 0, 0, 0.18)', // Elevation 4
    '0px 3px 5px rgba(0, 0, 0, 0.15)', // Elevation 5
    '0px 4px 6px rgba(0, 0, 0, 0.12)', // Elevation 6
    '0px 5px 7px rgba(0, 0, 0, 0.10)', // Elevation 7
    '0px 6px 8px rgba(0, 0, 0, 0.08)', // Elevation 8
    '0px 7px 9px rgba(0, 0, 0, 0.06)', // Elevation 9
    '0px 8px 10px rgba(0, 0, 0, 0.05)', // Elevation 10
    '0px 9px 11px rgba(0, 0, 0, 0.04)', // Elevation 11
    '0px 10px 12px rgba(0, 0, 0, 0.03)', // Elevation 12
    '0px 11px 13px rgba(0, 0, 0, 0.02)', // Elevation 13
    '0px 12px 14px rgba(0, 0, 0, 0.01)', // Elevation 14
    '0px 13px 15px rgba(0, 0, 0, 0.015)', // Elevation 15
    '0px 14px 16px rgba(0, 0, 0, 0.02)', // Elevation 16
    '0px 15px 17px rgba(0, 0, 0, 0.03)', // Elevation 17
    '0px 16px 18px rgba(0, 0, 0, 0.04)', // Elevation 18
    '0px 17px 19px rgba(0, 0, 0, 0.05)', // Elevation 19
    '0px 18px 20px rgba(0, 0, 0, 0.06)', // Elevation 20
    '0px 19px 21px rgba(0, 0, 0, 0.07)', // Elevation 21
    '0px 20px 22px rgba(0, 0, 0, 0.08)', // Elevation 22
    '0px 21px 23px rgba(0, 0, 0, 0.09)', // Elevation 23
    '0px 22px 24px rgba(0, 0, 0, 0.10)', // Elevation 24
  ],
});

// Extend styled-components DefaultTheme
export type AppTheme = typeof muiTheme;

declare module 'styled-components' {
  export type DefaultThem = AppTheme;
}

declare module '@mui/material/Paper' {
  export interface PaperPropsVariantOverrides {
    circle: true;
  }
}