<script setup lang='ts'>
const timeArr = [45, 87, 18, 101, 0, 0, 0]
</script>

<template>
  <div class='chart-axis'>
    <div class='chart-axis__border'></div>
    <div class='chart-axis__value'>10 мин</div>
    <div class='chart-axis__border'></div>
    <div class='chart-axis__value'>20 мин</div>
    <div class='chart-axis__border'></div>
    <div class='chart-axis__value'>25 мин</div>
    <div class='chart-axis__border'></div>
    <div class='chart-axis__value'>30 мин</div>
  </div>
    <div class='chart'>
        <div v-for='item in timeArr' class='chart__item chart__figure' :style="{ height: `${item}px` }"></div>
        <div class='chart__item chart__day'>Пн</div>
        <div class='chart__item chart__day'>Вт</div>
        <div class='chart__item chart__day'>Ср</div>
        <div class='chart__item chart__day'>Чт</div>
        <div class='chart__item chart__day'>Пт</div>
        <div class='chart__item chart__day'>Сб</div>
        <div class='chart__item chart__day'>Вс</div>
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
  grid-template-rows: minmax(5px, 100%) 51px;
  grid-template-columns: repeat(7, 1fr);
  align-items: end;
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
.chart__item {
  text-align: center;
  font-size: 24px;
  line-height: 29px;
  color: var(--gray-dark);
}
.chart__item:nth-last-child(-n+7) {
  align-self: start;
}
.chart__figure {
  background-color: var(--red-light);
}
.chart__day {
  padding: 11px 0;
}
</style>
