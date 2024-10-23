import { SingleValue } from "react-select";

export interface ScheduleType {
  daysBefore: string;
  hour: SingleValue<{ value: number; label: string }>;
}
