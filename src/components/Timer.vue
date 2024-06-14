<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
import IconIncreaseTime from '@/components/icons/IconIncreaseTime.vue'
import { useTasksListStore } from '@/stores/tasksList'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import { computed, onUnmounted, ref } from 'vue'
import { useStatisticStore } from '@/stores/statistic'

const storeListTasks = useTasksListStore()
const storeSettings = useSettingsStore()
const storeStatistic = useStatisticStore()

const { selectedTaskForTimer, orderSelectTaskForTimer, firstTask } = storeToRefs(storeListTasks)
const { pomodoroTime, breakTime } = storeToRefs(storeSettings)

const typeTimer = ref('default')
const stateTimer = ref('start')
let seconds = ref(0)
let minutes = ref(pomodoroTime.value)
let idForTimer;

const displayMinutes = computed(() => displayTime(minutes))
const displaySeconds = computed(() => displayTime(seconds))

function displayTime(partTime) {
  if (partTime.value <= 9) {
    return '0' + partTime.value
  }
  return partTime.value
}
async function tick() {
  if (minutes.value > 0 && seconds.value === 0) {
    minutes.value--
    seconds.value = 59
  } else if (seconds.value > 0) {
    seconds.value--
  }

  if (minutes.value === 0 && seconds.value === 0) {
    if (typeTimer.value === 'work') {
      if (selectedTaskForTimer.value.pomodoro > 1) {
        minutes.value = breakTime.value
        typeTimer.value = 'break'
        storeStatistic.setPomodoros(1)
      } else {
        handleDone()
        return
      }
    } else {
      minutes.value = pomodoroTime.value
      typeTimer.value = 'work'
      storeStatistic.setResolveIncreasePomodoros(true)
      storeListTasks.editTask('pomodoro', 'decrease', '', 'timer')
    }
  }

  const diff = 1000 - (Date.now() % 1000);
  idForTimer = setTimeout(tick, diff)
}
function handleStart() {
  typeTimer.value = 'work'
  stateTimer.value = 'run'
  tick()
}
function handlePause() {
   storeStatistic.setResolveIncreasePomodoros(false)
   stateTimer.value = 'pause'
   clearTimeout(idForTimer)
}
function handleStop() {
  typeTimer.value = 'default'
  stateTimer.value = 'start'
  clearTimeout(idForTimer)
  minutes.value = selectedTaskForTimer.value ? pomodoroTime.value : 0
  seconds.value = 0
}
function handleContinue() {
  stateTimer.value = 'run'
  tick()
}
function handleDone() {
  storeListTasks.deleteTask('timer')
  storeListTasks.selectTaskForTimer(firstTask.value)
  handleStop()
}
function handleSkip() {
  minutes.value = selectedTaskForTimer.value ? pomodoroTime.value : 0
  seconds.value = 0
  typeTimer.value = 'work'
  handleContinue()
}
onUnmounted(() => {
  clearTimeout(idForTimer)
})
// watch(selectedTaskForTimer.value, () => {
//   seconds = selectedTaskForTimer.value.pomodoro * pomodoro.value
// })
</script>

<template>
  <div class='timer'>
    <div :class="{ 'timer__header': true, 'timer__header_work': typeTimer === 'work', 'timer__header_break': typeTimer === 'break' }">
      <div class='timer__header-task'>{{ selectedTaskForTimer?.name }}</div>
      <div>{{ selectedTaskForTimer ? `Помидор ${selectedTaskForTimer.pomodoro}` : '' }}</div>
    </div>
    <div class='timer__content'>
      <template v-if='selectedTaskForTimer'>
        <div class='timer__time-wrap'>
          <Transition mode='out-in'>
            <div :class="{ 'timer__time': true, 'timer__time_work': typeTimer === 'work' && stateTimer === 'run', 'timer__time_break': typeTimer === 'break' && stateTimer === 'run' }"
                 :key={seconds}>
              {{ `${displayMinutes}:${displaySeconds}` }}
            </div>
          </Transition>
          <Button @click="storeListTasks.editTask('pomodoro', 'increase', '', 'timer')" class='timer__increase-button' variant='light'>
            <IconIncreaseTime class='timer__icon'/>
          </Button>
        </div>
        <div class='timer__task'>
          <span class='timer__task_gray'>{{`Задача ${orderSelectTaskForTimer} - `}}</span>
          <span>{{selectedTaskForTimer.name}}</span>
        </div>
        <div class='timer__action-wrap'>
          <Button v-show='typeTimer === "default"' @click='handleStart' :disabled='stateTimer === "run"'>Старт</Button>
          <Button v-show='stateTimer === "run"' @click='handlePause'>Пауза</Button>
          <Button v-show='stateTimer === "pause"' @click='handleContinue'>Продолжить</Button>
          <Button v-show='typeTimer !== "break" && stateTimer !== "pause"'
                  @click='handleStop'
                  :variant='stateTimer === "run" ? "outline-red" : "outline-gray"'
                  :disabled='stateTimer === "start"'>Стоп</Button>
          <Button v-show='typeTimer === "work" && stateTimer === "pause"' @click='handleDone' variant='outline-red'>Сделано</Button>
          <Button v-show='typeTimer === "break"' @click='handleSkip' variant='outline-red'>Пропустить</Button>
        </div>
      </template>
      <div v-else>Задач пока нет!</div>
    </div>
  </div>
</template>

<style scoped>
.timer {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 507px;
}
.timer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--white);
  padding: 19px 40px;
  background-color: var(--gray-dark);
  transition: background-color .4s ease-in-out;
}
.timer__header_break {
  background-color: var(--green);
}
.timer__header_work {
  background-color: var(--red);
}
.timer__header-task {
  font-weight: 700;
}
.timer__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-light);
}
.timer__time-wrap {
  display: flex;
  gap: 25px;
  align-items: center;
}
.timer__time {
  font-size: 150px;
  font-weight: 200;
  line-height: 179px;
  transition: color .4s ease-in-out;
}
.timer__time_work {
  color: var(--red)
}
.timer__time_break {
  color: var(--green)
}
.timer__icon {
  fill: var(--gray);
  transition: fill .4s ease-in-out;
}
.timer__increase-button:hover .timer__icon,
.timer__increase-button:active .timer__icon {
  fill: var(--green-dark);
}
.timer__task {
  margin-bottom: 32px;
}
.timer__task_gray {
  color: var(--gray-dark);
}
.timer__action-wrap {
  display: flex;
  gap: 25px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity .4s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
