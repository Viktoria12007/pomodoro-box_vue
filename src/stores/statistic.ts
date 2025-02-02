import { defineStore } from 'pinia'
import { reactive, ref, watch, computed } from 'vue'

export const useStatisticStore = defineStore('statistic', () => {
  const millisecondsInWeek = 604800000
  const millisecondsInDay = 86400000
  const monday = 1

  const selectedWeek = ref({ value: 'thisWeek', text: 'Эта неделя' })
  const wonPomodoros = reactive([])
  const shortLongBreaks = reactive([])
  const stopsPauses = reactive([])
  const workTimesTimer = reactive(localStorage.pomodoroWorkTimes ? JSON.parse(localStorage.pomodoroWorkTimes) : [])
  const resolveWinPomodoro = ref(true)
  const selectedDay = ref<number>(new Date().getDay())

  function selectWeek(weekObject) {
    selectedWeek.value = weekObject
  }
  function addWonPomodoro() {
    wonPomodoros.push({ start: Date.now() })
  }
  function addShortLongBreak() {
    shortLongBreaks.push({ start: Date.now() })
  }
  function setEndForLastBreak() {
    if (shortLongBreaks[shortLongBreaks.length - 1] && !shortLongBreaks[shortLongBreaks.length - 1].end) {
      shortLongBreaks[shortLongBreaks.length - 1].end = Date.now()
    }
  }
  function addStopPause() {
    stopsPauses.push({ start: Date.now() })
  }
  function addWorkTimeTimer() {
    workTimesTimer.push({ start: Date.now() })
  }
  function setEndForLastWorkTime() {
    if (workTimesTimer[workTimesTimer.length - 1] && !workTimesTimer[workTimesTimer.length - 1].end) {
      workTimesTimer[workTimesTimer.length - 1].end = Date.now()
    }
  }
  function setResolveWinPomodoro(flag: boolean) {
    resolveWinPomodoro.value = flag
  }
  function selectDay(day) {
    selectedDay.value = day
  }
  function checkDayWeek(baseWeek, timeObject, key) {
    switch (new Date(timeObject.start).getDay()) {
      case 0:
        baseWeek[6][key] += (timeObject.end ?? 0 - timeObject.start) / 1000 / 60
        break
      case 1:
        baseWeek[0][key] += (timeObject.end ?? 0 - timeObject.start) / 1000 / 60
        break
      case 2:
        baseWeek[1][key] += (timeObject.end ?? 0 - timeObject.start) / 1000 / 60
        break
      case 3:
        baseWeek[2][key] += (timeObject.end ?? 0 - timeObject.start) / 1000 / 60
        break
      case 4:
        baseWeek[3][key] += (timeObject.end ?? 0 - timeObject.start) / 1000 / 60
        break
      case 5:
        baseWeek[4][key] += (timeObject.end ?? 0 - timeObject.start) / 1000 / 60
        break
      default:
        baseWeek[5][key] += Math.abs((timeObject.end ?? 0 - timeObject.start) / 1000 / 60)
    }
  }

  const startCurrentWeek = computed(() => {
    const currentDay = new Date().getDay()
    return new Date(Date.now() - ((currentDay ? currentDay : 7) - monday) * millisecondsInDay).setHours(0, 0, 0) // milliseconds
  })
  const workTimes = computed(() => {
    let filteredWorkTimes;
    if (selectedWeek.value.value === 'thisWeek') {
      filteredWorkTimes = workTimesTimer.filter((timeObject) => timeObject.start >= startCurrentWeek.value) // milliseconds
    } else if (selectedWeek.value.value === 'lastWeek') {
      filteredWorkTimes = workTimesTimer.filter((timeObject) => timeObject.start >= startCurrentWeek.value - millisecondsInWeek && timeObject.start < startCurrentWeek.value)
    } else {
      filteredWorkTimes = workTimesTimer.filter((timeObject) => timeObject.start >= startCurrentWeek.value - (millisecondsInWeek * 2) && timeObject.start < startCurrentWeek.value - millisecondsInWeek)
    }
    return filteredWorkTimes
    // return filteredWorkTimes.map((item) => {
    //   return { start: item.start, additionalObject: { workTime: (item.end - item.start) / 1000 / 60 } }
    // })
  })
  const filteredWonPomodoros = computed(() => {
    let filteredWonPomodoros;
    if (selectedWeek.value.value === 'thisWeek') {
      filteredWonPomodoros = wonPomodoros.filter((timeObject) => timeObject.start >= startCurrentWeek.value) // milliseconds
    } else if (selectedWeek.value.value === 'lastWeek') {
      filteredWonPomodoros = wonPomodoros.filter((timeObject) => timeObject.start >= startCurrentWeek.value - millisecondsInWeek && timeObject.start < startCurrentWeek.value)
    } else {
      filteredWonPomodoros = wonPomodoros.filter((timeObject) => timeObject.start >= startCurrentWeek.value - (millisecondsInWeek * 2) && timeObject.start < startCurrentWeek.value - millisecondsInWeek)
    }
    return filteredWonPomodoros
  })
  const workTimesSelectedWeek = computed(() => {
    const baseAdditionalProperties = { workTime: 0, wonPomodoros: 0 }
    const baseWeek = [{ numberDay: 1, ...baseAdditionalProperties }, { numberDay: 2, ...baseAdditionalProperties }, { numberDay: 3, ...baseAdditionalProperties }, { numberDay: 4, ...baseAdditionalProperties }, { numberDay: 5, ...baseAdditionalProperties }, { numberDay: 6, ...baseAdditionalProperties }, { numberDay: 0, ...baseAdditionalProperties }]
    const baseWeek1 = workTimes.value.reduce((acc, curr) => { // minutes
      checkDayWeek(acc, curr, 'workTime')
      return acc
    }, baseWeek)
    const baseWeek2 = filteredWonPomodoros.value.reduce((acc, curr) => {
      checkDayWeek(acc, curr, 'wonPomodoros')
      return acc
    }, baseWeek1)
    return baseWeek2
  })
  const selectedDayObject = computed(() => workTimesSelectedWeek.value.find(item => item.numberDay === selectedDay.value))

  watch(workTimesTimer, (n) => {
    localStorage.pomodoroWorkTimes = JSON.stringify(n)
  })
  watch(wonPomodoros, (n) => {
    localStorage.wonPomodoros = JSON.stringify(n)
  })

  return {
    selectedWeek,
    wonPomodoros,
    shortLongBreaks,
    stopsPauses,
    workTimesTimer,
    resolveWinPomodoro,
    selectedDay,
    workTimes,
    workTimesSelectedWeek,
    selectedDayObject,
    selectWeek,
    addWonPomodoro,
    addShortLongBreak,
    setEndForLastBreak,
    addStopPause,
    addWorkTimeTimer,
    setEndForLastWorkTime,
    setResolveWinPomodoro,
    selectDay,
  }
})
