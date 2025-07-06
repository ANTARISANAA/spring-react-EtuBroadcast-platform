
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const REGEX_PHONE = /^(?:0\d{8,14}|\+\d{8,14}|00\d{8,13})$/;

const REGEX_NUMERIC = /^[0-9]*$/;

const REGEX_VALID_NUMBER = /^(?!0*$)[0-9]+$/;

const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

export {
  REGEX_EMAIL,
  REGEX_PHONE,
  REGEX_NUMERIC,
  REGEX_VALID_NUMBER,
  ALPHA_NUMERIC_REGEX,
};
