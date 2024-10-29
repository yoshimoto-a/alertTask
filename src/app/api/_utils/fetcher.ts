type FetcherOptions<T> = {
  method?: string;
  headers?: Record<string, string>;
  body?: T;
};

export const fetcher = async <ResponseType, RequestBodyType = undefined>(
  url: string,
  options: FetcherOptions<RequestBodyType> = {}
): Promise<ResponseType> => {
  const { method = "GET", headers = {}, body } = options;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ResponseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
