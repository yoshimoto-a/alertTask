export type SendMassageResponse = {
  sentMessages: {
    id: number;
    quoteToken?: string;
  }[];
};
