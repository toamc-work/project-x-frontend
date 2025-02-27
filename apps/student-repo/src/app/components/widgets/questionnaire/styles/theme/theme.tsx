import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { purple, pink, blue, cyan, red } from '@mui/material/colors';
import { Button, Paper, Typography, Box } from '@mui/material';
import React from 'react';

// Create the kids' theme
const kidsTheme = createTheme({
  palette: {
    primary: {
      main: purple[300],
    },
    secondary: {
      main: pink[300],
    },
    background: {
      default: 'white',
    },
    action: {
      active: cyan[300],
    },
    error: {
      main: red[300],
    },
  },
  typography: {
    fontFamily: 'Comic Sans MS, sans-serif',
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: purple[800],
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: pink[800],
    },
    body1: {
      fontSize: '1rem',
      color: blue[800],
    },
  },
});

export const KidsThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <ThemeProvider theme={kidsTheme}>{children}</ThemeProvider>;
};
