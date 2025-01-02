import { NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { dayjs } from "@/app/_utils/dayjs";
import { messagePush } from "./_utils/messagePush";

export const POST = async () => {
  const prisma = await buildPrisma();
  const now = dayjs().tz("Asia/Tokyo");

  const startOfHour = now.startOf("hour").toDate();
  const endOfHour = now.endOf("hour").toDate();

  try {
    const schedules = await prisma.schedule.findMany({
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
                    task: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!schedules || schedules.length === 0) {
      return NextResponse.json({ message: "data is null" }, { status: 200 });
    }
    const groupedRoomsTasks = schedules
      .map(schedule =>
        schedule.notification.task.roomTasks.map(roomTask => ({
          lineId: roomTask.room.lineId,
          taskId: roomTask.task.id,
          task: roomTask.task.task,
          date: dayjs(roomTask.task.date).format("YYYY/MM/DD"),
        }))
      )
      .flat()
      .reduce((acc, { lineId, taskId, task, date }) => {
        if (!acc[lineId]) {
          acc[lineId] = { lineId, data: {} };
        }
        if (!acc[lineId].data[taskId]) {
          acc[lineId].data[taskId] = { task, date };
        }
        return acc;
      }, {} as Record<string, { lineId: string; data: Record<string, { task: string; date: string }> }>);

    const result = await messagePush(
      Object.values(groupedRoomsTasks).map(room => ({
        lineId: room.lineId,
        data: Object.values(room.data),
      }))
    );

    return NextResponse.json({ message: "success", result }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
