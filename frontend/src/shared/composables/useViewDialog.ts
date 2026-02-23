import { ref } from 'vue'

export const useViewDialog = <T>() => {
  const visible = ref(false)
  const selected = ref<T | null>(null)

  const openView = (row: T) => {
    selected.value = row
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  return {
    visible,
    selected,
    openView,
    close
  }
}
