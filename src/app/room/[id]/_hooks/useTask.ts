import { useFetch } from "./useFetch";
import { DetailResponse } from "@/app/_types/task/DetailResponse";
export const useTask = (taskId: number) => {
  return useFetch<DetailResponse>(`/api/tasks/${taskId}`);
};
