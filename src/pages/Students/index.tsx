import { Button, Card, Space, Spin, Table, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAsyncState } from 'react-async-states';
import { useTranslation } from 'react-i18next';
import BaseErrorAlert from '@/core/components/Errors/BaseErrorAlert';
import { globalMessages } from '@/core/components/messages/common';
import { useModal } from '@/core/components/modals';
import { useStudentColumns } from './components/columns';
import { StudentFilters } from './components/filterFields';
import { getStudentsProducer } from './data/producers';
import { AddStudentModal } from './features/AddStudent';
import { messages } from './messages';

const { Title } = Typography;

export default function StudentsPage() {
  const { t } = useTranslation();
  const modal = useModal();

  const { data, isPending, isError, isSuccess, isInitial } = useAsyncState.auto(
    {
      producer: getStudentsProducer,
      autoRunArgs: [{ filters: {} }],
    },
    []
  );

  const handleFiltersChange = () => {};

  const handleClearFilters = () => {};

  const columns = useStudentColumns();

  if (isError) {
    return <BaseErrorAlert message={t(messages.errorLoadingStudents)} />;
  }

  if (isPending || isInitial) {
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
            filters={{}}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            loading={isPending}
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
              dataSource={data?.student || []}
              rowKey="id"
              loading={isPending}
              pagination={{
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
              scroll={{ x: 1200 }}
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
