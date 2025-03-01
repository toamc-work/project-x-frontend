import { Box, styled } from '@mui/material';

export const ReviewLayout = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'grid',
  maxHeight: '900px',
  minHeight: '600px',
  gap: '.5rem',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridTemplateAreas: `
  ".     finish-ack          .                   ."
  ".     review-raw-data     review-raw-data     ."
  ".     review-raw-data     review-raw-data     ."
  ".     questions-layout     questions-layout     ."
  ".     questions-layout     questions-layout     ."
  ".     questions-layout     questions-layout     ."
  ".     questions-layout     questions-layout     back-to-home"
`,

  height: '100dvh',
}));
