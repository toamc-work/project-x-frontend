import { delay } from './delay.util';

export const fakeRequest = async <T>(payload: T, ms = 500): Promise<T> => {
  await delay(ms);
  return payload;
};
