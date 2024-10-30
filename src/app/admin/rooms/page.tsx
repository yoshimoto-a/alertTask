"use client";
import { useAdminUser } from "../_hooks/useAdminUser";
import { RoomIndex } from "./_components/RoomIndex";
import { NewRoomForm } from "./_components/NewRoomForm";
import { useRooms } from "./_hooks/useRooms";
export default function Page() {
  const { isLoading, email } = useAdminUser();
  const { data, isLoading: roomsIsLoading, error, mutate } = useRooms();

  return (
    <div className="h-screen relative py-5 px-3">
      <h1 className="text-center text-4xl">ルーム一覧</h1>
      <NewRoomForm mutate={mutate} />
      {roomsIsLoading ? (
        <div className="text-center pt-2">データ取得中...</div>
      ) : error ? (
        <div className="text-center pt-2">データの取得に失敗しました</div>
      ) : data && data.rooms.length === 0 ? (
        <div className="text-center pt-2">データがありません</div>
      ) : (
        data && <RoomIndex data={data} mutate={mutate} />
      )}
      <div className="absolute bottom-0">
        ログイン名 : {isLoading ? "" : email}
      </div>
    </div>
  );
}
