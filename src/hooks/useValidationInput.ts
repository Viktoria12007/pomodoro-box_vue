import { ref } from 'vue'

export function useValidationInput() {
  const validation = ref('')

  function setValidation(value) {
    validation.value = value
  }
  function validationNameTaskInput(nameTask) {
    if (nameTask) {
      if (nameTask.length === 1) {
        return 'Название задачи должно содержать минимум 2 символа!'
      } else if (nameTask.length > 39) {
        return 'Название задачи должно содержать максимум 40 символов!'
      }
      return ''
    }
    return 'Введите название задачи!'
  }

  function validationSettingsInput(e) {
    if (!e.target.value) {
      return 'Значение не может быть пустым!'
    }
    if (!e.target.validity.valid) {
      return e.target.validationMessage
    }
    return ''
  }

  return {
    validation,
    setValidation,
    validationNameTaskInput,
    validationSettingsInput,
  }
}
