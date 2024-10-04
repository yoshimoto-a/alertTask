"use client";
import { useAdminUser } from "../_hooks/useAdminUser";
import { RoomIndex } from "./_components/RoomIndex";
import { NewRoomForm } from "./_components/NewRoomForm";
export default function Page() {
  const { isLoading, email } = useAdminUser();
  return (
    <div className="h-screen relative py-5 px-3">
      <h1 className="text-center text-4xl">ルーム一覧</h1>
      <NewRoomForm />
      <RoomIndex />
      <div className="absolute bottom-0">
        ログイン名 : {isLoading ? "" : email}
      </div>
    </div>
  );
}
