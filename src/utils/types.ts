type ApiErrorCause = {
  message: string;
  description: string;
  code?: string;
};

export type ApiError = {
  type: string;
  status: number | null;
  cause: ApiErrorCause;
  retriable: boolean;
};
