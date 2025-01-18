"use client";
import { useState } from "react";
import { useApi } from "@/app/_hooks/useApi";
import { PostRequest } from "@/app/_types/room/[id]/PostRequest";
import { PostResponse } from "@/app/_types/room/[id]/PostResponse";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";
import { useTaskForm } from "./useTaskForm";
import { Color } from "@prisma/client";
interface Task {
  date: string;
  task: string;
}
export const useCreateTask = <T>({ mutate }: { mutate: KeyedMutator<T> }) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    schedules,
    setSchedules,
    reset,
  } = useTaskForm<Task>();

  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState<Color>("BLUE");
  const { post } = useApi();
  const params = useParams();

  const onSubmit = async (formdata: Task) => {
    const body = {
      date: new Date(formdata.date),
      task: formdata.task,
      color: color,
      schedules: schedules.map(item => ({
        daysBefore: Number(item.daysBefore),
        hour: Number(item.hour?.value),
      })),
    };

    try {
      await createTask(body);
      mutate();
      onClose();
      toast.success("登録に成功しました");
    } catch (e) {
      toast.error(`登録に失敗しました：${e}`);
    }
  };

  const createTask = async (body: PostRequest) => {
    const roomId = params.id;
    await post<PostRequest, PostResponse>(`/api/room/${roomId}`, body);
  };

  const onClose = () => {
    setIsOpen(false);
    reset();
  };
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    schedules,
    setSchedules,
    reset,
    onClose,
    isOpen,
    setIsOpen,
    color,
    setColor,
  };
};
