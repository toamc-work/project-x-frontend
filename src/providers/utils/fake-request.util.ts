import { delay as delayFn } from "./delay.util";

export const fakeRequest = async <T>(
  payload: T,
  delay: number = 500,
): Promise<ApiResponse<T>> => {
  await delayFn(delay);
  return {
    message: "success",
    data: payload,
  };
};
