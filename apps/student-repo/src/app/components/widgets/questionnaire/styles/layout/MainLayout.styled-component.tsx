import { Box, styled } from '@mui/material';

export const QuestionnaireLayout = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'grid',
  maxHeight: '900px',
  minHeight: '600px',
  gap: '.5rem',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridTemplateAreas: `
  "questionnaire-info  questionnaire-info   .                   discard-questionnaire"
  "question-number     question-title      question-title      timer"
  "question-difficulty question-title      question-title      stopwatch"
  ".                  possible-answers    possible-answers    ."
  "hint               possible-answers    possible-answers    skip-question"
  ".                  possible-answers    possible-answers    ."
  ".                  possible-answers    possible-answers    submit-question"
`,

  height: '100dvh',
}));
