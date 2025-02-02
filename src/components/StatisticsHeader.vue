<script setup lang='ts'>
import Dropdown from '../components/UI/Dropdown.vue'
import { useOpenDropdown } from '@/hooks/useOpenDropdown'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatisticStore } from '@/stores/statistic'

const { openDropdown, coords, hideDropdown, getCoords } = useOpenDropdown()
const storeStatistic = useStatisticStore()
const { selectedWeek } = storeToRefs(storeStatistic)

const options = ref([{ value: 'thisWeek', text: 'Эта неделя' }, { value: 'lastWeek', text: 'Прошедшая неделя' }, { value: 'twoWeeksAgo', text: '2 недели назад' }])

const filteredOptions = computed(() => options.value.filter((option) => option.value !== selectedWeek.value.value))

function handleClickSelect(e) {
  e.stopPropagation()
  getCoords(e, '.statistics-select')
}
</script>

<template>
  <div class='statistics-header'>
    <h2 class='statistics-header__title'>Ваша активность</h2>
    <div :class='{"statistics-select": true, "statistics-select_open": openDropdown}' @click='handleClickSelect'>{{selectedWeek.text}}</div>
    <Dropdown :parent-open='openDropdown' :new-style="coords" @hide-dropdown='hideDropdown'>
      <ul class='statistics-select__list'>
        <li v-for='option in filteredOptions' :key='option.value' class='statistics-select__item' @click='storeStatistic.selectWeek(option)'>{{option.text}}</li>
      </ul>
    </Dropdown>
  </div>
</template>

<style scoped>
.statistics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.statistics-select {
  width: 370px;
  position: relative;
  padding: 19px 15px;
  border: 2px solid transparent;
  background-color: var(--gray-light);
  cursor: pointer;
  /*box-shadow: 0px 10px 63px 0px rgba(0, 0, 0, 0.07);*/
}
.statistics-select::before {
  content: '';
  display: block;
  width: 7px;
  height: 7px;
  position: absolute;
  right: 22px;
  border-left: 2px solid var(--red-dark);
  border-bottom: 2px solid var(--red-dark);
  transform: rotate(-45deg);
}
.statistics-select_open::before {
  transform: rotate(-225deg);
}
.statistics-select__list {
  width: 370px;
  list-style: none;
  /*padding: 19px 15px;*/
  /*border: 2px solid transparent;*/
  /*background-color: var(--gray-light);*/
  /*cursor: pointer;*/
  /*box-shadow: 0px 10px 63px 0px rgba(0, 0, 0, 0.07);*/
}
.statistics-select__item {
  /*width: 370px;*/
  padding: 19px 15px;
  border-top: 1px solid var(--gray-select);
  background-color: var(--gray-light);
  cursor: pointer;
}
</style>
