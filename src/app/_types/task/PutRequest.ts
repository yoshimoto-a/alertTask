import { Schedule } from "../room/[id]/IndexResponse";
export interface PutRequest {
  date: Date;
  task: string;
  schedules: Schedule[];
}
