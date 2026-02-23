import { computed, ref } from 'vue'
import { messages } from './messages'

export type Locale = 'ru' | 'en'

const storageKey = 'app_locale'
const resolveLocale = () => {
  if (typeof window === 'undefined') {
    return 'ru' as Locale
  }
  const stored = window.localStorage.getItem(storageKey) as Locale | null
  return stored || 'ru'
}

const locale = ref<Locale>(resolveLocale())

const setLocale = (next: Locale) => {
  locale.value = next
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, next)
  }
}

const localeModel = computed({
  get: () => locale.value,
  set: (value) => setLocale(value as Locale)
})

const t = (key: string) => messages[locale.value]?.[key] || messages.ru?.[key] || key

export const useI18n = () => ({
  locale,
  localeModel,
  setLocale,
  t
})
