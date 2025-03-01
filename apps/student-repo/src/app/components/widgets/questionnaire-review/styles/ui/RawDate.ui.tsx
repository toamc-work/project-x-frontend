import { styled } from '@mui/material';

export const RawDataUI = styled('div')(({ theme }) => ({
  gridArea: 'raw-data',
  ...theme.typography['h3'],
  borderRadius: '1rem',
  boxShadow: theme.shadows['2'],
  paddingLeft: '1em',
  paddingRight: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '.5',
  ':hover': {
    boxShadow: theme.shadows['4'],
  },
}));
