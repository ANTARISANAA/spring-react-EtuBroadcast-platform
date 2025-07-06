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
import { sendInvitationProducer } from '../../data/producers';
import { messages } from '../../messages';

function SendInvitation() {
  const params = useModalParams<{ studentName: string; studentId: string }>();
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const { close } = useModal();
  const {
    isPending,
    source: { runc },
  } = useAsync({ producer: sendInvitationProducer });

  const onSubmitForm = () => {
    runc({
      args: [{ studentId: params?.studentId }],
      onError: ({ data: error }) => {
        notification.error({ message: t(error.cause.message) });
      },
      onSuccess() {
        notification.success({
          message: t(messages.resendInvitationSuccess, {
            studentName: params?.studentName,
          }),
        });
        close();
      },
    });
  };

  return (
    <Form onFinish={onSubmitForm}>
      <p className="py-6">
        {t(messages.resendInvitatonDescription, {
          studentName: params?.studentName,
        })}
      </p>
      <div className="mr-3">
        <ModalFooter okButtonProps={{ loading: isPending }} />
      </div>
    </Form>
  );
}

export const SendInvitationModal = createModal({
  key: 'send-notification',
  title: i18n.t(messages.resendInvitaion),
  element: <SendInvitation />,
  size: 'medium',
});
