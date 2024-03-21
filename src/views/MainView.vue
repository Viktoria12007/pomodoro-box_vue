<script setup lang="ts">
import Description from '../components/Description.vue'
import AddTaskForm from '../components/AddTaskForm.vue'
import ListTasks from '../components/ListTasks.vue'
import Timer from '../components/Timer.vue'
</script>

<template>
  <div class='main__wrap'>
    <div class='main__left-column'>
      <Description/>
      <AddTaskForm/>
      <ListTasks/>
    </div>
    <Timer />
  </div>
</template>

<style scoped>
.main__wrap {
  display: flex;
  gap: 16px;
  /*height: calc(100vh - 75px);*/
  padding: 175px 0 100px 0;
}
/*.main__wrap > * {*/
/*  width: 50%;*/
/*}*/
.main__left-column {
  display: flex;
  flex-direction: column;
  width: 40%;
}
</style>
