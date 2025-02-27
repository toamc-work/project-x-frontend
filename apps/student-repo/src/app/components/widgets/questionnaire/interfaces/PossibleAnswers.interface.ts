export interface PossibleAnswersProps {
  render: {
    data: [string, string, string, string] | [];
    mapper: (
      HOC: React.ComponentType<{ onClick: (answerID: string) => void }>,
      index: number
    ) => React.JSX.Element;
  };
}
