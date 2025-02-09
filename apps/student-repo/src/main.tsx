/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { muiTheme } from './app/theme';
import './index.css';
import App from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={muiTheme}>
        <CssBaseline />
        <App />
      </StyledThemeProvider>
    </MuiThemeProvider>
  </StrictMode>
);
