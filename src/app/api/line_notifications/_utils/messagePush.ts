import { fetcher } from "../../_utils/fetcher";
import { RoomsTasks } from "../_types/RoomsTasks";
import { PushResponse, sentMessage } from "../_types/PushResponse";
import { PushRequest } from "../_types/PushRequest";
export const messagePush = async (roomsTasks: RoomsTasks[]) => {
  const resposeMessages: sentMessage[] = [];
  const endpoint = "https://api.line.me/v2/bot/message/push";
  try {
    for (const roomTask of roomsTasks) {
      const text = roomTask.data
        .map(task => `日付:${task.date}\n予定:${task.task}\n`)
        .join("\n");
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
        },
        body: {
          to: roomTask.lineId,
          messages: [
            {
              type: "text",
              text,
            },
          ],
        },
      };
      //1つ失敗しても次のline通知したいのでここでもtry-catchいれとく
      try {
        const resp: PushResponse = await fetcher<PushResponse, PushRequest>(
          endpoint,
          options
        );
        if (resp.sentMessages.length > 0) {
          const { id, quoteToken } = resp.sentMessages[0];
          resposeMessages.push({ id, quoteToken });
        }
      } catch (e) {
        console.error(e);
      }
    }
  } catch (e) {
    console.error(e);
  }
  return resposeMessages;
};
