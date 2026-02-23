import { computed, ref, watch } from 'vue'

export type AppTheme = 'light' | 'dark'

const storageKey = 'app_theme'

const resolveTheme = (): AppTheme => {
  if (typeof window === 'undefined') {
    return 'light'
  }
  const stored = window.localStorage.getItem(storageKey) as AppTheme | null
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const theme = ref<AppTheme>(resolveTheme())

const applyTheme = (value: AppTheme) => {
  if (typeof document === 'undefined') {
    return
  }
  document.documentElement.classList.toggle('app-dark', value === 'dark')
}

watch(
  theme,
  (value) => {
    applyTheme(value)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, value)
    }
  },
  { immediate: true }
)

export const useTheme = () => {
  const isDark = computed(() => theme.value === 'dark')
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    isDark,
    toggleTheme
  }
}
