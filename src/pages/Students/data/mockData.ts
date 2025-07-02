import type { Student } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    dateOfBirth: '1995-03-15',
    gender: 'male',
    status: 'active',
    enrollmentDate: '2023-09-01',
    grade: 'Senior',
    major: 'Computer Science',
    gpa: 3.8,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Mother',
      phone: '+1234567891',
    },
    createdAt: '2023-08-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567892',
    dateOfBirth: '1997-07-22',
    gender: 'female',
    status: 'active',
    enrollmentDate: '2023-09-01',
    grade: 'Junior',
    major: 'Engineering',
    gpa: 3.9,
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
    },
    emergencyContact: {
      name: 'Bob Smith',
      relationship: 'Father',
      phone: '+1234567893',
    },
    createdAt: '2023-08-20T09:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },
  {
    id: '3',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1234567894',
    dateOfBirth: '1996-11-08',
    gender: 'other',
    status: 'graduated',
    enrollmentDate: '2020-09-01',
    grade: 'Graduate',
    major: 'Business',
    gpa: 3.7,
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
    },
    emergencyContact: {
      name: 'Pat Johnson',
      relationship: 'Guardian',
      phone: '+1234567895',
    },
    createdAt: '2020-08-10T11:00:00Z',
    updatedAt: '2023-12-15T13:20:00Z',
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1234567896',
    dateOfBirth: '1998-05-12',
    gender: 'female',
    status: 'active',
    enrollmentDate: '2023-09-01',
    grade: 'Sophomore',
    major: 'Arts',
    gpa: 3.6,
    address: {
      street: '321 Elm St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101',
      country: 'USA',
    },
    emergencyContact: {
      name: 'Mike Wilson',
      relationship: 'Father',
      phone: '+1234567897',
    },
    createdAt: '2023-08-25T14:00:00Z',
    updatedAt: '2024-01-15T10:20:00Z',
  },
  {
    id: '5',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    phone: '+1234567898',
    dateOfBirth: '1994-12-03',
    gender: 'male',
    status: 'inactive',
    enrollmentDate: '2022-09-01',
    grade: 'Senior',
    major: 'Sciences',
    gpa: 2.8,
    address: {
      street: '654 Maple Ave',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
    emergencyContact: {
      name: 'Lisa Brown',
      relationship: 'Mother',
      phone: '+1234567899',
    },
    createdAt: '2022-08-15T08:30:00Z',
    updatedAt: '2023-11-10T16:45:00Z',
  },
];

export const mockStudentService = {
  getStudents: async (): Promise<Student[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockStudents;
  },

  addStudent: async (
    student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Student> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockStudents.push(newStudent);
    return newStudent;
  },

  updateStudent: async (
    id: string,
    updates: Partial<Student>
  ): Promise<Student> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockStudents.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error('Student not found');
    }
    const updatedStudent = {
      ...mockStudents[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    mockStudents[index] = updatedStudent;
    return updatedStudent;
  },

  deleteStudent: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockStudents.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error('Student not found');
    }
    mockStudents.splice(index, 1);
  },
};
