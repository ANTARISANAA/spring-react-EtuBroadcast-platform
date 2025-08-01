export const httpErrors: { [key: string]: string } = {
  // Generic errors
  unknown: 'http.error.unknown',
  networkError: 'http.error.networkError',
  
  // HTTP status code errors
  '400': 'http.error.bad.request',
  '401': 'http.error.unauthorized',
  '403': 'http.error.forbidden',
  '404': 'http.error.not.found',
  '409': 'http.error.conflict',
  '408': 'http.error.timeout',
  '429': 'http.error.tooManyRequests',
  '500': 'http.error.internalServerError',
  '503': 'http.error.serviceUnavailable',
  
  // Custom error codes
  'email.conflict': 'api.error.email.conflict',
  
  // Legacy mappings for backward compatibility
  'bad.request': 'http.error.bad.request',
  'not.found': 'http.error.not.found',
  forbidden: 'http.error.forbidden',
} as const;
