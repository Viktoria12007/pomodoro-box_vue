import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { TasksList, Task } from '@/types/types'
import { usePomodoroStore } from '@/stores/pomodoro'

export const useTasksListStore = defineStore('tasksList', () => {
  const tasks = reactive<TasksList>(localStorage.pomodoroTasks ? JSON.parse(localStorage.pomodoroTasks) : [])
  const selectedTask = ref<Task | null>(null)
  const lengthTasks = computed(() => tasks.length)
  const totalTime = computed(() => {
    const pomodoroStore = usePomodoroStore()
    return tasks.reduce((time, task) => time + task.pomodoro, 0) * pomodoroStore.$state.pomodoro
  })
  const firstTask = computed<Task>(() => tasks[0])

  function selectTask(task: Task) {
    selectedTask.value = task
  }
  function addTask(task: Task) {
    tasks.push(task)
  }
  function deleteTask() {
    console.debug('deleteTask')
    const indexTask = tasks.findIndex((item) => item.id === selectedTask.value.id)
    tasks.splice(indexTask, 1)
  }
  function editTask(key: string, value: string | number) {
    console.debug('editTask')
    const currentTask = tasks.find((item) => item.id === selectedTask.value.id)
    if (value === 'increase') {
      currentTask[key]++
    } else if (value === 'decrease' && currentTask[key] > 1) {
      currentTask[key]--
    }
  }
  return {
    tasks,
    selectedTask,
    lengthTasks,
    totalTime,
    firstTask,
    selectTask,
    addTask,
    deleteTask,
    editTask
  }
})
