import { Schedule } from "./IndexResponse";
export interface PostRequest {
  date: Date;
  task: string;
  schedules: Schedule[];
}
