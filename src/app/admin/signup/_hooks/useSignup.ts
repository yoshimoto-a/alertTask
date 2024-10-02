import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/app/_utils/supabase";

interface SignupForm {
  email: string;
  password: string;
}

export const useSignup = () => {
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
  } = useForm<SignupForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: SignupForm) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/admin/login`,
      },
    });
    if (error) {
      alert(`登録に失敗しました:${error}`);
    } else {
      alert(
        "ご登録ありがとうございます。メールを送信しましたので確認をお願いします。"
      );
      reset();
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
