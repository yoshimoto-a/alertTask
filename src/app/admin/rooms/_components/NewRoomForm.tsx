"use client";
import { Button } from "@/app/_components/Button";
import { useNewRoom } from "../_hooks/useNewRoom";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/admin/rooms/IndexResponse";
import { Modal } from "@/app/_components/Modal";
import { faPlusCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NewRoomForm: React.FC<{
  mutate: KeyedMutator<IndexResponse | undefined>;
}> = ({ mutate }) => {
  const { register, errors, handleSubmit, isSubmitting, setIsOpen, isOpen } =
    useNewRoom(mutate);

  return (
    <div className="flex justify-end pr-24 py-2">
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faPlusCircle} className="text-3xl px-2" />{" "}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="">
        <div
          className="flex justify-end cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faXmarkCircle} className="text-3xl px-2" />
        </div>
        <div className="mx-auto w-1/4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center justify-center"
          >
            <h2 className="text-center text-2xl py-10">新規追加</h2>
            <input
              disabled={isSubmitting}
              id="token"
              inputMode="text"
              placeholder="APIトークン"
              type="text"
              className="border-[1px] px-2 rounded-lg w-full"
              {...register("token")}
            />
            {errors.token && (
              <span className="text-red-500 block text-xs">
                {errors.token.message}
              </span>
            )}
            <input
              disabled={isSubmitting}
              id="password"
              inputMode="text"
              placeholder="合言葉"
              type="text"
              className="border-[1px] px-2 rounded-lg w-full"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 block text-xs pl-2">
                {errors.password.message}
              </span>
            )}
            <Button>登録する</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
