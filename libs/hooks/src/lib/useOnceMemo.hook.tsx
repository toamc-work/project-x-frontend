import { useMemo } from 'react';

export const useOnceMemo = <T,>(callback: () => T) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(callback, []);
};
