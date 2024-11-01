import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { PutRequest } from "@/app/_types/task/PutRequest";
import { ScheduleType } from "@/app/room/[id]/_types/schedule";
import { calculateTargetDateTime } from "../../room/[id]/_utils/calculateTargetDateTime";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const prisma = await buildPrisma();
  try {
    const { id } = params;
    const taskId = Number(id);
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

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const prisma = await buildPrisma();
  try {
    const { id } = params;
    const taskId = Number(id);
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

    const taskDetail = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        notifications: {
          where: {
            taskId: Number(id),
          },
          select: {
            schedules: {
              select: {
                daysBefore: true,
                hour: true,
              },
            },
          },
        },
      },
    });
    if (!taskDetail) {
      return NextResponse.json(
        { message: "タスクが存在しません" },
        { status: 400 }
      );
    }
    const notification = taskDetail.notifications[0].schedules;
    const schedules: ScheduleType[] = notification.map(item => ({
      daysBefore: item.daysBefore.toString(),
      hour: { value: item.hour, label: `${item.hour}時` },
    }));
    const response = {
      name: taskDetail.task,
      date: taskDetail.date,
      schedules,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = await buildPrisma();
  try {
    const updateTask = await prisma.$transaction(async prisma => {
      //タスクの存在を確認
      const taskId = params.id;
      const existingTask = await prisma.task.findUnique({
        where: {
          id: Number(taskId),
        },
        include: {
          notifications: true,
        },
      });

      if (!existingTask) {
        return NextResponse.json(
          { message: "タスクが存在しません" },
          { status: 400 }
        );
      }

      const notificationId = existingTask.notifications[0]?.id;

      if (!notificationId) {
        return NextResponse.json(
          { message: "通知が存在しません" },
          { status: 400 }
        );
      }

      //タスクを更新
      const body: PutRequest = await req.json();
      const { date, task, schedules } = body;
      const TaskData = await prisma.task.update({
        where: {
          id: Number(taskId),
        },
        data: {
          date,
          task,
        },
      });

      // スケジュールを更新
      await prisma.schedule.deleteMany({
        where: {
          notification: {
            taskId: Number(taskId),
          },
        },
      });

      await prisma.schedule.createMany({
        data: schedules.map(schedule => ({
          daysBefore: schedule.daysBefore,
          hour: schedule.hour,
          notificationId: notificationId,
          datetime: calculateTargetDateTime(
            date,
            schedule.daysBefore,
            schedule.hour
          ),
        })),
      });
      return TaskData.id;
    });
    return NextResponse.json(
      { message: "OK", id: updateTask },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}
