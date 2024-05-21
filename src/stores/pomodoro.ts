import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePomodoroStore = defineStore('pomodoro', () => {
  const pomodoro = ref(25)
  function setPomodoro(time: number) {
    pomodoro.value = time
  }
  return { pomodoro, setPomodoro }
})
