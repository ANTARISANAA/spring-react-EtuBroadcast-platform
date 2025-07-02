import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { useTranslation } from 'react-i18next';
import TableActions from '@/core/components/TableActions';
import { messages } from '../messages';
import type { Student } from '../types';

type Actions = {
  student: Student;
};
export default function Actions({ student }: Actions) {
  const { t } = useTranslation();
  console.log(student);

  return (
    <TableActions
      actions={[
        {
          title: t(messages.viewStudent),
          buttonIcon: <EyeOutlined />,
          onClick: () => {
            console.log('view');
          },
        },
        {
          title: t(messages.editStudent),
          buttonIcon: <EditOutlined />,
          onClick: () => {
            console.log('edit');
          },
        },
        {
          title: t(messages.deleteStudent),
          buttonIcon: <DeleteOutlined />,
          onClick: () => {
            console.log('delete');
          },
        },
      ]}
    />
  );
}
