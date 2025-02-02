<script setup lang='ts'>
import { useStatisticStore } from '@/stores/statistic'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { displayTime } from '@/handlers/displayTime'

const daysWeekShortStr = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const defaultTimestamps = ['1 ч 40 мин', '1 ч 15 мин', '50 мин', '25 мин']
const countTimestamps = 5

const storeStatistic = useStatisticStore()
const { selectedDay, workTimesSelectedWeek } = storeToRefs(storeStatistic)

function getHeightFigures(value) {
  return value ? ((value * 100 / maxWorkTimeInSelectedWeek.value) + '%') : '5px'
}

const totalWorkTimesInSelectedWeek = computed(() => workTimesSelectedWeek.value.reduce((acc, curr) => acc + curr.workTime, 0)) // minutes
const maxWorkTimeInSelectedWeek = computed(() => Math.max(...workTimesSelectedWeek.value.map(item => item.workTime)))
const oneFifth = computed(() => Math.round(maxWorkTimeInSelectedWeek.value / countTimestamps))
const displayTimestamps = computed(() => {
  if (!maxWorkTimeInSelectedWeek.value) {
    return defaultTimestamps
  }
  return Array(countTimestamps - 1).fill(0).map((item, index) => {
    const timestamps = oneFifth.value * (index + 1)
    return displayTime(timestamps)
  }).reverse()
})
</script>

<template>
  <div class='chart-axis'>
    <template v-for='time in displayTimestamps'>
      <div class='chart-axis__border'></div>
      <div class='chart-axis__value'>{{time}}</div>
    </template>
  </div>
  <div class='chart'>
    <div v-for='item in 7' class='chart__column' @click='storeStatistic.selectDay(workTimesSelectedWeek[item - 1].numberDay)'>
      <div
        class='chart__item'
        :class='{
          "chart__figure": workTimesSelectedWeek[item - 1].workTime,
          "chart__figure_empty": !workTimesSelectedWeek[item - 1].workTime,
          "chart__figure_active": selectedDay === workTimesSelectedWeek[item - 1].numberDay,
        }'
        :style="{ height: getHeightFigures(workTimesSelectedWeek[item - 1].workTime) }"
      ></div>
      <div class='chart__item chart__day' :class='{"chart__day_active": selectedDay === workTimesSelectedWeek[item - 1].numberDay}'>{{ daysWeekShortStr[item - 1] }}</div>
    </div>
  </div>
</template>

<style scoped>
.chart-axis {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(5, 83px);
  grid-template-columns: 1fr 109px;
  align-items: end;
}
/*.chart__axis::before {*/
/*  display: grid;*/
/*  content: '';*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  position: absolute;*/
/*  left: 0;*/
/*  top: 0;*/
/*  grid-template-rows: repeat(5, 83px);*/
/*  grid-template-columns: 1fr 60px;*/
/*}*/
.chart-axis::after {
  display: block;
  content: '';
  width: 100%;
  height: 51px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: var(--gray-chart);
}
.chart-axis__border {
  border-bottom: 1px solid rgba(51, 51, 51, .2);
}
.chart-axis__value {
  text-align: center;
  font-size: 12px;
  line-height: 33px;
}
.chart {
  display: grid;
  height: 100%;
  position: relative;
  z-index: 5;
  column-gap: 32px;
  /*grid-template-rows: 100%;*/
  grid-template-columns: repeat(7, 1fr);
  /*align-items: end;*/
  padding: 0 165px 0 56px;
  /*justify-items: center;*/
}
/*.chart::after {*/
/*  display: block;*/
/*  content: '';*/
/*  width: 100%;*/
/*  height: 51px;*/
/*  position: absolute;*/
/*  background-color: var(--gray-chart);*/
/*}*/
/*div {*/
/*  !*width: 100%;*!*/
/*  text-align: center;*/
/*}*/
.chart__column {
  /*height: 100%;*/
  display: flex;
  flex-direction: column;
  justify-content: end;
}
.chart__item {
  text-align: center;
  font-size: 24px;
  line-height: 29px;
  color: var(--gray-dark);
  cursor: pointer;
}
.chart__figure {
  background-color: var(--red-light);
  transition: background-color .4s ease-in-out;
}
/*.chart__figure:hover {*/
/*  background-color: var(--red-hover);*/
/*}*/
.chart__figure_empty {
  background-color: var(--gray);
}
.chart__figure_active:not(.chart__figure_empty) {
  background-color: var(--red);
}
.chart__day {
  padding: 11px 0;
  transition: color .4s ease-in-out;
}
.chart__day_active {
  color: var(--red);
}
.chart__column:hover .chart__figure {
  background-color: var(--red-hover);
}
</style>
