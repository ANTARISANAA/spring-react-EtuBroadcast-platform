// Application constants
export const APP_NAME = 'EduBroadcast';
export const APP_DESCRIPTION = 'Système de gestion et de notifications pour étudiants';
export const APP_VERSION = '1.0.0';

// Feature flags
export const FEATURES = {
  EMAIL_NOTIFICATIONS: true,
  SMS_NOTIFICATIONS: true,
  STUDENT_MANAGEMENT: true,
  EVENT_MANAGEMENT: true,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  STUDENTS: '/api/students',
  EVENTS: '/api/events',
  NOTIFICATIONS: '/api/notifications',
  AUTH: '/api/auth',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  LANGUAGE: 'language',
} as const;

// Default values
export const DEFAULTS = {
  PAGE_SIZE: 10,
  LANGUAGE: 'fr',
  THEME: 'light',
} as const; 

export const userMock = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: '123 Main St, Anytown, USA',
  city: 'Anytown',
  state: 'CA',
  zip: '12345',
  country: 'USA',
}
