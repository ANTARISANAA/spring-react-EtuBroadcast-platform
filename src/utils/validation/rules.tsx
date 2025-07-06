import i18n from '@/i18n';
import { REGEX_EMAIL, REGEX_PHONE, REGEX_VALID_NUMBER } from './helpers';
import { rulesMessages } from './rulesMessages';

export const FormRules = Object.freeze({
  required: (required = true, message = i18n.t(rulesMessages.required)) => ({
    required,
    message,
  }),

  maxLength: (max = 255) => ({
    max,
    message: i18n.t(rulesMessages.maxLength, { max }),
  }),

  minLength: (min = 6) => ({
    min,
    message: i18n.t(rulesMessages.minLength, { min }),
  }),

  email: (message = i18n.t(rulesMessages.email)) => ({
    pattern: REGEX_EMAIL,
    message,
  }),

  numeric: (message = i18n.t(rulesMessages.numericInput)) => ({
    pattern: REGEX_VALID_NUMBER,
    message,
  }),

  phone: (message = i18n.t(rulesMessages.phoneNumber)) => ({
    pattern: REGEX_PHONE,
    message,
  }),
});
