import { useMemo } from "react";

export const useOnceMemo = <T extends unknown>(callback: () => T) => {
  return useMemo(callback, []);
};
