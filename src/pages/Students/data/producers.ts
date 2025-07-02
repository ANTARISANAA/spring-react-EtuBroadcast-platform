import type { Producer } from 'async-states';
import { API } from '@/config/api';
import { API_PATHS } from '@/utils/apiPaths';
import type { ApiError } from '@/utils/types';
import type { Student } from '../types';

export const getStudentsProducer: Producer<
  { student: Student[] },
  [{ filters: Record<string, any> }],
  ApiError
> = async ({ args: [{ filters }] }) =>
  await API.get(API_PATHS.students.base, { params: { filters } });
