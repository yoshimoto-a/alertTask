import { useParams } from "next/navigation";
import { useFetch } from "../../_hooks/useFetch";
import { IndexResponse } from "@/app/_types/room/[id]/calendar/IndexResponse";

export const useCalendar = () => {
  const { id } = useParams();
  return useFetch<IndexResponse>(`/api/room/${id as string}/calendar`);
};
