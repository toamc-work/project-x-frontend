import { styled } from '@mui/material';

export const StopWatchUI = styled('div')(({ theme }) => ({
  gridArea: 'stopwatch',
  ...theme.typography['h2'],
  color: theme.palette.secondary.light,
  borderRadius: '1rem',
  boxShadow: theme.shadows['1'],
  paddingLeft: '1em',
  paddingRight: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  minHeight: '50px',
  maxHeight: '100px',
}));
