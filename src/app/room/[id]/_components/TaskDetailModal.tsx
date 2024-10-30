"use client";
import { Modal } from "@/app/_components/Modal";
import { faTrashCan, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
import React, { useEffect } from "react";
import { Schedule } from "./Schedule";
import { Button } from "@/app/_components/Button";
import { useControlTask } from "../_hooks/useControlTask";
import { useTask } from "../_hooks/useTask";
import dayjs from "dayjs";

interface Props {
  mutate: KeyedMutator<IndexResponse>;
  isOpen: boolean;
  closeModal: () => void;
  taskId: number;
}
export const TaskDetailModal: React.FC<Props> = ({
  closeModal,
  isOpen,
  mutate,
  taskId,
}) => {
  const { data } = useTask(taskId);
  const {
    register,
    reset,
    handleSubmit,
    errors,
    isSubmitting,
    schedules,
    setSchedules,
    deleteTask,
  } = useControlTask(mutate, taskId, data);
  useEffect(() => {
    if (data) {
      console.log(dayjs(data.date).format("YYYY-MM-DD"));
      setSchedules(data.schedules);
    }
  }, [data, setSchedules]);

  const onClose = () => {
    closeModal();
    reset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="">
        {data && (
          <form
            className=""
            onSubmit={async formData => {
              await handleSubmit(formData);
              onClose();
            }}
          >
            <div className="flex justify-end">
              <button onClick={onClose}>
                <FontAwesomeIcon icon={faXmarkCircle} className="" />
              </button>
            </div>
            <div className="max-w-[300px] mx-auto">
              <h2 className="text-center text-xl pb-5">編集</h2>
              <div className="flex flex-col gap-3 pb-4">
                <input
                  id="date"
                  type="date"
                  disabled={isSubmitting}
                  placeholder="日付"
                  defaultValue={dayjs(data.date).format("YYYY-MM-DD")}
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
                  defaultValue={data.name}
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
        )}

        <div className="flex justify-end">
          <button
            onClick={async () => {
              await deleteTask();
              onClose();
            }}
            type="button"
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-2xl" />
          </button>
        </div>
      </Modal>
    </>
  );
};
