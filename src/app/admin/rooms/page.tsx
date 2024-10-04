"use client";
import { useAdminUser } from "../_hooks/useAdminUser";
import { RoomIndex } from "./_components/RoomIndex";
import { useNewRoom } from "./_hooks/useNewRoom";
import { Button } from "@/app/_components/Button";
export default function Page() {
  const { isLoading, email } = useAdminUser();
  const { register, errors, handleSubmit, isSubmitting } = useNewRoom();
  return (
    <div className="h-screen relative py-5 px-3">
      <h1 className="text-center text-4xl">ルーム一覧</h1>
      <div className="flex justify-end pr-5 py-2">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              disabled={isSubmitting}
              id="token"
              inputMode="text"
              placeholder="APIトークン"
              type="text"
              className="border-[1px] px-2 rounded-lg"
              {...register("token")}
            />
            <div className="w-24">
              <Button>登録する</Button>
            </div>
          </div>
          <div>
            {errors.token && (
              <span className="text-red-500 block text-xs pl-2">
                {errors.token.message}
              </span>
            )}
          </div>
        </form>
      </div>
      <RoomIndex></RoomIndex>
      <div className="absolute bottom-0">
        ログイン名 : {isLoading ? "" : email}
      </div>
    </div>
  );
}
