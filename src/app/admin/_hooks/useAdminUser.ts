import { useFetch } from "./useFetch";
import { IndexResponse } from "../../_types/admin/user/IndexResponse";
export const useAdminUser = () => {
  const { data, isLoading, error } = useFetch<IndexResponse>(`/api/admin/user`);
  return { isLoading, email: data?.email, error };
};
