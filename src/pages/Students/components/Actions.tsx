import EditOutlined from '@ant-design/icons/EditOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import { useTranslation } from 'react-i18next';
import TableActions from '@/core/components/TableActions';
import { useModal } from '@/core/components/modals';
import { EditStudentModal } from '../features/EditStudent';
import { SendInvitationModal } from '../features/SendNotification';
import { ViewStudenttModal } from '../features/ViewStudent';
import { messages } from '../messages';
import type { Student } from '../types';

type Actions = {
  student: Student;
};
export default function Actions({ student }: Actions) {
  const { t } = useTranslation();
  const modal = useModal();

  return (
    <TableActions
      actions={[
        {
          title: t(messages.viewStudent),
          buttonIcon: <EyeOutlined />,
          onClick: () => {
            modal.open(ViewStudenttModal.key, {
              student,
              title: t(messages.viewStudentDetails, {
                studentName: student.fullName,
              }),
            });
          },
        },
        {
          title: t(messages.editStudent),
          buttonIcon: <EditOutlined />,
          onClick: () =>
            modal.open(EditStudentModal.key, {
              student,
              title: t(messages.editStudentTitle, {
                studentName: student.fullName,
              }),
            }),
        },
        {
          title: t(messages.sendNofication),
          buttonIcon: <SendOutlined />,
          onClick: () => {
            modal.open(SendInvitationModal.key, {
              studentId: student.id,
              studentName: student.fullName,
              title: t(messages.sendStudentNotification, {
                studentName: student.fullName,
              }),
            });
          },
        },
      ]}
    />
  );
}
