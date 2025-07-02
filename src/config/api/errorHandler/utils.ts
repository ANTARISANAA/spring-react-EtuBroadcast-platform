import type { AxiosResponse } from 'axios';
import { httpErrors } from './httpErrors';

export interface ErrorType extends AxiosResponse {
  response?: {
    data?: {
      retriable?: boolean;
      code?: string;
      message?: string;
    };
    status: number;
  };
}

export const errorTypes = Object.freeze({
  apiError: 'ApiError',
  networkError: 'NetworkError',
  notClassified: 'NotClassified',
});

export const networkErrorKeywords = Object.freeze([
  'network error',
  'failed to fetch',
  'fetch error',
]);

export const httpStatusCodes = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
} as const;

export function getFromMessages(code: string = 'unknow', description?: string) {
  return {
    message: httpErrors[code] ?? httpErrors.unknown,
    description,
  };
}

export function isNetworkError(error: ErrorType) {
  if (error instanceof TypeError) {
    return true;
  }

  const errorLowerCaseStr = error?.toString()?.toLowerCase();
  if (!errorLowerCaseStr) {
    return false;
  }

  return networkErrorKeywords.some((t) => errorLowerCaseStr.indexOf(t) >= 0);
}

export function isApiError(error: ErrorType) {
  const data = error?.response?.data;

  if (!data) {
    return false;
  }

  return !!data.code;
}

export function getErrorType(error: ErrorType) {
  if (isNetworkError(error)) {
    return errorTypes.networkError;
  }

  if (isApiError(error)) {
    return errorTypes.apiError;
  }

  return errorTypes.notClassified;
}

export function getErrorStatus(error: ErrorType) {
  return error?.response?.status;
}
