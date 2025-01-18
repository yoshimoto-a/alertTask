import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { IndexResponse } from "@/app/_types/room/[id]/calendar/IndexResponse";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const prisma = await buildPrisma();
  try {
    const roomUrlId = params.id;

    const roomDataWithTaskIds = await prisma.room.findUnique({
      where: {
        roomUrlId,
      },
      include: {
        roomTasks: true,
      },
    });
    if (!roomDataWithTaskIds) {
      return NextResponse.json(
        { message: "ルームが存在しません" },
        { status: 400 }
      );
    }
    const taskIds = roomDataWithTaskIds.roomTasks.map(rt => rt.taskId);
    const tasks = await prisma.task.findMany({
      where: {
        id: {
          in: taskIds,
        },
      },
    });

    return NextResponse.json<IndexResponse>(
      {
        tasks: tasks.map(item => ({
          taskId: item.id,
          date: item.date,
          task: item.task,
        })),
      },

      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
