import { Paper } from '@mui/material';
import React, { FC } from 'react';
 
 
type QuestionnaireReviewAnsweredQuestionsProps = {
  data: {
    questionID: string;
    answeredRight: boolean;
  }[];
}
  
export const QuestionnaireReviewAnsweredQuestions: FC<QuestionnaireReviewAnsweredQuestionsProps> = (data): React.JSX.Element => {

  const questions = data.data.map((question) => {
    return (
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          color: question.answeredRight ? 'green' : 'red',
          justifyContent: 'space-evenly',
          width: '40px',
          height: '40px',
          mx: 'auto',
        }}
        key={question.questionID}>
        {question.questionID}
      </Paper>
    );
  });
  return <Paper
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      mx: 'auto',
    }}>
    {questions}
  </Paper>
}
