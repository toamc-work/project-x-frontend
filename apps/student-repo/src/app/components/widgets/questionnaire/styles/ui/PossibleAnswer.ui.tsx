import { Button, styled } from '@mui/material';

export const PossibleAnswerUI = styled(Button)(({ theme }) => ({
  gridArea: 'question-title',
  ...theme.typography['h2'],
  borderRadius: '1rem',
  boxShadow: theme.shadows['2'],
  paddingLeft: '1em',
  paddingRight: '1em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '90px',
  minHeight: '30px',
  height: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));
