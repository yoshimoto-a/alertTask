"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/app/_utils/supabase";
import { useApiWithSession } from "./useApiWithSession";
import toast from "react-hot-toast";
import { PostRequest } from "@/app/_types/admin/login/PostRequest";
import { PostResponse } from "@/app/_types/admin/login/PostResponse";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { post } = useApiWithSession();
  const router = useRouter();
  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "メールアドレスは必須です" })
      .email({ message: "無効なメールアドレスです" }),
    password: z.string().min(1, { message: "パスワードは必須(6文字以上)です" }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (formdata: LoginForm) => {
    const toastId = toast.loading("ログイン処理中...");
    try {
      const { email, password } = formdata;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error(error);
        throw new Error(`ログインに失敗しました:${error}`);
      }
      await post<PostRequest, PostResponse>("/api/admin/login", {
        email,
      });
      reset();
      router.replace("/admin/rooms");
    } catch (e) {
      console.error(e);
      alert(e);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
