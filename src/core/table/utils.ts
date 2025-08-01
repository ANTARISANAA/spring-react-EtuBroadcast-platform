import * as qs from 'qs';

export const stringifySearchParams = (
  params: URLSearchParams | { [key: string]: string | string[] | number },
  arrayFormat: 'indices' | 'brackets' | 'repeat' | 'comma' = 'indices',
) => {
  return qs.stringify(params, {
    skipNulls: true,
    arrayFormat,
  });
};

export function parseSearch(search: string) {
  const decoder = (str: string, defaultDecoder: (str: string) => string) => {
    if (str === 'true' || str === 'false') return str === 'true';
    if (str === '') return defaultDecoder(str);
    const isNumber = !isNaN(+str) && (str.length > 1 ? str[0] !== '0' : true);
    return isNumber ? +str : defaultDecoder(str);
  };

  return qs.parse(search, { decoder });
}

export const defaultPagination = {
  defaultPageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: [5, 10, 20, 50, 100],
  defaultDateSorter: 'createdAt,desc',
};

export const defaultPageParams = {
  size: defaultPagination.defaultPageSize,
  page: 0,
  sort: defaultPagination.defaultDateSorter,
};
