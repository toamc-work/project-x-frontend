import { ensureMilliseconds } from './ensureMilliseconds';

export const utcToLocal = (timestamp?: number) => {
  const strUTC = new Date(
    timestamp ? ensureMilliseconds(timestamp) : Date.now()
  ).toISOString();
  return new Date(strUTC);
};
