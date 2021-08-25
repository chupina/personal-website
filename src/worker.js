const responseBatch = [];
self.onmessage = (e) => {
  responseBatch.push(e.data);
  if (responseBatch.length >= 5) {
    fetch("http://localhost:8080/api/analytics/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseBatch),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        self.postMessage(data);
        responseBatch.length = 0;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
