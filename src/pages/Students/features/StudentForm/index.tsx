import { App, Form } from 'antd';
import FormBuilder from 'antd-form-builder';
import type { Producer } from 'async-states';
import { useAsync } from 'react-async-states';
import { useTranslation } from 'react-i18next';
import { ModalFooter } from '@/core/components/modals/AppModal';
import type { ApiError } from '@/utils/types';
import { messages } from '../../messages';
import type { StudentFormData } from '../../types';
import { useStudentFields } from './fields';

interface StudentFormProps {
  initialValues?: Partial<StudentFormData>;
  producer?: Producer<void, [StudentFormData], ApiError>;
  isViewMode?: boolean;
}

export default function StudentForm({
  initialValues,
  producer,
  isViewMode = false,
}: StudentFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const meta = useStudentFields();
  const { notification } = App.useApp();

  const isEditMode = !!initialValues;

  const {
    isPending,
    source: { runc },
  } = useAsync({
    producer,
  });

  const handleSubmit = async (formValues: StudentFormData) => {
    runc({
      args: [formValues],
      onError: ({ data: error }) => {
        notification.error({
          message: t(error.cause.message),
        });
      },
      onSuccess: () => {
        notification.success({
          message: t(
            messages[
              isEditMode
                ? 'studentUpdatedSuccessfully'
                : 'studentAddedSuccessfully'
            ]
          ),
        });
        close();
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <div className="pr-4">
        <FormBuilder meta={meta} form={form} disabled={isViewMode} />
        {!isViewMode && <ModalFooter okButtonProps={{ loading: isPending }} />}
      </div>
    </Form>
  );
}
