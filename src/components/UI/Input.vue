<script setup lang="ts">
import { computed } from 'vue/dist/vue'

const props = defineProps<{
  validation: () => void,
  resolveValidation: boolean,
}>()
const model = defineModel()
</script>

<template>
  <input
    v-model.trim='model'
    type='text'
    minlength='2'
    maxlength='100'
    class='input'
  />
  <div v-show='validation && resolveValidation' class='add-task-form__validation'>{{validation}}</div>
</template>

<style scoped>
.input {
  width: 100%;
  /*max-width: 100%;*/
  /*padding: 19px 15px;*/
  /*margin-bottom: 35px;*/
  border: 2px solid transparent;
  background-color: var(--gray-light);
}
.input::placeholder {
  color: var(--gray-dark);
}
.input:invalid {
  border-color: var(--red-dark);
}
.add-task-form__validation {
  position: absolute;
  top: 55px;
  color: var(--red);
}
</style>
