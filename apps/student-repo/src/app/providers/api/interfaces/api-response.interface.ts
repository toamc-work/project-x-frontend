declare global {
  interface ApiSuccessResponse<Data = undefined> {
    message: 'success';
    data: Data;
  }

  type ApiResponse<Data = undefined> = ApiSuccessResponse<Data>;
}

export {};
