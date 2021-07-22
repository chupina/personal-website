export const setValue = (inputEl, key) => {
  localStorage.setItem(key, inputEl.value);
};

export const getValue = (inputEl, key) => {
  if (!localStorage.getItem(key)) {
    inputEl.value = "";
  } else {
    inputEl.value = localStorage.getItem(key);
  }
};
