import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMemo, useState } from "react";
import { ScheduleType } from "../_types/schedule";

export const useTaskForm = <T extends FieldValues>(
  defaultValues?: DefaultValues<T>
) => {
  const defaultSchedule = useMemo(
    () => [{ daysBefore: "1", hour: { value: 20, label: "20時" } }],
    []
  );
  const [schedules, setSchedules] = useState<ScheduleType[]>(defaultSchedule);
  const schema = z.object({
    date: z.string().min(1, { message: "日付は必須です" }),
    task: z.string().min(1, { message: "予定は必須です" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues,
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    schedules,
    setSchedules,
    reset,
  };
};
