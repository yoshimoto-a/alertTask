import { type NextRequest } from "next/server";
import { buildPrisma } from "@/app/_utils/prisma";
import { supabase } from "@/app/_utils/supabase";

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
    return Response.json({ email: getUser?.email }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ error: e.message }, { status: 400 });
    }
  }
};
