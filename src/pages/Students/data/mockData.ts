import type { Student } from '../types';

export const mockStudents: Student[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    address: '123 Main St, New York, NY 10001, USA',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '+1234567892',
    address: '456 Oak Ave, Los Angeles, CA 90210, USA',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phoneNumber: '+1234567894',
    address: '789 Pine St, Chicago, IL 60601, USA',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phoneNumber: '+1234567896',
    address: '321 Elm St, Boston, MA 02101, USA',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    fullName: 'Michael Brown',
    email: 'michael.brown@example.com',
    phoneNumber: '+1234567898',
    address: '654 Maple Ave, Seattle, WA 98101, USA',
  },
];

export const mockStudentService = {
  getStudents: async (): Promise<Student[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockStudents;
  },

  addStudent: async (student: Omit<Student, 'id'>): Promise<Student> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newStudent: Student = {
      ...student,
      id: crypto.randomUUID(),
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
