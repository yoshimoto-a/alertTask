export type SendMessageRequest = {
  replyToken: string;
  messages: {
    type: string;
    text: string;
  }[];
};
