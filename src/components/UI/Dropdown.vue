<script setup lang='ts'>
import { defineProps, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  parentOpen?: boolean,
  newStyle?: {
    top?: number,
    left?: number,
  }
}>();
const emits = defineEmits<{
  (event: 'hideDropdown', e): void
}>()

function hide (e) {
  emits('hideDropdown', e)
}

onMounted(() => {
  document.addEventListener('click', (e) => hide(e))
})
onUnmounted(() => {
  document.removeEventListener('click', hide)
})
</script>

<template>
  <Teleport to='body'>
    <div
      v-show='props.parentOpen'
      class='dropdown'
      :style="{ top: `${props.newStyle.top}px`, left: `${props.newStyle.left}px` }">
      <slot/>
    </div>
  </Teleport>
</template>

<style>
.dropdown {
  position: absolute;
  z-index: 5;
}
</style>
