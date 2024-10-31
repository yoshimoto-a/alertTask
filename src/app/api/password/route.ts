import { NextRequest, NextResponse } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { PasswordRequest } from "@/app/_types/password/PasswordRequest";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const body: PasswordRequest = await req.json();
    const { password, roomUrlId } = body;

    const room = await prisma.room.findUnique({
      where: {
        roomUrlId,
      },
    });

    if (room?.password === password) {
      return NextResponse.json(
        {
          message: "correct",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "incorrect",
        },
        { status: 200 }
      );
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
