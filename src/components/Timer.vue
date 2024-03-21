<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
import IconIncreaseTime from '@/components/icons/IconIncreaseTime.vue'

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
      <div class='timer__header-task'>Сверстать сайт </div>
      <div>Помидор 1</div>
    </div>
    <div class='timer__content'>
      <div class='timer__time-wrap'>
        <div class='timer__time'>25:00</div>
        <Button class='timer__increase-button' variant='light'>
          <IconIncreaseTime class='timer__icon'/>
        </Button>
      </div>
      <div class='timer__task'>
        <span class='timer__task_gray'>Задача 1 - </span>
        <span>Сверстать сайт </span>
      </div>
      <div class='timer__action-wrap'>
        <Button @click='handleStart'>Старт</Button>
        <Button @click='handleStop' variant='outline'>Стоп</Button>
      </div>
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
</style>
