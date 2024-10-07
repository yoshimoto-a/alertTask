import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const prisma = await buildPrisma();
  try {
    const { slug } = params;
    const taskId = Number(slug);
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      return NextResponse.json(
        { message: "タスクが存在しません" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async prisma => {
      // 関連するデータの削除
      await prisma.schedule.deleteMany({
        where: {
          notification: {
            taskId,
          },
        },
      });
      await prisma.notification.deleteMany({
        where: {
          taskId,
        },
      });
      await prisma.roomTask.deleteMany({
        where: {
          taskId,
        },
      });
      await prisma.task.delete({
        where: {
          id: taskId,
        },
      });
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
