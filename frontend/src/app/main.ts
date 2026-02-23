import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import App from './App.vue'
import router from './router'
import { registerPermissionDirective } from '@/shared/ui/permission.directive'
import { setApiHooks } from '@/shared/api/client'
import { useAuthStore } from '@/modules/auth/auth.store'
import { bindToastService, useToast } from '@/shared/composables/useToast'
import { primeTheme } from '@/shared/ui/prime.config'
import { useI18n } from '@/shared/i18n/i18n'
import '@/styles/theme.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  ripple: true,
  theme: primeTheme
})
app.use(ToastService)
app.use(ConfirmationService)

bindToastService(app)
registerPermissionDirective(app)

const auth = useAuthStore()
const toast = useToast()
const { t } = useI18n()

setApiHooks({
  onUnauthorized: () => {
    auth.logoutLocal()
    if (router.currentRoute.value.path !== '/login') {
      router.push('/login')
    }
  },
  onForbidden: () => {
    toast.error(t('insufficientPermissions'))
  }
})

app.mount('#app')
