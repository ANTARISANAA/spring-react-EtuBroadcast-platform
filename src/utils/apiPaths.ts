export const API_PATHS = {
  students: {
    base: '/v1/admin/students',
    update: (id?: string) => `/v1/admin/students/${id}`,
    sendInvitation: (id?: string) => `/v1/admin/students/student-notify/${id}`,
  },
};
