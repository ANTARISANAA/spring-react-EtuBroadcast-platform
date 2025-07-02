import {
  type ErrorType,
  errorTypes,
  getErrorStatus,
  getErrorType,
  getFromMessages,
} from './utils';

interface ParsedHttpError {
  type: string;
  status?: number | null;
  cause?: { message?: string; description?: string } | null;
  retriable: boolean;
}

export function parseHttpError(error: ErrorType): ParsedHttpError {
  const errorType = getErrorType(error);
  const status = getErrorStatus(error);

  const errorResult: ParsedHttpError = {
    type: errorType,
    status,
    cause: null,
    retriable: true,
  };

  switch (errorType) {
    case errorTypes.apiError: {
      const extractedError = error?.response?.data || {};

      errorResult.retriable = extractedError.retriable || false;

      if (status === 403) {
        errorResult.cause = getFromMessages('forbidden');
      } else {
        errorResult.cause = getFromMessages(
          extractedError.code,
          extractedError.message
        );
      }

      break;
    }

    case errorTypes.networkError: {
      errorResult.cause = getFromMessages('networkError');
      break;
    }

    case errorTypes.notClassified:
    default: {
      errorResult.cause = getFromMessages('unknown');
      break;
    }
  }

  return errorResult;
}
