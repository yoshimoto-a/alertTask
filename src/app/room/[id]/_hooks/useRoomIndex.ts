import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
import { useParams } from "next/navigation";

export const useRoomIndex = () => {
  const params = useParams();
  const { data, isLoading, error, mutate } = useFetch<IndexResponse>(
    `api/room/${params?.id}`
  );
  return {
    isLoading,
    groupName: data?.groupName,
    tasks: data?.tasks,
    error,
    mutate,
  };
};
