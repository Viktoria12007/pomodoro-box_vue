<script setup lang='ts'>
import { defineProps } from 'vue'

defineProps<{
  type?: string,
  variant?: string,
}>()
</script>

<template>
  <button :class='["button", variant ?? "primary" ]' :type=' type ?? "button"'>
    <slot/>
  </button>
</template>

<style scoped>
.primary {
  color: var(--white);
  border: 2px solid var(--green);
  background-color: var(--green);
  transition: border-color .4s ease-in-out, background-color .4s ease-in-out;
}
.primary:hover,
.primary:active {
  border: 2px solid var(--green-dark);
  background-color: var(--green-dark);
}
.outline {
  color: var(--gray);
  border: 2px solid var(--gray);
  background-color: transparent;
  transition: color .4s ease-in-out, background-color .4s ease-in-out;
}
.outline:hover,
.outline:active {
  color: var(--white);
  background-color: var(--gray);
}
.light {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background-color: transparent;
}
</style>
