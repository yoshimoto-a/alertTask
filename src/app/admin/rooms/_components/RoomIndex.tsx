"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Room } from "@/app/_types/admin/room/IndexResponse";
import { IndexResponse } from "@/app/_types/admin/room/IndexResponse";
import { faTrash, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApi } from "@/app/_hooks/useApi";
import { KeyedMutator } from "swr";
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
interface Props {
  data: IndexResponse;

  mutate: KeyedMutator<IndexResponse | undefined>;
}

export const RoomIndex: React.FC<Props> = ({ data, mutate }) => {
  const table = useReactTable({
    data: data.rooms || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const { del } = useApi();
  const deleteRoom = async (id: string) => {
    const result = confirm("削除しますか？");
    if (!result) return;
    try {
      await del(`/api/admin/room/${id}`);
      mutate();
    } catch (e) {
      alert(e);
    }
  };

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
              <th>
                <FontAwesomeIcon icon={faTrash} className="text-sm px-2" />
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b-[1px] border-gray_bg hover:bg-gray_bg "
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
              <td
                onClick={() => {
                  deleteRoom(row.getValue("id"));
                }}
                className="cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-sm px-2"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
