import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DetailResponse } from "@/app/_types/task/DetailResponse";

const schema = z.object({
  date: z.string().min(1, { message: "日付は必須です" }),
  task: z.string().min(1, { message: "予定は必須です" }),
});
type FormData = z.infer<typeof schema>;

interface FormFieldsProps {
  onSubmit: (data: FormData) => void;
  defaultValues?: DetailResponse;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[300px] mx-auto">
      <input
        id="date"
        type="date"
        disabled={isSubmitting}
        placeholder="日付"
        className="bg-custom-gray py-2 px-3 mb-1 text-gray-700 leading-tight w-full border-[1px] rounded-lg"
        {...register("date")}
      />
      {errors.date && (
        <span className="text-red-500 block text-xs">
          {errors.date.message}
        </span>
      )}

      <input
        id="task"
        type="text"
        placeholder="タスク"
        className="bg-custom-gray py-2 px-3 mb-1 text-gray-700 leading-tight w-full border-[1px] rounded-lg"
        {...register("task")}
      />
      {errors.task && (
        <span className="text-red-500 block text-xs">
          {errors.task.message}
        </span>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-2"
      >
        登録
      </button>
    </form>
  );
};
