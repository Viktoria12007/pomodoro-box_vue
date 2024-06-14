import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const pomodoroTime = ref(1)
  const breakTime = ref(1)
  const pomodoro = ref(0)
  function setPomodoroTime(time: number) {
    pomodoroTime.value = time
  }
  function setBreakTime(time: number) {
    breakTime.value = time
  }
  function setPomodoro(quantity: number) {
    pomodoro.value = quantity
  }
  return {
    pomodoroTime,
    setPomodoroTime,
    breakTime,
    setBreakTime,
    pomodoro,
    setPomodoro,
  }
})
