"use client";
import { useSignup } from "./_hooks/useSignup";
import { Input } from "@/app/_components/Input";
import { Button } from "@/app/_components/Button";
import { Form } from "../_components/Form";

export default function Page() {
  const { register, handleSubmit, errors, isSubmitting } = useSignup();
  return (
    <Form onSubmit={handleSubmit} title="サインアップ">
      <Input
        label="メールアドレス"
        disabled={isSubmitting}
        id="email"
        inputMode="email"
        placeholder="メールアドレス"
        type="email"
        errors={errors.email}
        register={register("email")}
      />
      <Input
        label="パスワード"
        disabled={isSubmitting}
        id="password"
        inputMode="text"
        placeholder="パスワード"
        type="password"
        errors={errors.password}
        register={register("password")}
      />
      <div className="mt-4 h-9">
        <Button>登録</Button>
      </div>
    </Form>
  );
}
