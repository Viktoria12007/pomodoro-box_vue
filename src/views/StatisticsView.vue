<script setup lang='ts'>
import StatisticsHeader from '../components/StatisticsHeader.vue'
import Dashboard from '../components/Dashboard.vue'
</script>

<template>
  <div class='statistics__wrap'>
    <StatisticsHeader/>
    <Dashboard/>
  </div>
</template>

<style scoped>
.statistics__wrap {
  padding: 158px 0 99px 0;
}
</style>
