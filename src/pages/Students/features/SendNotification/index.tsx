import { App, Form, Input } from 'antd';
import { useAsync } from 'react-async-states';
import { useTranslation } from 'react-i18next';
import {
  createModal,
  useModal,
  useModalParams,
} from '@/core/components/modals';
import { ModalFooter } from '@/core/components/modals/AppModal';
import i18n from '@/i18n';
import { sendNotificationProducer } from '../../data/producers';
import { messages } from '../../messages';

function SendInvitation() {
  const params = useModalParams<{ studentName: string; studentId: string, studentEmail: string }>();
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const { close } = useModal();
  const [form] = Form.useForm();
  const {
    isPending,
    source: { runc },
  } = useAsync({ producer: sendNotificationProducer });

  const onSubmitForm = (values: { message: string }) => {
    runc({
      args: [{
        studentId: params?.studentId,
        targets: params?.studentEmail,
        message: values.message || `Invitation sent to ${params?.studentName}`,
        type: 'CREATE'
      }],
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
    <Form form={form} onFinish={onSubmitForm} layout="vertical">
      <div className="py-4 pr-4">
        <p className="mb-4">
          {t(messages.resendInvitatonDescription, {
            studentName: params?.studentName,
          })}
        </p>

        <Form.Item
          name="message"
          label={t(messages.messageLabel)}
          rules={[
            {
              required: true,
              message: t(messages.messageRequired),
            },
            {
              max: 500,
              message: t(messages.messageMaxLength),
            },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder={t(messages.messagePlaceholder, {
              studentName: params?.studentName,
            })}
            showCount
            maxLength={500}
          />
        </Form.Item>
      </div>

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
