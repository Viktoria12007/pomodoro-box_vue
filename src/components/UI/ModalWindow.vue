<script setup lang='ts'>
import { defineProps } from 'vue'
import Button from '@/components/UI/Button.vue'
import IconCross from '@/components/icons/IconCross.vue'

const props = defineProps<{
  show: boolean,
}>()
const emits = defineEmits<{
  (e: 'hideModal'): void
}>()
</script>

<template>
  <Teleport to='body'>
    <Transition name='modal'>
      <div v-if='show'>
        <div @click='emits("hideModal")' class='backdrop'></div>
        <div class='modal-window'>
          <Button variant='light' class='cross-button' @click='emits("hideModal")'>
            <IconCross/>
          </Button>
          <div class='modal-window__content'>
            <slot/>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity .4s ease-in-out;
}
.modal-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;
  width: 350px;
  max-width: 100%;
  height: 180px;
  max-height: 100%;
  background-color: var(--white);
  transition: opacity .4s ease-in-out, transform .4s ease-in-out;
}
.modal-window__content {
  position: absolute;
  top: 25px;
  left: 0;
  width: 100%;
  height: calc(100% - 25px);
  padding: 0px 25px 25px 25px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-enter-from,
.modal-leave-to {
  transition: opacity .4s ease-in-out;
}
.modal-enter-from .backdrop,
.modal-leave-to .backdrop {
  opacity: 0;
}
.modal-enter-from .modal-window,
.modal-leave-to .modal-window {
  opacity: 0;
  -webkit-transform: translate(-50%, -50%) scale(1.1);
  transform: translate(-50%, -50%) scale(1.1);
}
.cross-button {
  position: absolute;
  top: 12px;
  right: 12px;
}
</style>
