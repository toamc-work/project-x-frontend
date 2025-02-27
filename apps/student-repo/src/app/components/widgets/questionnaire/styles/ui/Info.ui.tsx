import { styled } from '@mui/material';

export const InfoUI = styled('div')(({ theme }) => ({
  gridArea: 'questionnaire-info',
  ...theme.typography['h2'],
  borderRadius: '1rem',
  boxShadow: theme.shadows['1'],
  paddingLeft: '1em',
  paddingRight: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
