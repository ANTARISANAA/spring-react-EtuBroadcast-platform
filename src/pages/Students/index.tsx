import { Button, Card, Space, Spin, Table, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createSource, useAsyncState } from 'react-async-states';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type {  TablePaginationConfig } from 'antd/es/table';
import BaseErrorAlert from '@/core/components/Errors/BaseErrorAlert';
import { globalMessages } from '@/core/components/messages/common';
import { useModal } from '@/core/components/modals';
import { useStudentColumns } from './components/columns';
import { StudentFilters } from './components/filterFields';
import { getStudentsProducer } from './data/producers';
import { AddStudentModal } from './features/AddStudent';
import { messages } from './messages';
import { parseSearchParamsFromLocation } from './utils';
import { pagingKeys } from './types';
import _omit from 'lodash/omit';
import { parseSearch } from '@/core/table/utils';

const { Title } = Typography;
export const DEFAULT_SEARCH_PARAMS = {
  page: '0',
  size: '10',
  sort: 'fullName,asc',
};

export const studentsListResource = createSource(
  'students-list',
  getStudentsProducer,
);

export default function StudentsPage() {
  const { t } = useTranslation();
  const modal = useModal();
  const [searchParams, setSearchParams] = useSearchParams();

 const pageSearchParams = useMemo(
    () => parseSearch(searchParams.toString()),
    [searchParams],
  );
  // Parse current search parameters
  const parsedSearch = useMemo(
    () => ({
      ...DEFAULT_SEARCH_PARAMS,
      ...parseSearchParamsFromLocation(location),
    }),
    [location],
  );

  // Create paging object for table
  const paging = useMemo(
    () => ({
      current: parseInt(parsedSearch.page) + 1, // Ant Design uses 1-based indexing
      pageSize: parseInt(parsedSearch.size),
      sort: parsedSearch.sort,
    }),
    [parsedSearch],
  );

  // Pagination change handler
  const setPagingParams = useCallback(
    (pagination: TablePaginationConfig, _filters: any, sorter: any, extra: any) => {
      const { action } = extra;
      
      // Handle sorter (can be array or single object)
      const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter;
      
      setSearchParams({
        // Set the page number based on the action (sort or page change)
        page: action === 'sort' ? '0' : String((pagination.current as number) - 1),
        // Set the number of items per page
        size: String(pagination.pageSize),
        sort: currentSorter?.order
          ? `${currentSorter.columnKey},${currentSorter.order === 'ascend' ? 'asc' : 'desc'}` // Set the sorting column and order
          : paging.sort, // Use the default sorting if no sorter is provided
      });
    },
    [paging.sort, setSearchParams],
  );

  const resetFilterParams = useCallback(() => {
    const params = Object.keys(searchParams).reduce(
      (acc, key) => ({ ...acc, [key]: null }),
      {},
    );

    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const setFilterParams = useCallback(
    (params: any) => {
      setSearchParams({ ...params, ...paging });
    },
    [setSearchParams, paging],
  );

    const filterParams = useCallback(() => {
    return _omit(pageSearchParams, ...pagingKeys);
  }, [searchParams]);


  const { data, isPending, isError, isSuccess } = useAsyncState(
    {
      lazy: false,
      source: studentsListResource,
      payload: {
        params: searchParams,
      },
    },
    [searchParams],
  );

  const columns = useStudentColumns();

  if (isError) {
    return <BaseErrorAlert message={t(messages.errorLoadingStudents)} />;
  }

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <Spin size="large" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <div className="p-6">
          <div className="mb-6">
            <Title level={2}>{t(messages.students)}</Title>
          </div>

          <StudentFilters
            filters={filterParams()}
            loading={isPending}
            onReset={resetFilterParams}
            setFilterParams={setFilterParams}
          />

          <Card>
            <div className="mb-4 flex items-center justify-between">
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => modal.open(AddStudentModal.key)}
                >
                  {t(messages.addStudent)}
                </Button>
              </Space>
            </div>

            <Table
              columns={columns}
              dataSource={data || []}
              rowKey="id"
              loading={isPending}
              onChange={setPagingParams}
              pagination={{
                current: paging.current,
                pageSize: paging.pageSize,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  t(globalMessages.tableTotal, {
                    from: range[0],
                    to: range[1],
                    total,
                    item: t(messages.students),
                  }),
              }}
              locale={{
                emptyText: t(messages.noStudentsFound),
              }}
            />
          </Card>
        </div>
      </>
    );
  }
}
