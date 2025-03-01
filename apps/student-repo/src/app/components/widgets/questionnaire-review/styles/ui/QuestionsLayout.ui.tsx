import { styled } from '@mui/material';

export const QuestionsLayoutUI = styled('div')(({ theme }) => ({
  gridArea: 'questions-layout',
  ...theme.typography['h3'],
  borderRadius: '1rem',
  boxShadow: theme.shadows['2'],
  paddingLeft: '1em',
  paddingRight: '1em',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '.5',
  ':hover': {
    boxShadow: theme.shadows['4'],
  },
}));
