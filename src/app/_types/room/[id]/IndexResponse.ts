export interface Schedule {
  daysBefore: number;
  hour: number;
}

export interface Task {
  taskId: number;
  date: Date;
  task: string;
  schedules: Schedule[];
}

export interface IndexResponse {
  groupName: string;
  tasks: Task[];
}
