<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/UI/Button.vue'
import IconMenu from '@/components/icons/IconMenu.vue'

const tasks = ref([{ task: 'Сверстать сайт', pomodoro: 1 }, { task: 'Проверить валидность', pomodoro: 1 }])
</script>

<template>
  <ul class='list-tasks'>
    <li v-for='task in tasks' class='list-tasks__item'>
      <div class='list-tasks__pomodoro'>{{task.pomodoro}}</div>
      <div class='list-tasks__task'>{{task.task}}</div>
      <Button class='list-tasks__button' variant='light'>
        <IconMenu/>
      </Button>
    </li>
  </ul>
  <div class='list-tasks__total-time'>25 мин</div>
</template>

<style scoped>
.list-tasks {
  width: 370px;
  list-style: none;
  border-top: 1px solid var(--gray-border);
  border-bottom: 1px solid var(--gray-border);
  margin-bottom: 19px;
}
.list-tasks__item {
  display: flex;
  align-items: center;
  font-weight: 300;
  padding: 15px 0;
}
.list-tasks__item:not(:last-child) {
  border-bottom: 1px solid var(--gray-border);
}
.list-tasks__pomodoro {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--gray);
  margin-right: 4px;
}
.list-tasks__task {
  margin-right: auto;
}
.list-tasks__total-time {
  font-weight: 300;
  color: var(--gray-dark);
}
</style>
