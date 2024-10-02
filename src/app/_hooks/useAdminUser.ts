import { useFetch } from "./useFetch";
import { IndexResponse } from "../_types/admin/user/IndexResponse";
import { useSupabaseSession } from "./useSupabaseSesion";
export const useAdminUser = async () => {
  const { session } = useSupabaseSession();
  const { data, isLoading, error } = useFetch<IndexResponse>(
    `admin/user/${session?.user.id}`
  );
  return { isLoading, data, error };
};
