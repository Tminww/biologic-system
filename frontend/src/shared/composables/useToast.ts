import { getCurrentInstance } from 'vue'
import type { App } from 'vue'
import type { ToastServiceMethods } from 'primevue/toastservice'
import { useI18n } from '@/shared/i18n/i18n'

let globalToast: ToastServiceMethods | null = null

export const bindToastService = (app: App) => {
  globalToast = app.config.globalProperties.$toast as ToastServiceMethods
}

const resolveToast = () => {
  const instance = getCurrentInstance()
  return (instance?.appContext.config.globalProperties.$toast as ToastServiceMethods | undefined) || globalToast
}

export const useToast = () => {
  const toast = resolveToast()
  const { t } = useI18n()
  const show = (severity: string, detail: string, summary: string) => {
    toast?.add({ severity, summary, detail, life: 3000 })
  }
  return {
    success: (detail: string, summary = t('toast.success')) => show('success', detail, summary),
    info: (detail: string, summary = t('toast.info')) => show('info', detail, summary),
    warn: (detail: string, summary = t('toast.warn')) => show('warn', detail, summary),
    error: (detail: string, summary = t('toast.error')) => show('error', detail, summary)
  }
}
