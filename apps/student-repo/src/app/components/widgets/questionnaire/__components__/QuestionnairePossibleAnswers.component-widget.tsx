import React, { FC } from 'react';
import { Paper, Typography } from '@mui/material';


type QuestionnairePossibleAnswersProps = {
  render: {
    data: [string, string, string, string] | [];
    mapper: (
      HOC: React.ComponentType<{ onClick: (answerID: string) => void }>
    ) => React.JSX.Element;
  };
};


export const QuestionnairePossibleAnswers: FC<
  QuestionnairePossibleAnswersProps
> = ({ render }): React.JSX.Element => {
  if (render.data.length === 0) return <h1>loading</h1>;

  return (
    <Paper
      sx={{
        display: 'grid',
        gap: 1,
        gridAutoRows: '40px',
        gridTemplateColumns: 'repeat(2, 1fr)',
        width: '1400px',
        height: '80px',
        mx: 'auto',
      }}
    >
      {render.data.map((possibleAnswerContent, index) => {
        
        return render.mapper(({ onClick }) => (
          <div onClick={() => onClick(possibleAnswerContent)}>
            <PossibleAnswer key={`${index}-${possibleAnswerContent}`} answerContent={possibleAnswerContent} />
          </div>
        ));
      })}
    </Paper>
  );
};

type PossibleAnswerProps = { answerContent: string };

const PossibleAnswer: FC<PossibleAnswerProps> = ({ answerContent }) => (
  <Typography textAlign="center" variant="h5">
    {answerContent}
  </Typography>
);
