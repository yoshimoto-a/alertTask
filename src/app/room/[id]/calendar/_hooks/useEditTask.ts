import { useState, useEffect } from "react";
import { useTask } from "../../_hooks/useTask";
import { DetailResponse } from "@/app/_types/task/DetailResponse";
export const useEditTask = ({ id }: { id: number }) => {
  const { data, error } = useTask(id);
  const [isOpen, setIsOpen] = useState(false);
  const [taskDetail, setTaskDetail] = useState<DetailResponse | null>(null);

  useEffect(() => {
    if (!data) return;
    setTaskDetail(data);
  }, [data]);
  const handleClick = () => {
    if (!taskDetail) return;
    setIsOpen(true);
  };

  return { handleClick, setIsOpen, isOpen, error, taskDetail };
};
