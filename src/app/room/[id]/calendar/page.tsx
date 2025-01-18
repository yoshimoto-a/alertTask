"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { Value } from "react-calendar/src/shared/types.js";
import { useCalendar } from "./_hooks/useCalendar";
import dayjs from "dayjs";
import { TaskItem } from "./_components/TaskItem";
import { Toaster } from "react-hot-toast";
import { CreateButtonWithModal } from "../_components/CreateButtonWithModal";
import { IndexResponse } from "@/app/_types/room/[id]/calendar/IndexResponse";
import { Button } from "@/app/_components/Button";
import { useRouter, useParams } from "next/navigation";
export default function Page() {
  const [value, setValue] = useState<Value>(new Date());
  const { data, error, mutate } = useCalendar();
  const { push } = useRouter();
  const { id } = useParams();
  if (!data) return <div>読込み中... </div>;
  if (error) return <div>データ取得中にエラー発生</div>;
  const onChange = (nextValue: Value) => {
    setValue(nextValue);
  };

  const showContents = ({ date }: { date: Date }) => {
    const targetTasks = data.tasks.filter(task =>
      dayjs(task.date).isSame(dayjs(date), "day")
    );
    return (
      <div className="pt-1 flex flex-col gap-[2px]">
        {targetTasks.map(task => (
          <TaskItem task={task} key={task.taskId} />
        ))}
      </div>
    );
  };
  return (
    <div className="pt-12 px-5 max-w-md mx-auto">
      <Toaster position="top-center" />
      <div className="flex flex-col items-center justify-center gap-2 ">
        <div className="mt-4 h-9 w-[130px] self-start">
          <Button type="button" onClick={() => push(`/room/${id}`)}>
            一覧に戻る
          </Button>
        </div>

        <Calendar
          onChange={onChange}
          value={value}
          tileContent={showContents}
        />
      </div>
      <div className="fixed bottom-2 right-2">
        <CreateButtonWithModal<IndexResponse> mutate={mutate} />
      </div>
    </div>
  );
}
