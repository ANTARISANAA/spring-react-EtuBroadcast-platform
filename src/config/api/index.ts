import axios from 'axios';
import { parseHttpError } from './errorHandler';
import type { ErrorType } from './errorHandler/utils';

export const BASE_URL = import.meta.env.VITE_APP_API_URL;

if (BASE_URL === undefined || BASE_URL === null) {
  throw new Error(`Missing ${BASE_URL}.`);
}

export const API = axios.create({
  baseURL: BASE_URL,
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
