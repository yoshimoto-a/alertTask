"use client";
import { useAdminUser } from "../_hooks/useAdminUser";
import { RoomIndex } from "./_components/RoomIndex";
import { NewRoomForm } from "./_components/NewRoomForm";
import { useRooms } from "./_hooks/useRooms";
export default function Page() {
  const { isLoading, email } = useAdminUser();
  const { data, isLoading: roomsIsLoading, error, mutate } = useRooms();
  if (isLoading) return <div className="text-center">データ取得中...</div>;
  if (error)
    return <div className="text-center">データの取得に失敗しました</div>;
  return (
    <div className="h-screen relative py-5 px-3">
      <h1 className="text-center text-4xl">ルーム一覧</h1>
      <NewRoomForm mutate={mutate} />
      {roomsIsLoading ? (
        <div className="text-center">データ取得中...</div>
      ) : error ? (
        <div className="text-center">データの取得に失敗しました</div>
      ) : data && data.rooms.length === 0 ? (
        <div className="text-center">データがありません</div>
      ) : data ? (
        <RoomIndex data={data} mutate={mutate} />
      ) : null}
      <div className="absolute bottom-0">
        ログイン名 : {isLoading ? "" : email}
      </div>
    </div>
  );
}
