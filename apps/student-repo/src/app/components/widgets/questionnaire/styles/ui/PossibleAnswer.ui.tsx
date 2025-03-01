import { Button, styled } from '@mui/material';

export const PossibleAnswerUI = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$variant', // Prevents `$variant` from being passed to the DOM
})<{ $variant: 'enabled' | 'disabled' }>(({ theme, $variant }) => ({
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
  backgroundColor: $variant === 'enabled' ? theme.palette.primary.main : theme.palette.grey[300],
  color: theme.palette.primary.contrastText,
}));
