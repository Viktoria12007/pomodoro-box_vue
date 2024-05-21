<script setup lang='ts'>
import IconIncrease from './icons/IconIncrease.vue'
import IconDecrease from './icons/IconDecrease.vue'
import IconEdit from './icons/IconEdit.vue'
import IconDelete from './icons/IconDelete.vue'
import { useTasksListStore } from '@/stores/tasksList'
import Button from '@/components/UI/Button.vue'

const emit = defineEmits<{
  (e: 'hideMenu'): void
}>()
const store = useTasksListStore()
const { editTask, deleteTask } = store;

function handleEditTask(key, value) {
  editTask(key, value)
  emit('hideMenu')
}
function handleDeleteTask() {
  deleteTask()
  emit('hideMenu')
}
</script>

<template>
  <ul class='action-list'>
    <li class='action-list__item'>
      <Button @click="handleEditTask('pomodoro', 'increase')" variant='light' class='action-list__button'>
        <IconIncrease/>
        <div>Увеличить</div>
      </Button>
    </li>
    <li class='action-list__item'>
      <Button @click="handleEditTask('pomodoro', 'decrease')" variant='light' class='action-list__button'>
        <IconDecrease/>
        <div>Уменьшить</div>
      </Button>
    </li>
    <li class='action-list__item'>
      <Button variant='light' class='action-list__button'>
        <IconEdit/>
        <div>Редактировать</div>
      </Button>
    </li>
    <li class='action-list__item'>
      <Button @click='handleDeleteTask' variant='light' class='action-list__button'>
        <IconDelete/>
        <div>Удалить</div>
      </Button>
    </li>
  </ul>
</template>

<style scoped>
.action-list {
  display: flex;
  flex-direction: column;
  list-style: none;
}
.action-list__item {
  display: flex;
  align-items: center;
}
.action-list__button {
  width: 100%;
  justify-content: flex-start;
  font-weight: 300;
  color: var(--gray-dark);
  gap: 8px;
  padding: 9px 14px;
  transition: background-color .4s ease-in-out;
}
.action-list__button:hover {
  background-color: var(--gray-light);
}
.action-list__button:active {
  background-color: var(--gray-light);
}
</style>
