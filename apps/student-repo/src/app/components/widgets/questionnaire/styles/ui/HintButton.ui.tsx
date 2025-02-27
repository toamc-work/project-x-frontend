import { Button, styled } from '@mui/material';

export const HintBtnUI = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$variant', // Prevents `$variant` from being passed to the DOM
})<{ $variant: 'enabled' | 'disabled' }>(({ theme, $variant }) => ({
  gridArea: 'hint',
  ...theme.typography.h2,
  borderRadius: '1rem',
  paddingLeft: '1em',
  paddingRight: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[2],
  maxWidth: '300px',
  minWidth: '150px',
  width: '100%',
  height: '70px',
  placeSelf: 'center',
  color:
    $variant === 'enabled'
      ? theme.palette.primary.main
      : theme.palette.grey[500],
  backgroundColor:
    $variant === 'enabled' ? 'transparent' : theme.palette.grey[300],
  cursor: $variant === 'enabled' ? 'pointer' : 'not-allowed',
}));
