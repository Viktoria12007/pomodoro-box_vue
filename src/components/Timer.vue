<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
import IconIncreaseTime from '@/components/icons/IconIncreaseTime.vue'
import { useTasksListStore } from '@/stores/tasksList'
import { storeToRefs } from 'pinia'
import { usePomodoroStore } from '@/stores/pomodoro'
import { ref } from 'vue'

const storeListTasks = useTasksListStore()
const storePomodoro = usePomodoroStore()
const { firstTask } = storeToRefs(storeListTasks)
const { pomodoro } = storeToRefs(storePomodoro)
let seconds = ref(0)
setInterval(() => {
  seconds.value++
}, 1000)
function handleStart() {
  console.debug('start');
}
function handleStop() {
  console.debug('stop');
}
</script>

<template>
  <div class='timer'>
    <div class='timer__header'>
      <div class='timer__header-task'>{{ firstTask?.name || '' }}</div>
      <div>{{ `Помидор ${firstTask?.pomodoro}` || '' }}</div>
    </div>
    <div class='timer__content'>
      <template v-if='firstTask'>
        <div class='timer__time-wrap'>
<!--          <div class='timer__time'>{{firstTask.pomodoro * pomodoro}}</div>-->
          <Transition mode='out-in'>
            <div class='timer__time' :key={seconds}>{{seconds}}</div>
          </Transition>
          <Button class='timer__increase-button' variant='light'>
            <IconIncreaseTime class='timer__icon'/>
          </Button>
        </div>
        <div class='timer__task'>
          <span class='timer__task_gray'>Задача 1 - </span>
          <span>{{firstTask.name}}</span>
        </div>
        <div class='timer__action-wrap'>
          <Button @click='handleStart'>Старт</Button>
          <Button @click='handleStop' variant='outline'>Стоп</Button>
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
