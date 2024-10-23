import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // リクエストのパラメータをそのまま返す
    return NextResponse.json(
      {
        message: "受け取った情報をそのまま返します",
        params: params,
        url: req.url,
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
};
