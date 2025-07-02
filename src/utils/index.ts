import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export class UnreachableContextError extends Error {
  constructor(contextName: string) {
    super(`Unreachable Context: ${contextName}`);
  }
}

export const formatDate = (
  date: Dayjs | Date | string,
  format = 'DD-MM-YYYY HH:mm:ss'
) => {
  if (date) {
    return dayjs(date).format(format);
  }
};
