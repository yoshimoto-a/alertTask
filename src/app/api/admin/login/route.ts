import { type NextRequest } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { supabase } from "@/app/_utils/supabase";
import { PostRequest } from "@/app/_types/admin/login/PostRequest";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);

  if (error) return Response.json({ status: 401, message: "Unauthorized" });
  const body: PostRequest = await req.json();
  const { email } = body;
  try {
    //登録があるかどうか確認する
    const getUser = await prisma.adminUser.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
    });
    if (getUser) {
      //既に登録あれば何もしない
      return Response.json({ status: "OK", isNewUser: false }, { status: 200 });
    }
    await prisma.adminUser.create({
      data: {
        supabaseUserId: data.user.id,
        email,
      },
    });

    return Response.json({ status: "OK", isNewUser: true }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ message: e.message }, { status: 400 });
    }
  }
};
