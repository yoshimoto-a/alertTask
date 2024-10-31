export type PushRequest = {
  to: string;
  messages: {
    type: string;
    text: string;
  }[];
};
