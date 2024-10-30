export interface Room {
  id: string;
  lineId: string;
  roomUrlId: string;
  password: string;
}
export interface IndexResponse {
  rooms: Room[];
}
