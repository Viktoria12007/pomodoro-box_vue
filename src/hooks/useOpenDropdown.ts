import { reactive, ref } from 'vue'
import type { CoordsDropdown } from '../types/types'

export function useOpenDropdown() {
  const openDropdown = ref(false)
  const coords = reactive<CoordsDropdown>({
    top: 0,
    left: 0,
  })

  function hideDropdown(e: MouseEvent) {
    if (e.target instanceof Node) {
      openDropdown.value = false;
    }
  }
  function getCoords(e, selector = '.button') {
    const element = e.target.closest(selector)
    const box = element.getBoundingClientRect()
    if (box) {
      if (selector === '.button') {
        coords.top = box.top + window.scrollY + box.height + 5
        coords.left = box.left + window.scrollX - 60
      } else {
        coords.top = box.top + window.scrollY + box.height
        coords.left = box.left + window.scrollX
      }
    }
    openDropdown.value = true
  }
  return {
    openDropdown,
    coords,
    hideDropdown,
    getCoords,
  }
}
