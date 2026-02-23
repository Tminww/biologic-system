import type { App, DirectiveBinding } from 'vue'
import { useAuthStore } from '@/modules/auth/auth.store'
import type { Action, Resource } from '@/shared/types/permissions'
import { useI18n } from '@/shared/i18n/i18n'

const lockIconClass = 'permission-lock-icon'

const getPermission = (binding: DirectiveBinding) => {
  const value = binding.value as [Resource, Action]
  return { resource: value?.[0], action: value?.[1] }
}

const setDisabled = (el: HTMLElement, disabled: boolean) => {
  if (disabled) {
    const { t } = useI18n()
    el.setAttribute('aria-disabled', 'true')
    el.setAttribute('data-permission-disabled', 'true')
    el.setAttribute('title', t('noAccess'))
    if ('disabled' in el) {
      ; (el as HTMLButtonElement).disabled = true
    }
    if (!el.querySelector(`.${lockIconClass}`)) {
      const icon = document.createElement('i')
      icon.className = `pi pi-lock ${lockIconClass}`
      el.appendChild(icon)
    }
  } else {
    el.removeAttribute('aria-disabled')
    el.removeAttribute('data-permission-disabled')
    el.removeAttribute('title')
    if ('disabled' in el) {
      ; (el as HTMLButtonElement).disabled = false
    }
    const icon = el.querySelector(`.${lockIconClass}`)
    if (icon) {
      icon.remove()
    }
  }
}

const bindClickGuard = (el: HTMLElement) => {
  if ((el as any).__permGuard) {
    return
  }
  const handler = (event: Event) => {
    if (el.getAttribute('data-permission-disabled') === 'true') {
      event.preventDefault()
      event.stopPropagation()
    }
  }
  el.addEventListener('click', handler)
    ; (el as any).__permGuard = handler
}

const unbindClickGuard = (el: HTMLElement) => {
  const handler = (el as any).__permGuard as ((event: Event) => void) | undefined
  if (handler) {
    el.removeEventListener('click', handler)
    delete (el as any).__permGuard
  }
}

const applyPermission = (el: HTMLElement, binding: DirectiveBinding) => {
  const auth = useAuthStore()
  const { resource, action } = getPermission(binding)
  const allowed = resource && action ? auth.can(resource, action) : true
  setDisabled(el, !allowed)
  bindClickGuard(el)
}

export const registerPermissionDirective = (app: App) => {
  app.directive('permission', {
    mounted(el, binding) {
      applyPermission(el as HTMLElement, binding)
    },
    updated(el, binding) {
      applyPermission(el as HTMLElement, binding)
    },
    unmounted(el) {
      unbindClickGuard(el as HTMLElement)
    }
  })
}
