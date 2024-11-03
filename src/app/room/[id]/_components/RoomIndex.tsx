"use client";
import { SeachForm } from "./SeachForm";
import { CreateButtonWithModal } from "./CreateButtonWithModal";
import { useRoomIndex } from "../_hooks/useRoomIndex";
import { TaskIndex } from "../_components/TaskIndex";
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
  if (error)
    return <div className="text-center pt-20">データの取得に失敗しました</div>;
  return (
    <div className="max-w-md mx-auto">
      <div className="mx-2 w-full">
        <h2 className="text-xl py-5">予定一覧</h2>

        <div className="flex justify-end items-center w-full px-5">
          <SeachForm
            searchDate={searchDate}
            setSearchDate={setSearchDate}
            setSearchKeyword={setSearchKeyword}
          />
        </div>
        <CreateButtonWithModal mutate={mutate} />
        {isLoading ? (
          <div className="text-center pt-20">読込み中...</div>
        ) : tasks ? (
          <TaskIndex mutate={mutate} taskData={tasks} />
        ) : (
          <div className="text-center pt-20">データがありません</div>
        )}
      </div>
    </div>
  );
};
