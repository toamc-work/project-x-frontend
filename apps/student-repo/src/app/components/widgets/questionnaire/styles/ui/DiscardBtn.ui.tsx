import { Button, styled } from '@mui/material';

export const DiscardBtnUI = styled(Button)(({ theme }) => ({
  gridArea: 'discard-questionnaire',
  ...theme.typography['h2'],
  borderRadius: '1rem',
  paddingLeft: '1em',
  paddingRight: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows['2'],
  maxWidth: '300px',
  minWidth: '150px',
  width: '100%',
  height: '70px',
  placeSelf: 'center',
  color: theme.palette.primary.main,
}));
