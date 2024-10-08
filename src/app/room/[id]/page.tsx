"use client";
import { faCircleXmark, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateButtonWithModal } from "./_components/CreateButtonWithModal";
import { useRoomIndex } from "./_hooks/useRoomIndex";
import { TaskIndex } from "./_components/TaskIndex";
export default function Page() {
  const { isLoading, groupName, tasks, error, mutate } = useRoomIndex();

  if (error)
    return <div className="text-center pt-20">データの取得に失敗しました</div>;
  return (
    <div className="max-w-md mx-auto">
      <div className="mx-2">
        <div className="flex justify-between py-5">
          <h2 className="text-xl">予定一覧</h2>
          <h3 className="">{isLoading ? "読込み中..." : groupName}</h3>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <input
              id="searchWord"
              inputMode="text"
              placeholder="検索"
              type="text"
              className="border-[1px] px-2 rounded-lg py-1"
            />
            <button>
              <FontAwesomeIcon icon={faCalendar} className="px-2" />
            </button>
            <button>
              <FontAwesomeIcon icon={faCircleXmark} className="" />
            </button>
          </div>
          <CreateButtonWithModal mutate={mutate} />
        </div>
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
}
