"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Task } from "@/app/_types/room/[id]/IndexResponse";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
import { KeyedMutator } from "swr";
import dayjs from "dayjs";
import { TaskDetailModal } from "./TaskDetailModal";
import { useState } from "react";

const columnHelper = createColumnHelper<Task>();
const columns = [
  columnHelper.accessor("date", {
    header: "日付",
    cell: info => dayjs(info.getValue()).format("YYYY/M/D"),
  }),
  columnHelper.accessor("task", {
    header: "予定",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("schedules", {
    header: "通知設定",
    cell: info => {
      return (
        <div>
          {info.getValue().map((item, index) => {
            return (
              <div
                key={index}
                className=""
              >{`${item.daysBefore}日前:${item.hour}時`}</div>
            );
          })}
        </div>
      );
    },
  }),
];
interface Props {
  taskData: Task[];
  mutate: KeyedMutator<IndexResponse | undefined>;
}

export const TaskIndex: React.FC<Props> = ({ taskData, mutate }) => {
  const table = useReactTable({
    data: taskData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  return (
    <div className="mx-auto pt-10 px-1 w-full">
      <table className="table-fixed mb-10 w-full">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const headerContent = flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                );
                return (
                  <th
                    key={header.id}
                    className={`p-2 text-left font-normal text-xs ${
                      headerContent === "日付"
                        ? "w-[100px]"
                        : headerContent === "通知設定"
                        ? "w-[90px]"
                        : "w-auto"
                    }`}
                  >
                    {headerContent}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b-[1px] border-gray_bg cursor-pointer"
              onClick={() => {
                setSelectedTaskId(row.original.taskId);
                setIsOpen(true);
              }}
            >
              {row.getVisibleCells().map(cell => {
                const columnContent = flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                );
                return (
                  <td key={cell.id} className={`p-1 font-normal text-xs`}>
                    {columnContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <TaskDetailModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedTaskId(null);
        }}
        mutate={mutate}
        taskId={selectedTaskId}
      />
    </div>
  );
};
