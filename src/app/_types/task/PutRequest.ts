import { Color } from "@prisma/client";
import { Schedule } from "../room/[id]/IndexResponse";
export interface PutRequest {
  date: Date;
  task: string;
  color: Color;
  schedules: Schedule[];
}
