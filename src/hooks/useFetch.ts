import { useState } from "react";

export type Action = "get_ids" | "get_items" | "get_fields" | "filter";

export interface BodyParams {
  [key: string]: any;
}

export interface FetchResult {
  [key: string]: any;
}

export default function useFetch() {
  const [loading, setLoading] = useState<boolean>(false);

  function post(
    url: string,
    xAuth: string,
    action: Action,
    params?: BodyParams
  ): Promise<FetchResult> {
    setLoading(true);

    const request = async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": xAuth,
        },
        body: JSON.stringify({
          action: action,
          params: params,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    };

    const handleRequest = async (): Promise<FetchResult> => {
      try {
        const data = await request();
        setLoading(false);
        return data.result;
      } catch (error) {
        console.error("Error occurred:", error);
        console.log('Отправляем повторный запрос на сервер...');
        return await handleRequest();
      }
    };

    return handleRequest();
  }

  return { post, loading };
}
