import { NextRequest, NextResponse } from "next/server";
import { WebhookRequest } from "./_types/WebhookRequest";
import { buildPrisma } from "@/app/_utils/prisma";
import { sendMassage } from "./_utils/sendMassage";
import { pokeApi } from "./_utils/pokeApi";
import { randomBytes } from "crypto";
export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();

  try {
    const body: WebhookRequest = await req.json();
    const events = body.events;

    const joinEvent = events.find(event => event.type === "join");

    if (!joinEvent)
      return NextResponse.json(
        {
          message: "参加イベントじゃない",
        },
        { status: 200 }
      );

    const { groupId, roomId, userId } = joinEvent.source;
    const lineId = groupId || roomId || userId;
    if (!lineId) throw new Error("IDの取得が出来ませんでした");
    //合言葉の生成をする
    const pokeName = await pokeApi();
    //prismaの登録確認

    //URLの生成
    const buffer = randomBytes(16);
    const roomUrlId = buffer.toString("hex");

    await prisma.room.create({
      data: {
        adminUserId: process.env.ADMIN_USER as string,
        lineId,
        roomUrlId,
        password: pokeName,
      },
    });
    const resp = await sendMassage(joinEvent.replyToken, roomUrlId, pokeName);
    console.log(resp);
    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
