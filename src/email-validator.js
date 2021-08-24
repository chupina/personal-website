// const VALID_EMAIL_ENDINGS = ["gmail.com", "outlook.com", "yandex.ru"];

export const validate = (email) => {
  const value = email.trim();
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail.com|yandex.ru|outlook.com)$/.test(value);
};

export const validateAsync = (email) => {
  const validationResult = exports.validate(email);
  return Promise.resolve(validationResult);
};

export const validateWithThrow = (email) => {
  const validationResult = exports.validate(email);
  if (validationResult) {
    return true;
  }
  throw new Error("Provided email is invalid");
};

export const validateWithLog = (email) => {
  const validationResult = exports.validate(email);
  console.log(validationResult);
  return validationResult;
};
