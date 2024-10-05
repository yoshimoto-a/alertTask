import { useFetch } from "../../_hooks/useFetch";
import { IndexResponse } from "../../_types/admin/user/IndexResponse";
export const useAdminUser = () => {
  const { data, isLoading, error } = useFetch<IndexResponse>(`admin/user`);
  return { isLoading, email: data?.email, error };
};
