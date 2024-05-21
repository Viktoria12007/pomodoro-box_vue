<script setup lang='ts'>
import { defineProps, ref, watch } from 'vue'

const props = defineProps<{
  parentOpen?: boolean,
  newStyle?: {
    top?: number,
    left?: number,
  }
}>();

const childOpen = ref(false)
watch(() => props.parentOpen, async (n) => {
  childOpen.value = n;
})
</script>

<template>
  <Teleport to='body'>
    <div v-show='childOpen' class='dropdown' :style="{ top: `${newStyle.top}px`, left: `${newStyle.left}px` }">
      <slot/>
    </div>
  </Teleport>
</template>

<style>
.dropdown {
  position: absolute;
  z-index: 5;
  border: 1px solid var(--gray);
  background-color: var(--white);
}
</style>
