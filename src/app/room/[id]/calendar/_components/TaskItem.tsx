import { Task } from "@/app/_types/room/[id]/calendar/IndexResponse";
import { useEditTask } from "../_hooks/useEditTask";
import { TaskDetailModal } from "../../_components/TaskDetailModal";
import { useCalendar } from "../_hooks/useCalendar";
import { IndexResponse } from "@/app/_types/room/[id]/calendar/IndexResponse";
import { getColor } from "../_utils/getColor";
interface Props {
  task: Task;
}
export const TaskItem: React.FC<Props> = ({ task }) => {
  const { handleClick, isOpen, setIsOpen } = useEditTask({
    id: task.taskId,
  });
  const { mutate } = useCalendar();
  const bgColor = `bg-${getColor(task.color)}`;
  return (
    <div>
      <div
        onClick={handleClick}
        className={`px-[2px] text-[6px] text-left tracking-tighter text-white line-clamp-1 rounded-sm ${bgColor}`}
      >
        {task.task}
      </div>
      <TaskDetailModal<IndexResponse>
        mutate={mutate}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        taskId={task.taskId}
      />
    </div>
  );
};
