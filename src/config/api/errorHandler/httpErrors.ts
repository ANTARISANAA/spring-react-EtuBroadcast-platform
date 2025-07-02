export const httpErrors: { [key: string]: string } = {
  unknown: 'http.error.unknown',
  networkError: 'http.error.networkError',
  forbidden: 'http.error.forbidden',
  'bad.request': 'http.error.bad.request',
  'not.found': 'http.error.not.found',
} as const;
