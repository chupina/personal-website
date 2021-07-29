// const VALID_EMAIL_ENDINGS = ["gmail.com", "outlook.com", "yandex.ru"];

export const validate = (email) => {
  const value = email.trim();
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail.com|yandex.ru|outlook.com)$/.test(value);
};

export const validateAsync = (email) => {
  const value = email.trim();
  const validationResult = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail.com|yandex.ru|outlook.com)$/.test(value);
  return Promise.resolve(validationResult);
};

export const validateWithThrow = (email) => {
  const value = email.trim();
  const validationResult = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail.com|yandex.ru|outlook.com)$/.test(value);
  if (validationResult) {
    return true;
  }
  throw new Error("Provided email is invalid");
};

export const validateWithLog = (email) => {
  const value = email.trim();
  const validationResult = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail.com|yandex.ru|outlook.com)$/.test(value);
  // eslint-disable-next-line no-console
  console.log(validationResult);
  return validationResult;
};
