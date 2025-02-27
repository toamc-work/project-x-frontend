import { styled } from '@mui/material';

export const QuestionDifficultyUI = styled('div')(({ theme }) => ({
  gridArea: 'question-difficulty',
  borderRadius: '1rem',
  boxShadow: theme.shadows['1'],
  paddingLeft: '1em',
  paddingRight: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  ...theme.typography['h2'],
  color: theme.palette.primary.main,
}));
