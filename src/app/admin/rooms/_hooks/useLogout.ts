import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { supabase } from "@/app/_utils/supabase";

export const useLogout = () => {
  const router = useRouter();
  const logout = useCallback(async () => {
    const result = confirm("ログアウトしますか？");
    if (!result) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("ログアウトに失敗しました");
      return;
    }
    router.push("/admin/login/");
  }, [router]);
  return { logout };
};
