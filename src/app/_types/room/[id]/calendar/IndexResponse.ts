export type Task = {
  taskId: number;
  date: Date;
  task: string;
};
export type IndexResponse = { tasks: Task[] };
