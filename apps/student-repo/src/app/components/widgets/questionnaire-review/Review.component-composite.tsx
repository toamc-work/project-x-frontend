import React, { FC } from 'react';
import { ReviewLayout } from './styles/layout/MainLayout.styled-component';
import { ReviewProps } from './interfaces/Review.interface';
import { KidsThemeProvider } from './styles/theme/theme';
 
 
interface ReviewCompoundProps extends React.FC<ReviewProps> {
  rawData?: React.FC<{data: string}>;
}
  
const Review: ReviewCompoundProps = ({children}) => {
  return (
    <KidsThemeProvider>
      <ReviewLayout>{children}</ReviewLayout>
    </KidsThemeProvider>
    
  );
}
// Review.rawData = ({data}) => {
//   return <ReviewLayout>{data}</ReviewLayout>;
// }
 
export { Review };