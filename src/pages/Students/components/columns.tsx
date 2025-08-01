import { Space } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { messages } from '../messages';
import type { Student } from '../types';
import Actions from './Actions';

export const useStudentColumns = (): ColumnsType<Student> => {
  const { t } = useTranslation();

  return [
    {
      title: t(messages.fullName),
      key: 'fullName',
      dataIndex: 'fullName',
      sorter: true,
      render: (fullName: string) => (
        <Space>
          <UserOutlined />
          <span>{fullName}</span>
        </Space>
      ),
    },
    {
      title: t(messages.email),
      key: 'email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: t(messages.phoneNumber),
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
    {
      title: t(messages.address),
      key: 'address',
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: t(messages.actions),
      key: 'actions',
      fixed: 'right',
      render: (record) => <Actions student={record} />,
    },
  ];
};
