import { useState } from "react";

interface BodyParams {
  [key: string]: any;
}

interface Body {
  action: string;
  params: BodyParams;
}

export default function useFetch() {
  const [loading, setLoading] = useState(true);

  function post(url: string, xAuth: string, body: Body) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": xAuth,
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (!data) {
            throw new Error(`Error! No data to fetch`);
          }
          resolve(data.result);
        })
        .catch((error) => {
          reject(error);
          throw new Error(error);
        })
        .finally(() => setLoading(false));
    });
  }

  return { post, loading };
}
