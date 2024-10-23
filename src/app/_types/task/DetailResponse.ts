import { ScheduleType } from "@/app/room/[id]/_types/schedule";
export type DetailResponse = {
  name: string;
  date: Date;
  schedules: ScheduleType[];
};
