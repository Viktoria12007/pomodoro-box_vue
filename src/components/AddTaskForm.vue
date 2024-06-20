<script setup lang="ts">
import Button from '../components/UI/Button.vue'
import Input from '../components/UI/Input.vue'
import { useTasksListStore } from '@/stores/tasksList'
import { nextTick, ref, watch } from 'vue'
import { useValidationInput } from '@/hooks/useValidationInput'

const store = useTasksListStore()
const { addTask } = store

const nameTask = ref('')
const resolveValidation = ref(false)
const { validation, setValidation, validationNameTaskInput } = useValidationInput()

async function handleAddTask() {
  if (nameTask.value) {
    addTask({
      id: self.crypto.randomUUID(),
      name: nameTask.value,
      pomodoro: 1,
      currentPomodoro: 1,
    })
    nameTask.value = ''
    await nextTick()
    resolveValidation.value = false
  }
}

watch(nameTask, () => {
  resolveValidation.value = true
})
</script>

<template>
  <form @submit.prevent='handleAddTask' class='add-task-form'>
    <Input
      v-model.trim='nameTask'
      type='text'
      minlength='2'
      maxlength='40'
      placeholder='Название задачи'
      class='add-task-form__input'
      @input='(e) => setValidation(validationNameTaskInput(e.target.value))'
      :validation='validation'
      :resolveValidation='resolveValidation'
    />
    <Button type='submit' :disabled='!!validation'>Добавить</Button>
  </form>
</template>

<style>
.add-task-form__input {
  width: 100%;
  padding: 19px 15px;
  margin-bottom: 35px;
}
</style>
<style scoped>
.add-task-form {
  width: 370px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
}
</style>
