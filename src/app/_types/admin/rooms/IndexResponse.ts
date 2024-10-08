export interface Room {
  id: string;
  apiToken: string;
  groupName: string;
  roomUrlId: string;
  password: string;
}
export interface IndexResponse {
  rooms: Room[];
}
