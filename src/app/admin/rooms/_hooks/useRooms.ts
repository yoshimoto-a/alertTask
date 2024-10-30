import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/admin/rooms/IndexResponse";
export const useRooms = () => {
  const { data, isLoading, error, mutate } =
    useFetch<IndexResponse>(`api/admin/room`);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
