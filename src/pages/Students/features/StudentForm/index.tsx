import { App, Form } from 'antd';
import FormBuilder from 'antd-form-builder';
import type { Producer } from 'async-states';
import {  useAsync } from 'react-async-states';
import { useTranslation } from 'react-i18next';
import { ModalFooter } from '@/core/components/modals/AppModal';
import type { ApiError } from '@/utils/types';
import { messages } from '../../messages';
import type { Student, StudentFormData } from '../../types';
import { useStudentFields } from './fields';
import { useModal } from '@/core/components/modals';
import { DEFAULT_SEARCH_PARAMS, studentsListResource } from '../..';

interface StudentFormProps {
  initialValues?: Partial<StudentFormData>;
  producer?: Producer<Student, [StudentFormData], ApiError>;
  isViewMode?: boolean;
}

export default function StudentForm({
  initialValues,
  producer,
  isViewMode = false,
}: StudentFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const modal = useModal();
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
      args: [{...formValues, id: initialValues?.id}],
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
        modal.close();
        studentsListResource.runc({args: [DEFAULT_SEARCH_PARAMS]});
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
