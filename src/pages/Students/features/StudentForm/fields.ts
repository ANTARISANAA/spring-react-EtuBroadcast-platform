import { useTranslation } from 'react-i18next';
import { FormRules } from '@/utils/validation/rules';
import { messages } from '../../messages';

interface Meta {
  columns: number;
  formItemLayout: {
    wrapperCol: { span: number };
  };
  fields: FieldType[];
}

interface FieldType {
  key: string;
  label: string;
  rules?: any[];
  widgetProps?: Record<string, any>;
  widget?: string;
  placeholder?: string;
  rows?: number;
}

export function useStudentFields(): Meta {
  const { t } = useTranslation();

  return {
    columns: 1,
    formItemLayout: {
      wrapperCol: { span: 23 },
    },
    fields: [
      {
        key: 'fullName',
        label: t(messages.fullName),
        rules: [FormRules.required(), FormRules.maxLength(100)],
        widgetProps: {
          maxLength: 100,
          placeholder: t(messages.fullName),
        },
      },
      {
        key: 'email',
        label: t(messages.email),
        rules: [
          FormRules.required(),
          FormRules.email(),
          FormRules.maxLength(255),
        ],
        widgetProps: {
          maxLength: 255,
          placeholder: t(messages.email),
        },
      },
      {
        key: 'phoneNumber',
        label: t(messages.phoneNumber),
        rules: [
          FormRules.required(),
          FormRules.phone(),
          FormRules.maxLength(20),
        ],
        widgetProps: {
          maxLength: 20,
          placeholder: t(messages.phoneNumber),
        },
      },
      {
        key: 'address',
        label: t(messages.address),
        rules: [FormRules.required(), FormRules.maxLength(500)],
        widget: 'textarea',
        widgetProps: {
          maxLength: 500,
          placeholder: t(messages.address),
          rows: 3,
        },
      },
    ] as FieldType[],
  };
}
