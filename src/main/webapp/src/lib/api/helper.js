import "whatwg-fetch";

const APIUrl = process.env.API_URL || "http://localhost:8080";

export function post(endpoint, body = {}, options = {}) {
  const payload = typeof body === "string" ? body : JSON.stringify(body);

  return fetch(`${APIUrl}${endpoint}`, {
    method: "POST",
    credentials: "include",
    body: payload,
    headers: {
      "content-type": "application/json"
    },
    ...options
  }).then(
    res =>
      new Promise((resolve, reject) => {
        res.json().then(json => {
          resolve({ res, json });
        });
      })
  );
}

export function get(endpoint, options = {}) {
  return fetch(`${APIUrl}${endpoint}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json"
    },
    ...options
  }).then(
    res =>
      new Promise((resolve, reject) => {
        res.json().then(json => {
          resolve({ res, json });
        });
      })
  );
}
