<script setup lang="ts">
import Button from '../components/UI/Button.vue'
function addTask() {
  console.log('addTask');
}
</script>

<template>
  <form @submit.prevent='addTask' class='add-task-form'>
    <input placeholder='Название задачи' class='add-task-form__input'/>
    <Button type='submit'>Добавить</Button>
  </form>
</template>

<style scoped>
.add-task-form {
  width: 370px;
  display: flex;
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
</style>
