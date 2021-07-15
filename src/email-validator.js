const VALID_EMAIL_ENDINGS = ['gmail.com', 'outlook.com', 'yandex.ru']
export const validate = (email) => {
  let result = email.match(/@(.*)$/);
  alert(result == null ? false : VALID_EMAIL_ENDINGS.includes(result[1]));
};