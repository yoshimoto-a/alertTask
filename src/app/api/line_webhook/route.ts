import { NextRequest, NextResponse } from "next/server";
import { WebhookRequest } from "./_types/WebhookRequest";
import { buildPrisma } from "@/app/_utils/prisma";

import { pokeApi } from "./_utils/pokeApi";
import { randomBytes } from "crypto";
export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();

  try {
    const body: WebhookRequest = await req.json();
    const events = body.events;
    console.log(events);

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

    //URLの生成
    const buffer = randomBytes(16);
    const roomUrlId = buffer.toString("hex");
    const roomData = await prisma.room.create({
      data: {
        adminUserId: process.env.ADMIN_USER as string,
        lineId,
        roomUrlId,
        password: pokeName,
      },
    });

    console.log(roomData);

    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
