import {Paper, styled, Typography} from "@mui/material";

export const QuestionnaireTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h1.fontSize,
}))

export const QuestionnaireBox = styled(({children}: { children: React.ReactNode }) => <Paper variant="circle">{children}</Paper>)(({ theme }) => ({
  variant: 'circle',
}))
