import type { Student } from './types';

export const getStatusColor = (status: Student['status']) => {
  switch (status) {
    case 'active':
      return 'green';
    case 'inactive':
      return 'red';
    case 'graduated':
      return 'blue';
    default:
      return 'default';
  }
};

export const getGenderColor = (gender: Student['gender']) => {
  switch (gender) {
    case 'male':
      return 'blue';
    case 'female':
      return 'pink';
    default:
      return 'default';
  }
};
