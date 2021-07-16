const VALID_EMAIL_ENDINGS = ["gmail.com", "outlook.com", "yandex.ru"];
export const validate = (email) => {
  const result = email.trim().match(/.+@(.*)$/);
  return (result ? VALID_EMAIL_ENDINGS.includes(result[1]) : false);
};
