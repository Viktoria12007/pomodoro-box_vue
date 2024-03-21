<script setup lang="ts">
</script>

<template>
  <h2 class='title description__title'>Ура! Теперь можно начать работать:</h2>
  <ul class='description-list'>
    <li class='description-list__item'>Выберите категорию и напишите название текущей задачи</li>
    <li class='description-list__item'>Запустите таймер («помидор»)</li>
    <li class='description-list__item'>Работайте пока «помидор» не прозвонит</li>
    <li class='description-list__item'>Сделайте короткий перерыв (3-5 минут)</li>
    <li class='description-list__item'>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
  </ul>
</template>

<style>
.description__title {
  margin-bottom: 3px;
}
.description-list {
  margin-bottom: 25px;
}
.description-list__item {
  line-height: 33px;
  list-style-type: none;
}
.description-list__item::before {
  content: '•';
  color: var(--red-dark);
  padding-right: 15px;
}
</style>
