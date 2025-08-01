import type { TablePaginationConfig } from 'antd';
import type { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import * as qs from 'qs';

export type TableOnChangeFn = (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult, // or  SorterResult[]
  extra: TableCurrentDataSource<unknown>,
) => void;

export const defaultPaging = {
  page: 0,
  size: 10,
  sort: '',
};

export function parseSearchParamsFromLocation(location: Location) {
  const search = location?.search.substring(1);
  return qs.parse(search);
}


export function getPaginationParams(paging: { page: number; size: number; sort: string }, ...args: Parameters<TableOnChangeFn>) {
      const [pagination, , sorter, { action }] = args;

      return {
        // Set the page number based on the action (sort or page change)
        page: action === 'sort' ? 0 : (pagination.current as number) - 1,
        // Set the number of items per page
        size: pagination.pageSize,
        sort: sorter.order
          ? `${sorter.columnKey},${sorter.order === 'ascend' ? 'asc' : 'desc'}` // Set the sorting column and order
          : paging.sort, // Use the default sorting if no sorter is provided
      }
};