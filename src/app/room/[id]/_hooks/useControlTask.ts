"use client";
import { useState, useEffect, useMemo } from "react";
import { ScheduleType } from "../_types/schedule";
import { useApi } from "@/app/_hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { PostRequest } from "@/app/_types/room/[id]/PostRequest";
import { PostResponse } from "@/app/_types/room/[id]/PostResponse";
import { PutRequest } from "@/app/_types/task/PutRequest";
import { PutResponse } from "@/app/_types/task/PutResponse";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
import { DetailResponse } from "@/app/_types/task/DetailResponse";
interface Task {
  date: Date;
  task: string;
}
export const useControlTask = (
  mutate: KeyedMutator<IndexResponse>,
  taskId: number | null,
  data: DetailResponse | undefined | null
) => {
  const defaultSchedule = useMemo(
    () => [{ daysBefore: "1", hour: { value: 20, label: "20時" } }],
    []
  );
  const [schedules, setSchedules] = useState<ScheduleType[]>(defaultSchedule);
  const { post, del, put } = useApi();
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();

  const schema = z.object({
    date: z.string().min(1, { message: "日付は必須です" }),
    task: z.string().min(1, { message: "予定は必須です" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Task>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (taskId && data) {
      setSchedules(data.schedules);
      reset({
        date: data.date,
        task: data.name,
      });
    } else {
      setSchedules(defaultSchedule);
      reset();
    }
  }, [taskId, data, setSchedules, reset, defaultSchedule]);

  const onSubmit = async (formdata: Task) => {
    const body = {
      date: new Date(formdata.date),
      task: formdata.task,
      schedules: schedules.map(item => ({
        daysBefore: Number(item.daysBefore),
        hour: Number(item.hour?.value),
      })),
    };

    try {
      if (taskId) {
        await updateTask(body);
      } else {
        await createTask(body);
        onClose();
      }
      mutate();
      toast.success("登録に成功しました");
    } catch (e) {
      toast.error(`登録に失敗しました：${e}`);
    }
  };

  const createTask = async (body: PostRequest) => {
    const roomId = params.id;
    await post<PostRequest, PostResponse>(`/api/room/${roomId}`, body);
  };

  const updateTask = async (body: PutRequest) => {
    if (!taskId) {
      toast.error("タスクIDが無効です");
      return;
    }
    await put<PutRequest, PutResponse>(`/api/tasks/${taskId}`, body);
  };
  const onClose = () => {
    setIsOpen(false);
    reset();
    setSchedules(defaultSchedule);
  };
  const deleteTask = async () => {
    if (!taskId) {
      toast.error("タスクIDが無効です");
      return;
    }
    if (confirm("削除しますか？")) {
      try {
        await del<{ message: string }>(`/api/tasks/${taskId}`);
        mutate();
        toast.success("タスクを削除しました");
      } catch (e) {
        toast.error(`削除に失敗しました${e}`);
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    schedules,
    setSchedules,
    deleteTask,
    reset,
    isOpen,
    setIsOpen,
    onClose,
  };
};
