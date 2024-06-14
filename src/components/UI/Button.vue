<script setup lang='ts'>
import { defineProps } from 'vue'

defineProps<{
  variant?: string,
}>()
</script>

<template>
  <button :class='["button", variant ?? "primary" ]'>
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
.red {
  color: var(--white);
  border: 2px solid var(--red);
  background-color: var(--red);
  transition: border-color .4s ease-in-out, background-color .4s ease-in-out;
}
.red:hover,
.red:active {
  border: 2px solid var(--red-dark);
  background-color: var(--red-dark);
}
.outline-gray {
  color: var(--gray);
  border: 2px solid var(--gray);
  background-color: transparent;
  transition: color .4s ease-in-out, background-color .4s ease-in-out;
}
.outline-gray:hover,
.outline-gray:active {
  color: var(--white);
  background-color: var(--gray);
}
.outline-red {
  color: var(--red);
  border: 2px solid var(--red);
  background-color: transparent;
  transition: color .4s ease-in-out, background-color .4s ease-in-out;
}
.outline-red:hover,
.outline-red:active {
  color: var(--white);
  background-color: var(--red);
}
.light {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background-color: transparent;
}
.link {
  padding: 0;
  border: none;
  background-color: transparent;
  text-decoration: underline;
}
</style>
