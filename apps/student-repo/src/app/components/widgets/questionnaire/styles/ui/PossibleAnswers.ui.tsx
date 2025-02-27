import { styled } from '@mui/material';

export const PossibleAnswersUI = styled('div')(({ theme }) => ({
  gridArea: 'possible-answers',
  borderRadius: '1rem',
  boxShadow: theme.shadows['0'],
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
}));
