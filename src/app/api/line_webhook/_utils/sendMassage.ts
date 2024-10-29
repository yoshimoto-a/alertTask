import { fetcher } from "../../_utils/fetcher";
import { SendMassageResponse } from "../_types/SendMassageResponse";
import { SendMessageRequest } from "../_types/SendMessageRequest";
export const sendMassage = async (
  replyToken: string,
  roomId: string,
  password: string
) => {
  const endpoint = "https://api.line.me/v2/bot/message/reply";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
    },
    body: {
      replyToken,
      messages: [
        {
          type: "text",
          text: `予定を登録するページのURL：${process.env.NEXT_PUBLIC_APP_URL}/${roomId}\n合言葉：${password}`,
        },
      ],
    },
  };
  try {
    const resp = await fetcher<SendMassageResponse, SendMessageRequest>(
      endpoint,
      options
    );
    return resp.sentMessages;
  } catch (error) {
    console.error(`Error fetching data for ID ${roomId}:`, error);
    throw new Error("LINE応答に失敗しました");
  } finally {
  }
};
