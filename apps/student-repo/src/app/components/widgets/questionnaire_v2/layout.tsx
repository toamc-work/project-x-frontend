import React from 'react';
import { Button, Paper, styled, Typography } from '@mui/material';
import { Palette } from '@mui/icons-material';

const BoxElement = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
}));

// const PossibleAnswersElement = styled(Paper)(({ theme }) => ({
//   display: 'grid',
//   gap: 1,
//   gridAutoRows: '40px',
//   gridTemplateColumns: 'repeat(2, 1fr)',
//   width: '1400px',
//   height: '80px',
//   mx: 'auto',
// }));

const DiscardElement = styled(Button)(({ theme }) => ({
  mx: 'auto',
  mt: 4,
  p: 3,
  border: `1px solid ${theme.palette.secondary.contrastText}`,
  borderRadius: '.3em',
  backgroundColor: theme.palette.secondary.main,
  height: '70px',
  maxHeight: '90%',
  minHeight: '50px',
  width: '80%',
  maxWidth: '300px',
  minWidth: '150px'
}));

const ButtonElement = styled(Button)(({ theme }) => ({
  mx: 'auto',
  mt: 4,
  p: 3,
  border: '1px solid rgb(0, 0, 0)',
  borderRadius: 2,
  backgroundColor: '#73C7C7',
  height: '70px',
  maxHeight: '90%',
  minHeight: '50px',
  width: '80%',
  maxWidth: '300px',
  minWidth: '150px',
  justifySelf: 'center',
  alignSelf: 'center',
  
}));

const TextElement = styled(Typography)(({ theme }) => ({
  borderRadius: 1,
  backgroundColor: '#578FCA',
}));

export const Main = styled(BoxElement)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '.5em',
  padding: '1rem',

  // Define rows with flexible heights
  gridTemplateRows: 'auto',

  // Define the grid areas for placement of components

  gridTemplateAreas: `
  "questionnaire-info questionnaire-info . discard-questionnaire"
  "question-number question-title question-title timer-up"
  "question-difficulty question-title question-title timer-down"
  ". possible-answers possible-answers ."
  "hint possible-answers possible-answers skip-question"
  ". possible-answers possible-answers ."
  ". possible-answers possible-answers submit-question"
  `,
  width: '50dvw',
  height: '100dvh',
  // maxWidth:'1200px',
}));

export const QuestionTitle = styled(TextElement)(({ theme }) => ({
  gridArea: 'question-title',
  variants: 'h2',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '3em',
  paddingLeft: '3rem',
  // backgroundColor: 'pink',
}));

export const QuestionNumber = styled(TextElement)(({ theme }) => ({
  gridArea: 'question-number',
  display: 'flex',
  variants: 'h4',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  // backgroundColor: 'purple',
}));

export const QuestionDifficulty = styled(TextElement)(({ theme }) => ({
  gridArea: 'question-difficulty',
  ...theme.typography.button,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  backgroundColor: theme.palette.primary.main,
}));

export const DiscardQuestionnaire = styled(DiscardElement)(({ theme }) => ({
  gridArea: 'discard-questionnaire',
  justifySelf: 'center',
  alignSelf: 'center',
  // backgroundColor: 'purple',
}));

export const QuestionnaireInfo = styled(TextElement)(({ theme }) => ({
  gridArea: 'questionnaire-info',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '2rem',
  paddingLeft: '2rem',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));


export const TimerUp = styled(BoxElement)(({ theme }) => ({
  gridArea: 'timer-up',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '2rem',
  paddingLeft: '2rem',
  // backgroundColor: 'green',
}));

export const TimerDown = styled(BoxElement)(({ theme }) => ({
  gridArea: 'timer-down',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '2rem',
  paddingLeft: '2rem',
  // backgroundColor: 'green',
}));

export const SkipQuestion = styled(ButtonElement)(({ theme }) => ({
  gridArea: 'skip-question',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFB4A2',
}));

export const SubmitQuestion = styled(ButtonElement)(({ theme }) => ({
  gridArea: 'submit-question',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: 'green',
}));

export const Hint = styled(ButtonElement)(({ theme }) => ({
  gridArea: 'hint',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: 'green',
}));

export const PossibleAnswers = styled(BoxElement)(({ theme }) => ({
  gridArea: 'possible-answers',
  height:'100%',
  width:'100%',
  display: 'grid',
  gap: '.2em',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  padding: '2em',
  // margin: '2rem',
  alignItems:'center',
  
}));

export const PossibleAnswer = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  height: '100%',
  padding:'1em',
  alignSelf:'center',
  ...theme.typography.body1,
  
}));
