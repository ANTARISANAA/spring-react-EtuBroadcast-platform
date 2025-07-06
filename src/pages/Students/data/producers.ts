import type { Producer } from 'async-states';
import { API } from '@/config/api';
import { API_PATHS } from '@/utils/apiPaths';
import type { ApiError } from '@/utils/types';
import type { Student, StudentFormData } from '../types';
import { mockStudents } from './mockData';

export const getStudentsProducer: Producer<
  { student: Student[] },
  [{ filters: Record<string, any> }],
  ApiError
> = async ({ args: [{ filters }] }) =>
  // await API.get(API_PATHS.students.base, { params: { filters } });
  await Promise.resolve({ student: mockStudents });

export const addStudentProducer: Producer<
  void,
  [StudentFormData],
  ApiError
> = async ({ args: [student] }) =>
  // await API.post(API_PATHS.students.base, student);
  console.log('student', student);

export const editStudentProducer: Producer<
  void,
  [StudentFormData],
  ApiError
> = async ({ args: [student] }) =>
  // await API.put(API_PATHS.students.update(student.id), student);
  console.log('student', student);

export const sendInvitationProducer: Producer<
  void,
  [{ studentId: string }],
  ApiError
> = async ({ args: [{ studentId }] }) =>
  await API.post(`${API_PATHS.students.sendInvitation(studentId)}`);
