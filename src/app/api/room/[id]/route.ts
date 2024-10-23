import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { PostRequest } from "@/app/_types/room/[id]/PostRequest";
import { calculateTargetDateTime } from "./_utils/calculateTargetDateTime";
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = await buildPrisma();

  try {
    const taskId = await prisma.$transaction(async prisma => {
      //urlからroomid取得
      const roomUrlId = params.id;
      const roomData = await prisma.room.findUnique({
        where: {
          roomUrlId,
        },
      });
      if (!roomData) {
        return NextResponse.json(
          { message: "ルームが存在しません" },
          { status: 400 }
        );
      }

      //タスクを登録
      const body: PostRequest = await req.json();
      const { date, task } = body;
      const TaskData = await prisma.task.create({
        data: {
          date: date,
          task: task,
        },
      });

      //タスクとルームの中間テーブル
      await prisma.roomTask.create({
        data: {
          roomId: roomData?.id,
          taskId: TaskData?.id,
        },
      });

      //タスクとスケジュールを紐づける中間テーブル
      const notificationData = await prisma.notification.create({
        data: {
          taskId: TaskData.id,
        },
      });

      //通知のスケジュール登録
      await prisma.schedule.createMany({
        data: body.schedules.map(schedule => ({
          daysBefore: schedule.daysBefore,
          hour: schedule.hour,
          datetime: calculateTargetDateTime(
            date,
            schedule.daysBefore,
            schedule.hour
          ),
          notificationId: notificationData.id,
        })),
      });
      return TaskData.id;
    });
    return NextResponse.json({ message: "OK", id: taskId }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const prisma = await buildPrisma();
  try {
    //urlからroomid取得
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

    const taskIds = roomDataWithTaskIds.roomTasks.map(item => item.taskId);
    const tasks = await prisma.notification.findMany({
      where: {
        id: {
          in: taskIds,
        },
      },
      include: {
        schedules: true,
        task: true,
      },
    });

    return Response.json(
      {
        groupName: roomDataWithTaskIds.groupName,
        tasks: tasks.map(item => ({
          taskId: item.taskId,
          date: item.task.date,
          task: item.task.task,
          schedules: item.schedules.map(schedule => ({
            daysBefore: schedule.daysBefore,
            hour: schedule.hour,
          })),
        })),
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ error: e.message }, { status: 400 });
    }
  }
};
