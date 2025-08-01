import {
  type ErrorType,
  errorTypes,
  getErrorStatus,
  getErrorType,
  getFromMessages,
} from './utils';
import { httpErrors } from './httpErrors';

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

      // First try to get error from HTTP status code
      if (status && httpErrors[status.toString()]) {
        errorResult.cause = getFromMessages(status.toString());
      } else if (extractedError.code && httpErrors[extractedError.code]) {
        // Fallback to error code from API response
        errorResult.cause = getFromMessages(
          extractedError.code,
          extractedError.message
        );
      } else {
        // Default to unknown error
        errorResult.cause = getFromMessages('unknown');
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
