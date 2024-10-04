import { type NextRequest } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { supabase } from "@/app/_utils/supabase";
import { PostRequest } from "@/app/_types/admin/room/PostRequest";
import { getGroupName } from "./_utils/getGroupName";
export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);

  if (error) return Response.json({ status: 401, message: "Unauthorized" });
  const body: PostRequest = await req.json();
  const { lineToken } = body;
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
    const roomData = await prisma.room.create({
      data: {
        adminUserId: adminUserData.id,
        apiToken: lineToken,
        groupName,
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
    const getUser = await prisma.adminUser.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
    });
    const rooms = await prisma.room.findMany({
      where: {
        adminUserId: getUser?.id,
      },
    });
    return Response.json(
      {
        rooms,
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ error: e.message }, { status: 400 });
    }
  }
};
