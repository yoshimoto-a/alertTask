import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/admin/room/IndexResponse";
export const useRooms = () => {
  const { data, isLoading, error } = useFetch<IndexResponse>(`admin/room`);

  return {
    data,
    isLoading,
    error,
  };
};
