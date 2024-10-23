"use client";
import { Form } from "../_components/Form";
import { Input } from "@/app/_components/Input";
import { Button } from "@/app/_components/Button";
import { useLogin } from "./_hooks/useLogin";

export default function Page() {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();
  return (
    <Form onSubmit={handleSubmit} title="ログイン">
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
        <Button type="submit">ログイン</Button>
      </div>
    </Form>
  );
}
