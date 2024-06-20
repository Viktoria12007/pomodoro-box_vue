<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
const props = withDefaults(defineProps<{
  validation?: string,
  resolveValidation?: boolean,
}>(), { resolveValidation: true })
const model = defineModel()
</script>

<template>
  <div class='input__wrap'>
    <input
      v-model='model'
      class='input'
      v-bind='$attrs'
    />
    <div v-show='validation && resolveValidation' class='input__validation'>{{validation}}</div>
  </div>
</template>

<style scoped>
.input {
  border: 2px solid transparent;
  background-color: var(--gray-light);
}
.input::placeholder {
  color: var(--gray-dark);
}
.input:invalid {
  border-color: var(--red-dark);
}
.input__wrap {
  width: 100%;
  position: relative;
}
.input__validation {
  position: absolute;
  top: 60px;
  z-index: 5;
  /*padding: 12.3px 5px;*/
  color: var(--red);
  background-color: var(--white);
}
</style>
