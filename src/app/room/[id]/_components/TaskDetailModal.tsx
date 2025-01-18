"use client";
import { Modal } from "@/app/_components/Modal";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
import { IndexResponse as calendarResponse } from "@/app/_types/room/[id]/calendar/IndexResponse";
import { Schedule } from "./Schedule";
import { Button } from "@/app/_components/Button";
import { useEditTask } from "../_hooks/useEditTask";
import { useTask } from "../_hooks/useTask";

interface Props {
  mutate: KeyedMutator<IndexResponse | calendarResponse>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  taskId: number;
}
export const TaskDetailModal: React.FC<Props> = ({
  setIsOpen,
  isOpen,
  mutate,
  taskId,
}) => {
  const { data } = useTask(taskId);
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    schedules,
    setSchedules,
    deleteTask,
  } = useEditTask({ mutate, taskId, setIsOpen, data });

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="">
      <form
        className=""
        onSubmit={async formData => {
          await handleSubmit(formData);
        }}
      >
        <div className="max-w-[300px] mx-auto">
          <h2 className="text-center text-xl pb-5">編集</h2>
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

      <div className="flex justify-end">
        <button onClick={deleteTask} type="button">
          <FontAwesomeIcon icon={faTrashCan} className="text-2xl" />
        </button>
      </div>
    </Modal>
  );
};
