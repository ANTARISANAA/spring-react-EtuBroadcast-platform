import type { Producer } from 'async-states';
import { API, NOTIFICATION_API } from '@/config/api';
import { API_PATHS } from '@/utils/apiPaths';
import type { ApiError } from '@/utils/types';
import type { Student, StudentFormData } from '../types';

export const getStudentsProducer: Producer<
  Student[],
 [Record<string, any>],
  ApiError
> = async ({ payload: { params }   }) => 

  await API.get(API_PATHS.students.base, { 
    params
  });

export const addStudentProducer: Producer<
  Student,
  [StudentFormData],
  ApiError
> = async ({ args: [student] }) =>
  await API.post(API_PATHS.students.base, student);

export const editStudentProducer: Producer<
  Student,
  [StudentFormData],
  ApiError
> = async ({ args: [{id, ...student}] }) =>
  await API.put(API_PATHS.students.update(id), student);

export const deleteStudentProducer: Producer<
  void,
  [string],
  ApiError
> = async ({ args: [studentId] }) =>
  await API.delete(API_PATHS.students.delete(studentId));

export const sendNotificationProducer: Producer<
  void,
  [{ studentId: string; message: string; type: string }],
  ApiError
> = async ({ args: [{ studentId, message, type }] }) =>
  await NOTIFICATION_API.post(API_PATHS.notifications.base, {
    studentId,
    message,
    type,
  });
