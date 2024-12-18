import { useFetch } from "./useFetch";
import { DetailResponse } from "@/app/_types/task/DetailResponse";
export const useTask = (taskId: number) => {
  const { data, error } = useFetch<DetailResponse>(`/api/tasks/${taskId}`);

  return { data, error };
};
