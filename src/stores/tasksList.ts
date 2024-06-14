import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { TasksList, Task } from '@/types/types'
import { useSettingsStore } from '@/stores/settings'

export const useTasksListStore = defineStore('tasksList', () => {
  const tasks = reactive<TasksList>(localStorage.pomodoroTasks ? JSON.parse(localStorage.pomodoroTasks) : [])
  const selectedTaskForTimer = ref<Task | null>(tasks[0] ? tasks[0] : null)
  const selectedTaskForAction = ref(null)
  const showEditTaskInput = ref(false)
  const lengthTasks = computed(() => tasks.length)
  const totalTime = computed(() => {
    const pomodoroStore = useSettingsStore()
    return tasks.reduce((time, task) => time + task.pomodoro, 0) * pomodoroStore.$state.pomodoroTime
  })
  const firstTask = computed<Task>(() => tasks[0]) // удалить?
  const orderSelectTaskForTimer = computed<number>(() => tasks.findIndex((task) => task.id === selectedTaskForTimer.value?.id) + 1)

  function selectTaskForTimer(task: Task) {
    selectedTaskForTimer.value = task
  }
  function selectTaskForAction(action) {
    selectedTaskForAction.value = action
  }
  function setShowEditTaskInput(show) {
    showEditTaskInput.value = show;
  }
  function addTask(task: Task) {
    tasks.push(task)
  }
  function deleteTask(goal: string = 'action') {
    const currentGoal = goal === 'action' ? selectedTaskForAction.value.id : selectedTaskForTimer.value.id
    const indexTask = tasks.findIndex((item) => item.id === currentGoal)
    tasks.splice(indexTask, 1)
  }
  function editTask(property: string, action: string, newName: string = '', goal: string = 'action') {
    const currentGoal = goal === 'action' ? selectedTaskForAction.value.id : selectedTaskForTimer.value.id
    const currentTask = tasks.find((item) => item.id === currentGoal)
    if (action === 'increase') {
      currentTask[property]++
    } else if (action === 'decrease' && currentTask[property] > 1) {
      currentTask[property]--
    } else if (action === 'editName') {
      currentTask[property] = newName
    }
  }
  return {
    tasks,
    selectedTaskForTimer,
    selectedTaskForAction,
    showEditTaskInput,
    lengthTasks,
    totalTime,
    firstTask,
    orderSelectTaskForTimer,
    selectTaskForTimer,
    selectTaskForAction,
    setShowEditTaskInput,
    addTask,
    deleteTask,
    editTask
  }
})
