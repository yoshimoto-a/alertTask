"use client";
import { SeachForm } from "./SeachForm";
import { CreateButtonWithModal } from "./CreateButtonWithModal";
import { useRoomIndex } from "../_hooks/useRoomIndex";
import { TaskIndex } from "../_components/TaskIndex";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/app/_components/Button";

export const RoomIndex: React.FC = () => {
  const {
    isLoading,
    tasks,
    error,
    mutate,
    searchDate,
    setSearchKeyword,
    // setCurrentPage,
    setSearchDate,
  } = useRoomIndex();
  const { id } = useParams();
  const { push } = useRouter();
  if (error)
    return <div className="text-center pt-20">データの取得に失敗しました</div>;
  return (
    <div className="max-w-md mx-auto relative px-2">
      <div className="mx-2 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl py-5">予定一覧</h2>
        </div>
        <div className="flex justify-between items-center gap-2 w-full pr-1">
          <Button type="button" onClick={() => push(`/room/${id}/calendar`)}>
            <span className="pr-2">カレンダー</span>
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-2xl text-white"
            />
          </Button>
          <SeachForm
            searchDate={searchDate}
            setSearchDate={setSearchDate}
            setSearchKeyword={setSearchKeyword}
          />
        </div>

        {isLoading ? (
          <div className="text-center pt-20">読込み中...</div>
        ) : tasks ? (
          <TaskIndex mutate={mutate} taskData={tasks} />
        ) : (
          <div className="text-center pt-20">データがありません</div>
        )}
      </div>
      <div className="fixed bottom-2 right-2">
        <CreateButtonWithModal<IndexResponse> mutate={mutate} />
      </div>
    </div>
  );
};
