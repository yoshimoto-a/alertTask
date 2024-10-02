import useSWR from "swr";
import { useSupabaseSession } from "./useSupabaseSesion";

export const useFetch = <T>(path: string) => {
  const { token, isLoading } = useSupabaseSession();
  const shouldFetchData = !isLoading && token;
  const fetcher = async () => {
    if (!token) return;
    const prams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const resp = await fetch(`/api/${path}`, prams);
    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(
        errorData.message || "An error occurred while fetching the data."
      );
    }
    const data: T = await resp.json();
    return data;
  };
  const results = useSWR(shouldFetchData ? `/api/${path}` : null, fetcher);
  return results;
};
