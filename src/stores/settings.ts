import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const pomodoroTime = ref<number>(1) // 25
  const shortBreakTime = ref<number>(1) // 5
  const longBreakTime = ref<number>(2) // 15
  const frequencyLongBreak = ref<number>(2) // 4
  const onNotifications = ref<boolean>(true) // true
  // const pomodoro = ref(0)
  function setPomodoroTime(time: number) {
    pomodoroTime.value = time
  }
  function setShortBreakTime(time: number) {
    shortBreakTime.value = time
  }
  function setLongBreakTime(time: number) {
    longBreakTime.value = time
  }
  function setFrequencyLongBreak(time: number) {
    frequencyLongBreak.value = time
  }
  function setOnNotifications(flag: boolean) {
    onNotifications.value = flag
  }
  // function setPomodoro(quantity: number) {
  //   pomodoro.value = quantity
  // }
  return {
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    frequencyLongBreak,
    setFrequencyLongBreak,
    onNotifications,
    setOnNotifications
    // pomodoro,
    // setPomodoro,
  }
})
