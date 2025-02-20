export const ensureMilliseconds = (timestamp: number) => {
  return timestamp < 1e12 ? timestamp * 1000 : timestamp;
};
