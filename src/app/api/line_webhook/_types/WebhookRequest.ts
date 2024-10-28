type WebhookEvent =
  | MessageEvent
  | UnsendEvent
  | FollowEvent
  | UnfollowEvent
  | JoinEvent
  | LeaveEvent
  | MemberJoinedEvent
  | MemberLeftEvent
  | PostbackEvent;

export interface WebhookRequest {
  destination: string;
  events: WebhookEvent[];
}

interface CommonProperties {
  type: string;
  mode: "active" | "standby";
  timestamp: number;
  source: EventSource;
  webhookEventId: string;
  deliveryContext: {
    isRedelivery: boolean;
  };
}

interface EventSource {
  type: "user" | "group" | "room";
  userId?: string;
  groupId?: string;
  roomId?: string;
}

interface MessageEvent extends CommonProperties {
  type: "message";
  replyToken: string;
  message: Message;
}

interface UnsendEvent extends CommonProperties {
  type: "unsend";
  unsend: {
    messageId: string;
  };
}

interface FollowEvent extends CommonProperties {
  type: "follow";
  replyToken: string;
  follow: {
    isUnblocked: boolean;
  };
}

interface UnfollowEvent extends CommonProperties {
  type: "unfollow";
}

interface JoinEvent extends CommonProperties {
  type: "join";
  replyToken: string;
}

interface LeaveEvent extends CommonProperties {
  type: "leave";
}

interface MemberJoinedEvent extends CommonProperties {
  type: "memberJoined";
  replyToken: string;
  joined: {
    members: EventSource[];
  };
}

interface MemberLeftEvent extends CommonProperties {
  type: "memberLeft";
  left: {
    members: EventSource[];
  };
}

interface PostbackEvent extends CommonProperties {
  type: "postback";
  replyToken: string;
  postback: {
    data: string;
    params?: {
      datetime?: string;
      newRichMenuAliasId?: string;
    };
  };
}

type Message = TextMessage | StickerMessage;

interface TextMessage {
  type: "text";
  id: string;
  text: string;
}

interface StickerMessage {
  type: "sticker";
  id: string;
  stickerId: string;
  packageId: string;
  stickerResourceType: "ANIMATION" | "MESSAGE";
  keywords: string[];
  text?: string;
  quoteToken?: string;
}
