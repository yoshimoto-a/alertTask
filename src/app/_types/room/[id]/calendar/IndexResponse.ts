import { Color } from "@prisma/client";

export type Task = {
  taskId: number;
  date: Date;
  task: string;
  color: Color;
};
export type IndexResponse = { tasks: Task[] };
