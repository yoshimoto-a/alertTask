import { Color } from "@prisma/client";
import { Schedule } from "./IndexResponse";
export interface PostRequest {
  date: Date;
  task: string;
  color: Color;
  schedules: Schedule[];
}
