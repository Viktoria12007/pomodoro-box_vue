<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <main class='main container'>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>

<style scoped></style>
