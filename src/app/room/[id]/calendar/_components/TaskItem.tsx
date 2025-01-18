import { Task } from "@/app/_types/room/[id]/calendar/IndexResponse";
import { useEditTask } from "../_hooks/useEditTask";
import { TaskDetailModal } from "../../_components/TaskDetailModal";
import { useCalendar } from "../_hooks/useCalendar";
interface Props {
  task: Task;
}
export const TaskItem: React.FC<Props> = ({ task }) => {
  const { handleClick, isOpen, setIsOpen } = useEditTask({
    id: task.taskId,
  });
  const { mutate } = useCalendar();
  return (
    <>
      <div
        onClick={handleClick}
        className="px-[2px] text-[6px] text-left tracking-tighter bg-slate-600 text-white line-clamp-1 rounded-sm"
      >
        {task.task}
      </div>
      <TaskDetailModal
        mutate={mutate}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        taskId={task.taskId}
      />
    </>
  );
};
