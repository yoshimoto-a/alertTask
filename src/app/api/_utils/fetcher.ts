type FetcherOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

export const fetcher = async <ResponseType>(
  url: string,
  options: FetcherOptions = {}
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
