<script setup lang="ts">
import Button from '../components/UI/Button.vue'
import Input from '../components/UI/Input.vue'
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
  nameTask.value = ''
  resolveValidation.value = false
  // e.target.reset()
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
    <Input
      v-model='nameTask'
      :validation='validation'
      :resolveValidation='resolveValidation'
      placeholder='Название задачи'
      class='add-task-form__input'
    />
<!--    <div v-show='validation && resolveValidation' class='add-task-form__validation'>{{validation}}</div>-->
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
  padding: 19px 15px;
  margin-bottom: 35px;
}
/*.add-task-form__validation {*/
/*  position: absolute;*/
/*  top: 55px;*/
/*  color: var(--red);*/
/*}*/
</style>
