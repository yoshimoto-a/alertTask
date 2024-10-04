"use client";
import { Button } from "@/app/_components/Button";
import { useNewRoom } from "../_hooks/useNewRoom";
export const NewRoomForm: React.FC = () => {
  const { register, errors, handleSubmit, isSubmitting } = useNewRoom();

  return (
    <div className="flex justify-end pr-24 py-2">
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
  );
};
