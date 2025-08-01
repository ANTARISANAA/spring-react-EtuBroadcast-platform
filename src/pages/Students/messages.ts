const scope = 'pages.Students';

export const messages = Object.freeze({
  // Page titles
  students: `${scope}.students`,

  // Actions
  addStudent: `${scope}.addStudent`,
  editStudent: `${scope}.editStudent`,
  deleteStudent: `${scope}.deleteStudent`,
  viewStudent: `${scope}.viewStudent`,
  sendNofication: `${scope}.sendNofication`,

  // Form fields
  fullName: `${scope}.fullName`,
  email: `${scope}.email`,
  phoneNumber: `${scope}.phoneNumber`,
  address: `${scope}.address`,

  // Table columns
  actions: `${scope}.actions`,

  // Filters
  searchStudents: `${scope}.searchStudents`,
  clearFilters: `${scope}.clearFilters`,
  searchPlaceholder: `${scope}.searchPlaceholder`,
  searchByNamePlaceholder: `${scope}.searchByNamePlaceholder`,
  searchByEmailPlaceholder: `${scope}.searchByEmailPlaceholder`,
  searchByPhonePlaceholder: `${scope}.searchByPhonePlaceholder`,
  searchByAddressPlaceholder: `${scope}.searchByAddressPlaceholder`,

  // Messages
  noStudentsFound: `${scope}.noStudentsFound`,
  studentAddedSuccessfully: `${scope}.studentAddedSuccessfully`,
  studentUpdatedSuccessfully: `${scope}.studentUpdatedSuccessfully`,
  deleteStudentSuccess: `${scope}.deleteStudentSuccess`,
  errorLoadingStudents: `${scope}.errorLoadingStudents`,

  // Modal titles
  editStudentTitle: `${scope}.editStudentTitle`,
  viewStudentDetails: `${scope}.viewStudentDetails`,
  sendStudentNotification: `${scope}.sendStudentNotification`,

  // Send Notification
  resendInvitaion: `${scope}.resendInvitaion`,
  resendInvitationSuccess: `${scope}.resendInvitationSuccess`,
  resendInvitatonDescription: `${scope}.resendInvitatonDescription`,

  // Delete confirmation
  deleteStudentConfirmation: `${scope}.deleteStudentConfirmation`,
  deleteStudentWarning: `${scope}.deleteStudentWarning`,

  // Message field
  messageLabel: `${scope}.messageLabel`,
  messageRequired: `${scope}.messageRequired`,
  messageMaxLength: `${scope}.messageMaxLength`,
  messagePlaceholder: `${scope}.messagePlaceholder`,
});
