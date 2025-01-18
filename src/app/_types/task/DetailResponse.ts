import { ScheduleType } from "@/app/room/[id]/_types/schedule";
import { Color } from "@prisma/client";
export type DetailResponse = {
  name: string;
  date: Date;
  color: Color;
  schedules: ScheduleType[];
};
