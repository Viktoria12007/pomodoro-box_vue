<script setup lang="ts">
import Button from '../components/UI/Button.vue'
import { useTasksListStore } from '@/stores/tasksList'
import { computed, ref, watch } from 'vue'

const store = useTasksListStore()
const { addTask } = store
const nameTask = ref('')
const resolveValidation = ref(false)

function handleAddTask(e) {
  addTask({
    id: self.crypto.randomUUID(),
    name: nameTask.value,
    pomodoro: 1,
  })
  e.target.reset()
}
const validation = computed(() => {
  if (nameTask.value) {
    if (nameTask.value.length > 0 && nameTask.value.length < 2) {
      return 'Название задачи должно содержать минимум 2 символа!'
    } else if (nameTask.value.length > 40) {
      return 'Название задачи должно содержать максимум 40 символов!'
    }
    return ''
  }
  return 'Введите название задачи!'
})
watch(nameTask, () => {
  resolveValidation.value = true
}, {
  once: true
})
</script>

<template>
  <form @submit.prevent='handleAddTask' class='add-task-form'>
    <input v-model.trim='nameTask' placeholder='Название задачи' class='add-task-form__input'/>
    <div v-show='validation && resolveValidation' class='add-task-form__validation'>{{validation}}</div>
    <Button type='submit' :disabled='!!validation'>Добавить</Button>
  </form>
</template>

<style scoped>
.add-task-form {
  width: 370px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
}
.add-task-form__input {
  width: 100%;
  max-width: 100%;
  padding: 19px 15px;
  margin-bottom: 35px;
  border: none;
  background-color: var(--gray-light);
}
.add-task-form__input::placeholder {
  color: var(--gray-dark);
}
.add-task-form__validation {
  position: absolute;
  top: 55px;
  color: var(--red);
}
</style>
