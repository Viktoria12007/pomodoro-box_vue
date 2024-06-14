<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
import Input from '@/components/UI/Input.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import { useTasksListStore } from '@/stores/tasksList'
import { storeToRefs } from 'pinia'
import Dropdown from '@/components/UI/Dropdown.vue'
import { ref } from 'vue'
import ActionsMenu from '@/components/ActionsMenu.vue'
import ModalWindow from '@/components/UI/ModalWindow.vue'
import { useOpenDropdown } from '@/hooks/useOpenDropdown'

const showModal = ref(false)
const { openDropdown, coords, hideDropdown, getCoords } = useOpenDropdown()
const store = useTasksListStore()
const { tasks, totalTime, lengthTasks, selectedTaskForTimer, selectedTaskForAction, showEditTaskInput } = storeToRefs(store)

store.$subscribe((mutation, state) => {
  localStorage.pomodoroTasks = JSON.stringify(state.tasks)
  const isExist = state.tasks.find((task) => task.id === selectedTaskForTimer.value?.id)
  if (!isExist) {
    store.selectTaskForTimer(null)
  }
})
function handleClickMenuButton(e, task) {
  e.stopPropagation()
  store.selectTaskForAction(task)
  getCoords(e)
}
function handleSelectTask(task) {
  store.selectTaskForTimer(task)
}
function handleHideEditInput(e) {
  store.editTask("name", "editName", e.target.value)
  store.setShowEditTaskInput(false)
}
function hideModal() {
  showModal.value = false
}
function handleDeleteTask() {
  store.deleteTask()
  showModal.value = false
}
</script>

<template>
  <div :v-if={lengthTasks}>
    <TransitionGroup tag='ul' class='tasks-list'>
      <li v-for='task in tasks' :key='task.id' @click='handleSelectTask(task)' :class="{'tasks-list__item': true, 'tasks-list__item_select': task.id === selectedTaskForTimer?.id}">
        <div class='tasks-list__pomodoro'>{{task.pomodoro}}</div>
        <Input
          v-if='showEditTaskInput && selectedTaskForAction?.id === task.id'
          v-model='task.name'
          @blur='(e) => handleHideEditInput(e)'
          class='tasks-list__input'
        />
        <div v-else class='tasks-list__task'>{{task.name}}</div>
        <Button @click="(e) => handleClickMenuButton(e, task)" class='tasks-list__button' variant='light'>
          <IconMenu/>
        </Button>
      </li>
    </TransitionGroup>
    <Dropdown :parent-open='openDropdown' :new-style="coords" @hide-dropdown='hideDropdown'>
      <ActionsMenu @showModal='showModal = true' />
    </Dropdown>
    <ModalWindow :show='showModal' @hide-modal='hideModal'>
      <p class='question-delete'>Удалить задачу?</p>
      <Button @click='handleDeleteTask' variant='red' class='delete-task-button'>Удалить</Button>
      <Button @click='hideModal' variant='link' class='cancel-button'>Отмена</Button>
    </ModalWindow>
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
  /*padding: 15px 0;*/
  cursor: pointer;
  transition: background-color .4s ease-in-out;
}
.tasks-list__item:not(:last-child) {
  border-bottom: 1px solid var(--gray-border);
}
.tasks-list__item_select {
  background-color: var(--gray-light);
}
.tasks-list__pomodoro {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--gray);
  /*margin-right: 4px;*/
}
.tasks-list__task {
  padding: 15px 4px;
  margin-right: auto;
}
.tasks-list__input {
  width: 80%;
  padding: 14px 4px;
  /*padding: 5px 5px;*/
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
.question-delete {
  font-size: 24px;
  margin-bottom: 25px;
}
.delete-task-button {
  margin-bottom: 10px;
}
.cancel-button {
  font-weight: 300;
}
</style>
