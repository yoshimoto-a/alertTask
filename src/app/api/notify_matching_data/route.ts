import { NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";

export const GET = async () => {
  const prisma = await buildPrisma();
  try {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();

    const startOfHour = new Date(year, month - 1, day, hour, 0, 0);
    const endOfHour = new Date(year, month - 1, day, hour, 59, 59);
    const scheduleResponse = await prisma.schedule.findMany({
      where: {
        datetime: {
          gte: startOfHour,
          lte: endOfHour,
        },
      },
      include: {
        notification: {
          include: {
            task: {
              include: {
                roomTasks: {
                  include: {
                    room: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!scheduleResponse) {
      return NextResponse.json(
        { message: "通知するデータなし" },
        { status: 204 }
      );
    }

    // const data = scheduleResponse.map(item =>
    //   item.notification.task.roomTasks.map(task => ({
    //     token: task.room.apiToken,
    //     groupName: task.room.groupName,
    //     task: item.notification.task.task,
    //     date: item.notification.task.date,
    //   }))
    // );

    return NextResponse.json(
      { message: "success!", scheduleResponse, data: "" },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
