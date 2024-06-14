export interface Task {
  id: number | string,
  name: string,
  pomodoro: number
}

export type TasksList = Task[]

export interface CoordsDropdown {
  top?: number,
  left?: number,
}
