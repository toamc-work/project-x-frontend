//import { useOnMount } from '@shared-hooks';
import React, { FC, useState } from 'react';
import { IQuestionnaireData } from '../../providers/api/questionnaire/response/questionnaire.response';
//import questionnaireService from '../../providers/api/questionnaire/questionnaire.service';
//import { Field, Form, Formik } from 'formik';
import { Paper, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


type QuestionnaireLevelProps = unknown

const initialValues: IQuestionnaireData = {
  levelDifficulty: 'Beginner',
  possibleAnswers: ['paris', 'london', 'beirut', 'jerusalem'],
  questionId: '0',
  text: 'what is the capital of France?',
  subTopic: 'Capitals',
};
  
const QuestionnaireLevel: FC<QuestionnaireLevelProps> = (_props): React.JSX.Element => {
  const [question] = useState<typeof initialValues>(initialValues);
  const [questionNum, setQuestionNum] = useState<number>();
  
  // useOnMount(() => {
  //   const startQuiz = async () => {
  //     const response = await questionnaireService.getQuestionnaire();
  //     setQuestion({
  //       { levelDifficulty, possibleAnswer, questionId, text, subTopic }: response.data
  //     }),
  //   };

  //   startQuiz();
  // });


  const handleClose = () => {
    console.log("close")
  };

  const handleSend = (answer:string) => {
    console.log("submitted", answer)
  };
  setQuestionNum(question.questionId)

  return (
    <Paper
      sx={{
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
      }}
    >
      <Paper>
        
        <Paper
        sx={{
          justifyContent:'left',
          maxWidth: 400,
          mx: 'auto',
          mt: 4,
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
        }}
      >
        Question Numero {questionNum}
      </Paper>
      <Paper
        sx={{
          justifyContent:'left',
          maxWidth: 400,
          mx: 'auto',
          mt: 20,
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
        }}
      >
        Question Difficulty {question.levelDifficulty}
      </Paper>
      <Paper
        sx={{
          justifyContent:'center',
          maxWidth: 400,
          mx: 'auto',
          mt: 4,
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
        }}
      >
        {question.subTopic} questions: {question.text}
      </Paper>

      <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
      </IconButton>
      </Paper>
      <Paper>
        <Button
          onClick={() => handleSend(question.possibleAnswers[0])}
          type='button'
          variant='contained'
          color='primary'
        >
          {question.possibleAnswers[0]}
        </Button>
        <Button
          onClick={() => handleSend(question.possibleAnswers[1])}
          type='button'
          variant='contained'
          color='primary'
        >
          {question.possibleAnswers[1]}
        </Button>
        <Button
          onClick={() => handleSend(question.possibleAnswers[2])}
          type='button'
          variant='contained'
          color='primary'
        >
          {question.possibleAnswers[2]}
        </Button>
        <Button
          onClick={() => handleSend(question.possibleAnswers[3])}
          type='button'
          variant='contained'
          color='primary'
        >
          {question.possibleAnswers[3]}
        </Button>
      </Paper>
    </Paper>
  );
}
 
export default QuestionnaireLevel;