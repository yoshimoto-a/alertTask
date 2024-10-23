import { useFetch } from "@/app/_hooks/useFetch";
import { DetailResponse } from "@/app/_types/task/DetailResponse";
export const useTask = (taskId: number) => {
  const { data, error } = useFetch<DetailResponse>(`tasks/${taskId}`);

  return { data, error };
};
