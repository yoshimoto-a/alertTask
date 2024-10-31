export type sentMessage = {
  id: string;
  quoteToken: string;
};

export type PushResponse = {
  sentMessages: sentMessage[];
};
