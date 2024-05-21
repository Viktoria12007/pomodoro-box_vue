export interface Task {
  id: number | string,
  name: string,
  pomodoro: number
}

export type ListTasks = Task[]
