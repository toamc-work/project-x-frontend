import React, { FC } from 'react';
import { QuestionnaireReviewWidget } from '../../widgets/questionnaire-review-old/QuestionnaireReview.component-widget';

type ReviewProps = unknown;

const Review: FC<ReviewProps> = (_props): React.JSX.Element => {
  return (
    <QuestionnaireReviewWidget.Body>
      <QuestionnaireReviewWidget.Stats
        data={{ answeredRight: 3, allQuestions: 8, averageTime: 40000 }}
      ></QuestionnaireReviewWidget.Stats>
      <QuestionnaireReviewWidget.QuestionsLayout
        data={[
          { questionID: '1', answeredRight: true },
          { questionID: '2', answeredRight: false },
          { questionID: '3', answeredRight: true },
          { questionID: '4', answeredRight: false },
          { questionID: '5', answeredRight: true },
          { questionID: '6', answeredRight: false },
          { questionID: '7', answeredRight: false },
          { questionID: '8', answeredRight: false },
        ]}
      ></QuestionnaireReviewWidget.QuestionsLayout>
    </QuestionnaireReviewWidget.Body>
  );
};

export default Review;
