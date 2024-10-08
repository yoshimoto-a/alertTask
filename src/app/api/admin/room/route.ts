import { type NextRequest } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { supabase } from "@/app/_utils/supabase";
import { PostRequest } from "@/app/_types/admin/rooms/PostRequest";
import { getGroupName } from "./_utils/getGroupName";
import { randomBytes } from "crypto";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);

  if (error) return Response.json({ status: 401, message: "Unauthorized" });
  const body: PostRequest = await req.json();
  const { lineToken, password } = body;
  try {
    //すでに登録済のトークンではないか確認
    const existingRoom = await prisma.room.findUnique({
      where: {
        apiToken: lineToken,
      },
    });

    if (existingRoom) {
      throw new Error("このapiTokenは既に使用されています。");
    }

    const { groupName } = await getGroupName(lineToken);
    const adminUserData = await prisma.adminUser.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
    });
    if (!adminUserData) throw new Error("ユーザー情報なし");

    //UrlのId生成する
    const buffer = randomBytes(16);
    const roomUrlId = buffer.toString("hex");

    const roomData = await prisma.room.create({
      data: {
        adminUserId: adminUserData.id,
        apiToken: lineToken,
        groupName,
        roomUrlId,
        password,
      },
    });

    return Response.json({ status: "OK", id: roomData.id }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ message: e.message }, { status: 400 });
    }
  }
};

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return Response.json({ status: 401, message: "Unauthorized" });
  try {
    const getUserWithRooms = await prisma.adminUser.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
      include: {
        rooms: true,
      },
    });
    return Response.json(
      {
        rooms: getUserWithRooms?.rooms,
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ error: e.message }, { status: 400 });
    }
  }
};
