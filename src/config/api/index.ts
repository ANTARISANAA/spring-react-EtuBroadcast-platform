import axios from 'axios';
import { parseHttpError } from './errorHandler';
import type { ErrorType } from './errorHandler/utils';

export const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8077';
export const NOTIFICATION_URL = import.meta.env.VITE_APP_NOTIFICATION_URL || 'http://localhost:8076';

if (BASE_URL === undefined || BASE_URL === null) {
  throw new Error(`Missing VITE_APP_API_URL.`);
}

export const API = axios.create({
  baseURL: BASE_URL,
});

export const NOTIFICATION_API = axios.create({
  baseURL: NOTIFICATION_URL,
});

const responseMiddleware = async (error: ErrorType) => {
  const parsedError = parseHttpError(error);

  return Promise.reject(parsedError);
};

API.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },

  (error) => Promise.reject(error instanceof Error ? error : new Error(error))
);

API.interceptors.response.use((response) => response.data, responseMiddleware);

// Apply same interceptors to notification API
NOTIFICATION_API.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },

  (error) => Promise.reject(error instanceof Error ? error : new Error(error))
);

NOTIFICATION_API.interceptors.response.use((response) => response.data, responseMiddleware);
