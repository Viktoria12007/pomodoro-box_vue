<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import { useTasksListStore } from '@/stores/tasksList'
import { storeToRefs } from 'pinia'
import Dropdown from '@/components/UI/Dropdown.vue'
import { reactive, ref } from 'vue'
import ActionsMenu from '@/components/ActionsMenu.vue'

interface CoordsDropdown {
  top?: number,
  left?: number,
}

const openDropdown = ref(false)
const coords: CoordsDropdown = reactive({
  top: 0,
  left: 0,
})
const store = useTasksListStore()
const { tasks, totalTime, lengthTasks } = storeToRefs(store)

store.$subscribe((mutation, state) => {
  localStorage.pomodoroTasks = JSON.stringify(state.tasks)
})

function getCoords(e) {
  const button = e.target.closest('.button')
  const box = button.getBoundingClientRect()
  if (box) {
    coords.top = box.top + window.scrollY + box.height + 5
    coords.left = box.left + window.scrollX - 60
  }
  openDropdown.value = true
}
function handleClickMenuButton(e, task) {
  getCoords(e)
  store.selectTask(task)
}
function hideMenu() {
  openDropdown.value = false
}
</script>

<template>
  <div :v-if={lengthTasks}>
    <TransitionGroup tag='ul' class='tasks-list'>
      <li v-for='task in tasks' :key='task.id' class='tasks-list__item'>
        <div class='tasks-list__pomodoro'>{{task.pomodoro}}</div>
        <div class='tasks-list__task'>{{task.name}}</div>
        <Button @click="(e) => handleClickMenuButton(e, task)" class='tasks-list__button' variant='light'>
          <IconMenu/>
        </Button>
      </li>
    </TransitionGroup>
    <Dropdown :parent-open='openDropdown' :new-style="coords">
      <ActionsMenu @hide-menu='hideMenu'/>
    </Dropdown>
    <div class='tasks-list__total-time'>{{ `${totalTime} мин` }}</div>
  </div>
</template>

<style scoped>
.tasks-list {
  width: 370px;
  list-style: none;
  border-top: 1px solid var(--gray-border);
  border-bottom: 1px solid var(--gray-border);
  margin-bottom: 19px;
}
.tasks-list__item {
  display: flex;
  align-items: center;
  font-weight: 300;
  padding: 15px 0;
}
.tasks-list__item:not(:last-child) {
  border-bottom: 1px solid var(--gray-border);
}
.tasks-list__pomodoro {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--gray);
  margin-right: 4px;
}
.tasks-list__task {
  margin-right: auto;
}
.tasks-list__button {
  padding: 10px 0px;
}
.tasks-list__total-time {
  font-weight: 300;
  color: var(--gray-dark);
}
.v-move,
.v-enter-active,
.v-leave-active {
  transition: opacity .4s ease-in-out, transform .4s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.v-leave-active {
  position: absolute;
}
</style>
