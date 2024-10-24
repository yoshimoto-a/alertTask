import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    console.log(req);
    // リクエストのパラメータをそのまま返す
    return NextResponse.json(
      {
        message: "受け取った情報をそのまま返します",
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
