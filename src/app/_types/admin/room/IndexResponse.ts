export interface Room {
  id: string;
  apiToken: string;
  groupName: string;
}
export interface IndexResponse {
  rooms: Room[];
}
