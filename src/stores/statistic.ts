import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatisticStore = defineStore('statistic', () => {
  const pomodoros = ref(0)
  const resolveIncreasePomodoros = ref(false)

  function setPomodoros(count: number) {
    pomodoros.value += count
  }
  function setResolveIncreasePomodoros(flag: boolean) {
    resolveIncreasePomodoros.value = flag
  }
  return {
    pomodoros,
    setPomodoros,
    resolveIncreasePomodoros,
    setResolveIncreasePomodoros,
  }
})
