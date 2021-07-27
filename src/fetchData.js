const baseURL = "http://localhost:8080/api/";
export const UsersAPI = {
  subscribe(email) {
    return fetch(`${baseURL}subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error);
          });
        }
        return response;
      })
      .then((response) => response.json());
  },
  unsubscribe() {
    return fetch(`${baseURL}unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json());
  },
  getUsers() {
    return fetch(`${baseURL}community`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json());
  },
};
