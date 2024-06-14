<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconChart from '@/components/icons/IconChart.vue'
</script>

<template>
  <header class='header'>
    <div class='header__wrap container'>
      <RouterLink to="/">
        <img alt="Логотип" class="logo" src="@/assets/img/logo.svg" width="205" height="40" />
      </RouterLink>
      <nav>
        <RouterLink to="/statistics" class='header__link'>
            <IconChart class='header__icon'/>
            <div>Статистика</div>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: var(--white);
  box-shadow: 0px 10px 63px 0px rgba(0, 0, 0, 0.07);
}
.header__wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}
.header__link {
  display: flex;
  align-items: center;
  gap: 2px;
  color: var(--red);
  transition: color .4s ease-in-out;
}
.header__icon {
  fill: var(--red);
  transition: fill .4s ease-in-out;
}
.header__link:hover,
.header__link:active {
  color: var(--red-dark);
}
.header__link:hover .header__icon,
.header__link:active .header__icon {
  fill: var(--red-dark);
}
</style>
