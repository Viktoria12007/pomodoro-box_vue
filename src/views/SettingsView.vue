<script setup lang='ts'>
import Input from '@/components/UI/Input.vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import { ref } from 'vue'
import { useValidationInput } from '@/hooks/useValidationInput'

const store = useSettingsStore()
const { pomodoroTime, shortBreakTime, longBreakTime, frequencyLongBreak, onNotifications } = storeToRefs(store)

const { validationSettingsInput } = useValidationInput()

const pomodoroTimeModel = ref(pomodoroTime.value)
const shortBreakTimeModel = ref(shortBreakTime.value)
const longBreakTimeModel = ref(longBreakTime.value)
const frequencyLongBreakModel = ref(frequencyLongBreak.value)
const pomodoroTimeValidation = ref('')
const shortBreakTimeValidation = ref('')
const longBreakTimeValidation = ref('')
const frequencyLongBreakValidation = ref('')
let timerForInput;

function setSelectedValidation(validation, value) {
  switch (validation) {
    case 'pomodoro':
      pomodoroTimeValidation.value = value
      break
    case 'shortBreak':
      shortBreakTimeValidation.value = value
      break
    case 'longBreak':
      longBreakTimeValidation.value = value
      break
    default:
      frequencyLongBreakValidation.value = value
  }
}
function handleInput(e, func, model, validation) {
  clearTimeout(timerForInput)
  setSelectedValidation(validation, validationSettingsInput(e))
  timerForInput = setTimeout(() => {
    if (e.target.value && e.target.validity.valid) {
      func(model)
    }
  }, 300)
}
</script>

<template>
  <div class='settings__wrap'>
    <form class='settings-form'>
      <label class='settings-form__label' for='pomodoro-time-input'>Продолжительность «помидора» (мин):</label>
      <Input
        id='pomodoro-time-input'
        type='number'
        min='1'
        max='60'
        step='1'
        class='settings-form__input'
        v-model='pomodoroTimeModel'
        @input='(e) => handleInput(e, store.setPomodoroTime, pomodoroTimeModel, "pomodoro")'
        :validation='pomodoroTimeValidation'
      />
      <label class='settings-form__label' for='short-break-time-input'>Продолжительность короткого перерыва (мин):</label>
      <Input
        id='short-break-time-input'
        type='number'
        min='1'
        max='15'
        step='1'
        class='settings-form__input'
        v-model='shortBreakTimeModel'
        @input='(e) => handleInput(e, store.setShortBreakTime, shortBreakTimeModel, "shortBreak")'
        :validation='shortBreakTimeValidation'
      />
      <label class='settings-form__label' for='long-break-time-input'>Продолжительность длинного перерыва (мин):</label>
      <Input
        id='long-break-time-input'
        type='number'
        min='1'
        max='30'
        step='1'
        class='settings-form__input'
        v-model='longBreakTimeModel'
        @input='(e) => handleInput(e, store.setLongBreakTime, longBreakTimeModel, "longBreak")'
        :validation='longBreakTimeValidation'
      />
      <label class='settings-form__label' for='frequency-long-break-input'>Запускать длинный перерыв через («помидора»):</label>
      <Input
        id='frequency-long-break-input'
        type='number'
        min='2'
        max='8'
        step='1'
        class='settings-form__input'
        v-model='frequencyLongBreakModel'
        @input='(e) => handleInput(e, store.setFrequencyLongBreak, frequencyLongBreakModel, "frequencyLongBreak")'
        :validation='frequencyLongBreakValidation'
      />
      <label class='settings-form__label' for='on-notifications-input'>Включить уведомления:</label>
      <input
        id='on-notifications-input'
        type="checkbox"
        class='settings-form__input'
        v-model='onNotifications'
      />
    </form>
  </div>
</template>

<style>
.settings-form__input {
  width: 25%;
  padding: 5px;
}
.settings-form__input + .input__validation {
  top: 30px;
}
</style>
<style scoped>
.settings__wrap {
  padding: 158px 0 99px 0;
}
.settings-form {
  width: 65%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /*flex-direction: column;*/
  gap: 30px;
  align-items: center;
  margin: 0 auto;
}
.settings-form__label {
  justify-self: end;
  cursor: pointer;
}
.settings-form__input[type="checkbox"] {
  width: auto;
  justify-self: start;
  cursor: pointer;
}
</style>
