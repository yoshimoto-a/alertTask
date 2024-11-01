import { dayjs } from "@/app/_utils/dayjs";
export const calculateTargetDateTime = (
  date: Date,
  daysBefore: number,
  hour: number
) => {
  const targetDate = dayjs
    .tz(date, "Asia/Tokyo")
    .subtract(daysBefore, "day")
    .hour(hour);

  return targetDate.toDate();
};
