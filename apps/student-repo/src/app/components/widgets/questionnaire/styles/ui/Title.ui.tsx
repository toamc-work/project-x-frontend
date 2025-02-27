import { styled } from '@mui/material';

export const TitleUI = styled('div')(({ theme }) => ({
  gridArea: 'question-title',
  ...theme.typography['h2'],
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
