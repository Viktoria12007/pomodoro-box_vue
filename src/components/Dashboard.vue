<script setup lang='ts'>
import Chart from '../components/Chart.vue';
</script>

<template>
  <ul class='dashboard'>
    <li class='dashboard__item'>
      <h3 class='dashboard-title dashboard-title__day'>Понедельник</h3>
      <p class='dashboard__total-time'>
        Вы работали над задачами в течение <span class='dashboard__total-time_red'>51 минуты</span>
      </p>
    </li>
    <li class='dashboard__item'>
      <Chart />
    </li>
    <li class='dashboard__item'></li>
    <li class='dashboard__item'>
      <h3 class='dashboard-title'>Фокус</h3>
      <div class='dashboard-value'>0%</div>
    </li>
    <li class='dashboard__item'>
      <h3 class='dashboard-title'>Время на паузе</h3>
      <div class='dashboard-value'>0м</div>
    </li>
    <li class='dashboard__item'>
      <h3 class='dashboard-title'>Остановки</h3>
      <div class='dashboard-value'>0</div>
    </li>
  </ul>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: 32px;
  grid-template-rows: 260px 179px 179px;
  grid-template-columns: 1.59fr .41fr 1fr 1fr 1fr 1fr;
  grid-template-areas: 'day chart chart chart chart chart'
                       'pomodoro chart chart chart chart chart'
                       'focus focus pause pause stop stop';
  list-style: none;
}
.dashboard__item:first-child {
  grid-area: day;
}
.dashboard__item:nth-child(2) {
  grid-area: chart;
  position: relative;
  padding: 0;
}
/*.dashboard__item:nth-child(2)::before {*/
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
/*.dashboard__item:nth-child(2)::after {*/
/*  display: block;*/
/*  content: '';*/
/*  width: 100%;*/
/*  height: 51px;*/
/*  position: absolute;*/
/*  left: 0;*/
/*  bottom: 0;*/
/*  background-color: var(--gray-chart);*/
/*}*/
.dashboard__item:nth-child(3) {
  grid-area: pomodoro;
  background-image: url("../assets/img/tomato_2.png");
  background-repeat: no-repeat;
  background-size: auto;
  background-position: center;
}
.dashboard__item:nth-child(4) {
  grid-area: focus;
  background-image: var(--focus-icon);
}
.dashboard__item:nth-child(5) {
  grid-area: pause;
  background-image: var(--pause-icon);
}
.dashboard__item:last-child {
  grid-area: stop;
  background-image: var(--stop-icon);
}
.dashboard__item:nth-child(4), .dashboard__item:nth-child(5), .dashboard__item:last-child {
  background-repeat: no-repeat;
  background-size: auto;
  background-position: 90% center;
}
.dashboard__item {
  padding: 25px;
  background-color: var(--gray-light)
}
.dashboard-title {
  font-size: 24px;
  line-height: 33px;
  /*font-weight: 700;*/
  margin-bottom: 20px;
}
.dashboard-title.dashboard-title__day {
  margin-bottom: 14px;
}
.dashboard-value {
  font-size: 64px;
  line-height: 76px;
}
.dashboard__total-time {
  /*max-width: 246px;*/
  line-height: 28px;
}
.dashboard__total-time_red {
  font-weight: 700;
  color: var(--red);
}
</style>
