import { App, Form } from 'antd';
import { useAsync } from 'react-async-states';
import { useTranslation } from 'react-i18next';
import {
  createModal,
  useModal,
  useModalParams,
} from '@/core/components/modals';
import { ModalFooter } from '@/core/components/modals/AppModal';
import i18n from '@/i18n';
import { deleteStudentProducer } from '../../data/producers';
import { messages } from '../../messages';
import { globalMessages } from '@/core/components/messages/common';
import { DEFAULT_SEARCH_PARAMS, studentsListResource } from '../..';

function DeleteStudent() {
  const params = useModalParams<{ studentName: string; studentId: string }>();
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const { close } = useModal();
  const {
    isPending,
    source: { runc },
  } = useAsync({ producer: deleteStudentProducer });

  const onSubmitForm = () => {
    runc({
      args: [params?.studentId],
      onError: ({ data: error }) => {
        notification.error({ message: t(error.cause.message) });
      },
      onSuccess() {
        notification.success({
          message: t(messages.deleteStudentSuccess, {
            studentName: params?.studentName,
          }),
        });
        close();
        // Refresh the page to show updated student list
        studentsListResource.runc({args: [DEFAULT_SEARCH_PARAMS]});
      },
    });
  };

  return (
    <Form onFinish={onSubmitForm}>
      <div className="py-6">
        <div className="mb-4">
          <p className="text-red-600 font-medium">
            {t(messages.deleteStudentConfirmation, {
              studentName: params?.studentName,
            })}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            ⚠️ {t(messages.deleteStudentWarning)}
          </p>
        </div>
      </div>
      <div className="mr-3">
        <ModalFooter 
          okButtonProps={{ 
            loading: isPending,
            danger: true,
            type: 'primary'
          }}
          okText={t(globalMessages.delete)}
        />
      </div>
    </Form>
  );
}

export const DeleteStudentModal = createModal({
  key: 'delete-student',
  title: i18n.t(messages.deleteStudent),
  element: <DeleteStudent />,
  size: 'medium',
}); 