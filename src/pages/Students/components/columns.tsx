import { Space, Tag } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/utils';
import { messages } from '../messages';
import type { Student } from '../types';
import { getGenderColor, getStatusColor } from '../utils';
import Actions from './Actions';

export const useStudentColumns = (): ColumnsType<Student> => {
  const { t } = useTranslation();

  return [
    {
      title: t(messages.name),
      key: 'name',
      sorter: true,
      render: (record: Student) => (
        <Space>
          <UserOutlined />
          <span>{`${record.firstName} ${record.lastName}`}</span>
        </Space>
      ),
    },
    {
      title: t(messages.contact),
      key: 'contact',
      render: (record: Student) => (
        <Space direction="vertical" size="small">
          <div>{record.email}</div>
          {record.phone && <div className="text-gray-500">{record.phone}</div>}
        </Space>
      ),
    },
    {
      title: t(messages.gender),
      key: 'gender',
      dataIndex: 'gender',
      render: (gender: Student['gender']) => (
        <Tag color={getGenderColor(gender)}>
          {t(messages[gender as keyof typeof messages])}
        </Tag>
      ),
    },
    {
      title: t(messages.status),
      key: 'status',
      dataIndex: 'status',
      render: (status: Student['status']) => (
        <Tag color={getStatusColor(status)}>
          {t(messages[status as keyof typeof messages])}
        </Tag>
      ),
    },
    {
      title: t(messages.academicInfo),
      key: 'academic',
      render: (record: Student) => (
        <Space direction="vertical" size="small">
          <div>
            <strong>{t(messages.grade)}:</strong> {record.grade}
          </div>
          <div>
            <strong>{t(messages.major)}:</strong> {record.major}
          </div>
          <div>
            <strong>{t(messages.gpa)}:</strong> {record.gpa.toFixed(2)}
          </div>
        </Space>
      ),
    },
    {
      title: t(messages.enrollmentDate),
      key: 'enrollmentDate',
      dataIndex: 'enrollmentDate',
      sorter: true,
      render: (date: string) => formatDate(date),
    },
    {
      title: t(messages.actions),
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (record) => <Actions student={record} />,
    },
  ];
};
