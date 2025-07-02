const scope = 'pages.Students';

export const messages = Object.freeze({
  // Page titles
  students: `${scope}.students`,
  student: `${scope}.student`,
  studentList: `${scope}.studentList`,
  studentDetails: `${scope}.studentDetails`,

  // Actions
  addStudent: `${scope}.addStudent`,
  editStudent: `${scope}.editStudent`,
  deleteStudent: `${scope}.deleteStudent`,
  viewStudent: `${scope}.viewStudent`,
  exportStudents: `${scope}.exportStudents`,
  importStudents: `${scope}.importStudents`,

  // Form fields
  firstName: `${scope}.firstName`,
  lastName: `${scope}.lastName`,
  email: `${scope}.email`,
  phone: `${scope}.phone`,
  dateOfBirth: `${scope}.dateOfBirth`,
  gender: `${scope}.gender`,
  status: `${scope}.status`,
  enrollmentDate: `${scope}.enrollmentDate`,
  grade: `${scope}.grade`,
  major: `${scope}.major`,
  gpa: `${scope}.gpa`,
  address: `${scope}.address`,
  emergencyContact: `${scope}.emergencyContact`,

  // Gender options
  male: `${scope}.male`,
  female: `${scope}.female`,
  other: `${scope}.other`,

  // Status options
  active: `${scope}.active`,
  inactive: `${scope}.inactive`,
  graduated: `${scope}.graduated`,

  // Filters
  searchStudents: `${scope}.searchStudents`,
  filterByStatus: `${scope}.filterByStatus`,
  filterByGender: `${scope}.filterByGender`,
  filterByGrade: `${scope}.filterByGrade`,
  filterByMajor: `${scope}.filterByMajor`,
  filterByEnrollmentDate: `${scope}.filterByEnrollmentDate`,
  filterByGPA: `${scope}.filterByGPA`,
  clearFilters: `${scope}.clearFilters`,

  // Table columns
  name: `${scope}.name`,
  contact: `${scope}.contact`,
  academicInfo: `${scope}.academicInfo`,
  actions: `${scope}.actions`,

  // Messages
  noStudentsFound: `${scope}.noStudentsFound`,
  deleteConfirmation: `${scope}.deleteConfirmation`,
  studentDeletedSuccessfully: `${scope}.studentDeletedSuccessfully`,
  studentAddedSuccessfully: `${scope}.studentAddedSuccessfully`,
  studentUpdatedSuccessfully: `${scope}.studentUpdatedSuccessfully`,
  errorLoadingStudents: `${scope}.errorLoadingStudents`,
  errorDeletingStudent: `${scope}.errorDeletingStudent`,
  errorSavingStudent: `${scope}.errorSavingStudent`,

  // Validation messages
  firstNameRequired: `${scope}.firstNameRequired`,
  lastNameRequired: `${scope}.lastNameRequired`,
  emailRequired: `${scope}.emailRequired`,
  emailInvalid: `${scope}.emailInvalid`,
  phoneInvalid: `${scope}.phoneInvalid`,
  dateOfBirthRequired: `${scope}.dateOfBirthRequired`,
  genderRequired: `${scope}.genderRequired`,
  statusRequired: `${scope}.statusRequired`,
  gradeRequired: `${scope}.gradeRequired`,
  majorRequired: `${scope}.majorRequired`,
  gpaRequired: `${scope}.gpaRequired`,
  gpaInvalid: `${scope}.gpaInvalid`,
});
