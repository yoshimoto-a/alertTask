"use client";
import { faCirclePlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@/app/_components/Modal";
import { useState } from "react";
import { Schedule } from "./Schedule";
import { ScheduleType } from "../_types/schedule";
import { useApi } from "@/app/_hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { PostRequest } from "@/app/_types/room/[id]/PostRequest";
import { PostResponse } from "@/app/_types/room/[id]/PostResponse";
import { useParams } from "next/navigation";
import { Button } from "@/app/_components/Button";
import toast, { Toaster } from "react-hot-toast";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
interface Task {
  date: Date;
  task: string;
}
interface Props {
  mutate: KeyedMutator<IndexResponse | undefined>;
}
export const CreateButtonWithModal: React.FC<Props> = ({ mutate }) => {
  const defaultSchedule = [
    { daysBefore: "1", hour: { value: 20, label: "20時" } },
  ];
  const [schedules, setSchedules] = useState<ScheduleType[]>(defaultSchedule);
  const { post } = useApi();
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
  const onClose = () => {
    setIsOpen(false);
    reset();
    setSchedules(defaultSchedule);
  };
  const onSubmit = async (formdata: Task) => {
    const roomIdInUrl = params?.id;
    try {
      const dateObject = new Date(formdata.date);
      if (isNaN(dateObject.getTime())) {
        throw new Error("無効な日付です");
      }
      await post<PostRequest, PostResponse>(`/api/room/${roomIdInUrl}`, {
        date: dateObject,
        task: formdata.task,
        schedules: schedules.map(item => ({
          daysBefore: Number(item.daysBefore),
          hour: Number(item.hour?.value),
        })),
      });
      mutate();
      onClose();
      toast.success("登録に成功しました");
    } catch (e) {
      toast.error(`登録に失敗しました：${e}`);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <button onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faCirclePlus} className="" />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} className="">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            <button onClick={onClose}>
              <FontAwesomeIcon icon={faXmarkCircle} className="" />
            </button>
          </div>
          <div className="max-w-[300px] mx-auto">
            <h2 className="text-center text-xl pb-5">新規データ追加</h2>
            <div className="flex flex-col gap-3 pb-4">
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
                inputMode="text"
                placeholder="タスク"
                type="text"
                className="bg-custom-gray py-2 px-3 mb-1 text-gray-700 leading-tight w-full border-[1px] rounded-lg"
                {...register("task")}
              />
              {errors.task && (
                <span className="text-red-500 block text-xs">
                  {errors.task.message}
                </span>
              )}
              <Schedule schedules={schedules} setSchedules={setSchedules} />
            </div>
            <Button type="submit">登録</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
