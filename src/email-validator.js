const VALID_EMAIL_ENDINGS = ["gmail.com", "outlook.com", "yandex.ru"];
export const validate = (email) => {
  const result = email.match(/\w+@(.*)$/);
  // eslint-disable-next-line no-alert
  alert(result == null ? false : VALID_EMAIL_ENDINGS.includes(result[1]));
};
