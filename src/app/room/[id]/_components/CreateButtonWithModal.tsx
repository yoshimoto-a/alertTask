"use client";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@/app/_components/Modal";
import { Schedule } from "./Schedule";
import { Button } from "@/app/_components/Button";
import { KeyedMutator } from "swr";
import { useCreateTask } from "../_hooks/useCreateTask";
import { ColorSelect } from "./ColorSelect";
interface Props<T> {
  mutate: KeyedMutator<T>;
}

export const CreateButtonWithModal = <T,>({ mutate }: Props<T>) => {
  const {
    register,
    onClose,
    handleSubmit,
    errors,
    isSubmitting,
    schedules,
    setSchedules,
    isOpen,
    setIsOpen,
    color,
    setColor,
  } = useCreateTask({ mutate });

  return (
    <div className="flex justify-end pt-2 px-5">
      <button onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faCirclePlus} className="text-4xl" />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} className="">
        <form className="" onSubmit={handleSubmit}>
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
              <ColorSelect color={color} setColor={setColor} />
            </div>
            <Button type="submit">登録</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
