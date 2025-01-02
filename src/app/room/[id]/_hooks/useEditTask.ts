"use client";
import { useEffect } from "react";
import { useApi } from "@/app/_hooks/useApi";
import { PutRequest } from "@/app/_types/task/PutRequest";
import { PutResponse } from "@/app/_types/task/PutResponse";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
import { useTaskForm } from "./useTaskForm";
import dayjs from "dayjs";
import { DetailResponse } from "@/app/_types/task/DetailResponse";

interface Task {
  date: string;
  task: string;
}
export const useEditTask = ({
  mutate,
  taskId,
  setIsOpen,
  data,
}: {
  mutate: KeyedMutator<IndexResponse>;
  taskId: number;
  setIsOpen: (isOpen: boolean) => void;
  data: DetailResponse | undefined;
}) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    schedules,
    setSchedules,
    reset,
  } = useTaskForm<Task>({
    date: dayjs().format("YYYY-MM-DD"),
    task: "",
  });

  useEffect(() => {
    if (!data) return;
    reset({
      date: dayjs(data.date).format("YYYY-MM-DD"),
      task: data.name,
    });
  }, [data, reset]);
  const { del, put } = useApi();
  useEffect(() => {
    if (!data) return;
    setSchedules(data.schedules);
  }, [taskId, data, setSchedules, reset]);

  const onClose = () => {
    mutate();
    reset();
    setIsOpen(false);
  };

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
      await put<PutRequest, PutResponse>(`/api/tasks/${taskId}`, body);
      onClose();
      toast.success("登録に成功しました");
    } catch (e) {
      toast.error(`登録に失敗しました：${e}`);
    }
  };
  const deleteTask = async () => {
    if (!taskId) {
      toast.error("タスクIDが無効です");
      return;
    }
    if (confirm("削除しますか？")) {
      try {
        await del<{ message: string }>(`/api/tasks/${taskId}`);
        onClose();
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
  };
};
