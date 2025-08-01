export const API_PATHS = {
  auth: {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
  },
  students: {
    base: '/api/v1/students',
    update: (id?: string) => `/api/v1/students/${id}`,
    delete: (id?: string) => `/api/v1/students/${id}`,
  },
  notifications: {
    base: '/api/v1/notifications',
  },
};
