export function fetchData(url, type = "GET", payload = {}, errorHandler, successHandler) {
  fetch(url, {
    method: type,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(errorHandler)
    .then((response) => response.json())
    .then(successHandler)
    .catch((error) => {
      // eslint-disable-next-line no-alert
      alert(error);
    });
}
