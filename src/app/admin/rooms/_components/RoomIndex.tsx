"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRooms } from "../_hooks/useRooms";
import { Room } from "@/app/_types/admin/room/IndexResponse";
const columnHelper = createColumnHelper<Room>();
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("groupName", {
    header: "LINEグループ名",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("apiToken", {
    header: "APItoken",
    cell: info => info.getValue(),
  }),
];

export const RoomIndex: React.FC = () => {
  const { data, isLoading, error } = useRooms();
  const table = useReactTable({
    data: data?.rooms || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="text-center">データ取得中...</div>;
  if (error)
    return <div className="text-center">データの取得に失敗しました</div>;
  if (data?.rooms.length === 0)
    return <div className="text-center">データがありません</div>;
  return (
    <div className="flex justify-center items-center pt-10">
      <table className="table-fixed mb-10">
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
                    className={`p-3 text-left font-normal text-sm min-w-96`}
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
              className="border-b-[1px] border-gray_bg cursor-pointer hover:bg-gray_bg "
              onClick={() => {}}
            >
              {row.getVisibleCells().map(cell => {
                const columnContent = flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                );
                return (
                  <td key={cell.id} className="p-3 font-normal text-sm">
                    {columnContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
