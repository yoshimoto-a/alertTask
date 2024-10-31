"use client";
import { Form } from "@/app/admin/_components/Form";
import { Button } from "@/app/_components/Button";

type Props = {
  error: string | null | undefined;
  checkPassword: (e: React.FormEvent) => Promise<void>;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
};
export const InputPassword: React.FC<Props> = ({
  error,
  checkPassword,
  inputValue,
  setInputValue,
}) => {
  return (
    <Form onSubmit={checkPassword} title="合言葉">
      <p className="pb-2">アカウント追加時に届いた合言葉を入力してください</p>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input
        className="bg-custom-gray py-2 px-3 mb-1 text-gray-700 leading-tight w-full border-[1px] rounded-lg"
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <div className="mt-4 h-9">
        <Button type="submit">OK</Button>
      </div>
    </Form>
  );
};
