import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { PostRequest } from "@/app/_types/room/[id]/PostRequest";
import { calculateTargetDateTime } from "./_utils/calculateTargetDateTime";
import { dayjs } from "@/app/_utils/dayjs";
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
      const { date, task, schedules } = body;
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
        data: schedules.map(schedule => ({
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

//コメントアウトしているのはページネーション実装するときに使う
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

    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const searchword = url.searchParams.get("keyword");
    // const page = url.searchParams.get("page");
    console.log(searchword);
    //初期設定する
    const fromDate = from
      ? dayjs.tz(from).startOf("day").toDate()
      : dayjs.tz().startOf("day").toDate();
    const toDate = to ? dayjs.tz(to).endOf("day").toDate() : null;

    // const pageSize = 30;
    // const pageNumber = page ? parseInt(page, 10) : 1;
    const taskIds = roomDataWithTaskIds.roomTasks.map(item => item.taskId);
    const tasks = await prisma.notification.findMany({
      where: {
        id: {
          in: taskIds,
        },
        task: {
          date: {
            gte: fromDate,
            ...(toDate && { lte: toDate }),
          },
          ...(searchword ? { task: { contains: searchword } } : {}),
        },
      },
      include: {
        schedules: true,
        task: true,
      },
      orderBy: {
        task: {
          date: "asc",
        },
      },
      // skip: (pageNumber - 1) * pageSize,
      // take: pageSize,
    });
    return NextResponse.json(
      {
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
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
