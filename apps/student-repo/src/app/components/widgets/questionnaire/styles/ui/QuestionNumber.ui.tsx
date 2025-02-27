import { styled } from '@mui/material';

export const QuestionNumberUI = styled('div')(({ theme }) => ({
  gridArea: 'question-number',
  ...theme.typography['h2'],
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  padding: '1em',
  justifyContent: 'center',
  boxShadow: theme.shadows['2'],
  minWidth: 'fit-content',
  width: '80px',
  height: '80px',
  minHeight: 'fit-content',
  placeSelf: 'center',
  color: theme.palette.primary.dark,
}));
