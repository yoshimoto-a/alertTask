"use client";
import { Modal } from "@/app/_components/Modal";
import { faTrashCan, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
import { useApi } from "@/app/_hooks/useApi";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
interface Props {
  mutate: KeyedMutator<IndexResponse | undefined>;
  isOpen: boolean;
  onClose: () => void;
  taskId: number | null;
}
export const TaskDetailModal: React.FC<Props> = ({
  onClose,
  isOpen,
  mutate,
  taskId,
}) => {
  const params = useParams();
  const { del } = useApi();
  const deleteTask = async () => {
    const result = confirm("削除しますか？");
    if (!result) return;
    if (!taskId) return;
    const roomIdInUrl = params?.id;
    try {
      await del<{ message: string }>(`/api/room/${roomIdInUrl}/${taskId}`);
      onClose();
      mutate();
      toast.success("タスクを削除しました");
    } catch (e) {
      toast.error(`削除に失敗しました${e}`);
    }
  };
  return (
    <>
      <Toaster position="top-right" />
      <Modal isOpen={isOpen} onClose={onClose} className="">
        <form className="">
          <div className="flex justify-end">
            <button onClick={onClose}>
              <FontAwesomeIcon icon={faXmarkCircle} className="" />
            </button>
          </div>
          <div className="flex justify-end">
            <button onClick={deleteTask}>
              <FontAwesomeIcon icon={faTrashCan} className="text-2xl" />
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
