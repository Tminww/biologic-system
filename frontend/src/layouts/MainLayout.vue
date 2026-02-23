<template>
  <div :class="['app-shell', { collapsed: ui.sidebarCollapsed }]">
    <aside class="sidebar">
      <nav class="nav-sections">
        <div v-for="section in navSections" :key="section.categoryKey" class="nav-section">
          <div v-if="!ui.sidebarCollapsed" class="nav-section-title">{{ t(section.categoryKey) }}</div>
          <div class="nav-list">
            <RouterLink
              v-for="item in section.items"
              :key="item.id"
              :to="item.to"
              custom
              v-slot="{ navigate, isActive }"
            >
              <a
                :class="['nav-item', { active: isActive, disabled: !isAllowed(item) }]"
                :title="isAllowed(item) ? t(item.labelKey) : t('noAccess')"
                href="#"
                @click.prevent="isAllowed(item) ? navigate() : null"
              >
                <i :class="item.icon" />
                <span v-if="!ui.sidebarCollapsed">{{ t(item.labelKey) }}</span>
                <i v-if="!isAllowed(item)" class="pi pi-lock" />
              </a>
            </RouterLink>
          </div>
        </div>
      </nav>
    </aside>

    <div class="main-panel">
      <header class="topbar">
        <div class="topbar-left">
          <Button
            icon="pi pi-bars"
            severity="secondary"
            text
            @click="ui.toggleSidebar()"
          />
          <div class="topbar-brand" :title="t('brand.title')">
            <span class="brand-mark">
              <i class="pi pi-box" aria-hidden="true" />
            </span>
            <span>{{ t('brand.title') }}</span>
          </div>
          <span v-if="breadcrumbItems.length" class="breadcrumb-prefix">|</span>
          <Breadcrumb v-if="breadcrumbItems.length" :model="breadcrumbItems" class="topbar-breadcrumb" />
        </div>
        <div class="topbar-actions">
          <Button
            type="button"
            icon="pi pi-book"
            severity="secondary"
            text
            class="docs-toggle"
            :aria-label="t('button.docs')"
            :title="t('button.docs')"
            @click="openDocs"
          />
          <Button
            type="button"
            icon="pi pi-globe"
            severity="secondary"
            text
            class="lang-toggle"
            aria-haspopup="true"
            aria-controls="lang_menu"
            :aria-label="t('common.language')"
            :title="t('common.language')"
            @click="toggleLangMenu"
          />
          <Menu ref="langMenu" id="lang_menu" :model="langMenuItems" popup />
          <Button
            type="button"
            :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
            severity="secondary"
            text
            class="theme-toggle"
            :aria-label="isDark ? t('common.themeLight') : t('common.themeDark')"
            :title="isDark ? t('common.themeLight') : t('common.themeDark')"
            @click="toggleTheme"
          />
          <div class="user-summary">
            <span class="user-name">{{ userName }}</span>
            <span class="user-meta">{{ userMeta }}</span>
          </div>
          <Button :label="t('logout')" icon="pi pi-sign-out" text @click="logout" />
        </div>
      </header>
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Breadcrumb from 'primevue/breadcrumb'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { useAuthStore } from '@/modules/auth/auth.store'
import { usePermission } from '@/shared/composables/usePermission'
import { useTheme } from '@/shared/composables/useTheme'
import { useUiStore } from '@/shared/ui/ui.store'
import { useI18n } from '@/shared/i18n/i18n'
import type { Action, Resource } from '@/shared/types/permissions'

const auth = useAuthStore()
const ui = useUiStore()
const route = useRoute()
const router = useRouter()
const { can } = usePermission()
const { t, locale, setLocale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const userName = computed(() => auth.user?.fullName || auth.user?.login || '')
const userMeta = computed(() => {
  const roleKey = auth.user?.role ? `role.${auth.user.role}` : ''
  const roleLabel = roleKey ? t(roleKey) : ''
  const login = auth.user?.login || ''
  if (roleLabel && login && userName.value && login !== userName.value) {
    return `${roleLabel} · ${login}`
  }
  return roleLabel || login
})

const navSections = [
  {
    categoryKey: 'navMain',
    items: [
      {
        id: 'dashboard',
        labelKey: 'resource.dashboard',
        to: '/dashboard',
        icon: 'pi pi-home',
        resource: 'dashboard',
        action: 'view'
      }
    ]
  },
  {
    categoryKey: 'navWorkflows',
    items: [
      {
        id: 'directions',
        labelKey: 'resource.directions',
        to: '/directions',
        icon: 'pi pi-file',
        resource: 'directions',
        action: 'view'
      },
      {
        id: 'samples',
        labelKey: 'resource.samples',
        to: '/samples',
        icon: 'pi pi-box',
        resource: 'samples',
        action: 'view'
      },
      {
        id: 'protocols',
        labelKey: 'resource.protocols',
        to: '/protocols',
        icon: 'pi pi-file-edit',
        resource: 'protocols',
        action: 'view'
      },
      {
        id: 'results',
        labelKey: 'resource.results',
        to: '/results',
        icon: 'pi pi-chart-bar',
        resource: 'results',
        action: 'view'
      },
      {
        id: 'conclusions',
        labelKey: 'resource.conclusions',
        to: '/conclusions',
        icon: 'pi pi-file-check',
        resource: 'conclusions',
        action: 'view'
      },
      {
        id: 'tests',
        labelKey: 'resource.tests',
        to: '/tests',
        icon: 'pi pi-check-circle',
        resource: 'tests',
        action: 'view'
      }
    ]
  },
  {
    categoryKey: 'navStaff',
    items: [
      {
        id: 'doctors',
        labelKey: 'resource.doctors',
        to: '/doctors',
        icon: 'pi pi-user',
        resource: 'doctors',
        action: 'view'
      },
      {
        id: 'branches',
        labelKey: 'resource.branches',
        to: '/branches',
        icon: 'pi pi-building',
        resource: 'branches',
        action: 'view'
      },
      {
        id: 'labs',
        labelKey: 'resource.labs',
        to: '/labs',
        icon: 'pi pi-building-columns',
        resource: 'labs',
        action: 'view'
      },
      {
        id: 'users',
        labelKey: 'resource.users',
        to: '/admin/users',
        icon: 'pi pi-users',
        resource: 'users',
        action: 'view'
      }
    ]
  },
  {
    categoryKey: 'navCatalogs',
    items: [
      {
        id: 'research-goals',
        labelKey: 'resource.research-goals',
        to: '/research-goals',
        icon: 'pi pi-flag',
        resource: 'research-goals',
        action: 'view'
      },
      {
        id: 'sample-targets',
        labelKey: 'resource.sample-targets',
        to: '/sample-targets',
        icon: 'pi pi-sitemap',
        resource: 'sample-targets',
        action: 'view'
      },
      {
        id: 'sample-types',
        labelKey: 'resource.sample-types',
        to: '/sample-types',
        icon: 'pi pi-tags',
        resource: 'sample-types',
        action: 'view'
      },
      {
        id: 'indicators',
        labelKey: 'resource.indicators',
        to: '/indicators',
        icon: 'pi pi-chart-line',
        resource: 'indicators',
        action: 'view'
      },
      {
        id: 'protocol-types',
        labelKey: 'resource.protocol-types',
        to: '/protocol-types',
        icon: 'pi pi-bookmark',
        resource: 'protocol-types',
        action: 'view'
      },
      {
        id: 'statuses',
        labelKey: 'resource.statuses',
        to: '/statuses',
        icon: 'pi pi-align-left',
        resource: 'statuses',
        action: 'view'
      },
      {
        id: 'user-types',
        labelKey: 'resource.user-types',
        to: '/user-types',
        icon: 'pi pi-users',
        resource: 'user-types',
        action: 'view'
      },
      {
        id: 'objects',
        labelKey: 'resource.objects',
        to: '/objects',
        icon: 'pi pi-cog',
        resource: 'objects',
        action: 'view'
      }
    ]
  }
]

const isAllowed = (item: { resource: Resource; action: Action }) => can(item.resource, item.action)
const navItems = computed(() => navSections.flatMap((section) => section.items))
const currentNavItem = computed(() => {
  const path = route.path
  return (
    navItems.value.find((item) => item.to === path) ||
    navItems.value.find((item) => path.startsWith(`${item.to}/`)) ||
    null
  )
})
const breadcrumbItems = computed(() => {
  if (currentNavItem.value) {
    return [{ label: t(currentNavItem.value.labelKey) }]
  }
  const metaTitle = route.meta?.title
  if (typeof metaTitle === 'string' && metaTitle) {
    return [{ label: metaTitle }]
  }
  if (typeof route.name === 'string' && route.name) {
    return [{ label: route.name }]
  }
  return []
})

const langMenu = ref<InstanceType<typeof Menu> | null>(null)
const langMenuItems = computed<MenuItem[]>(() => {
  const current = locale.value
  return [
    {
      label: 'Русский',
      icon: current === 'ru' ? 'pi pi-check' : undefined,
      command: () => setLocale('ru')
    },
    {
      label: 'English',
      icon: current === 'en' ? 'pi pi-check' : undefined,
      command: () => setLocale('en')
    }
  ]
})

const toggleLangMenu = (event: Event) => {
  langMenu.value?.toggle(event)
}

const docsUrl = import.meta.env.VITE_DOCS_URL || 'http://127.0.0.1:3000'

const openDocs = () => {
  window.open(docsUrl, '_blank', 'noopener,noreferrer')
}

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.topbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.docs-toggle {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #d7e2e1;
  background: #f4f8f7;
  box-shadow: none;
}

.lang-toggle {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #d7e2e1;
  background: #f4f8f7;
  box-shadow: none;
}

.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #d7e2e1;
  background: #f4f8f7;
  box-shadow: none;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.topbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}

.topbar-breadcrumb {
  padding: 0;
  border: none;
  background: transparent;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
}

.breadcrumb-prefix {
  color: #6a7b7a;
  font-size: 0.95rem;
  margin: 0 0.15rem;
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

.topbar-breadcrumb :deep(.p-breadcrumb-list) {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.topbar-breadcrumb :deep(.p-breadcrumb-item) {
  display: flex;
  align-items: center;
}

.topbar-breadcrumb :deep(.p-menuitem-text) {
  line-height: 1;
}

.user-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
  min-width: 140px;
}

.user-name {
  font-weight: 600;
  color: #1f2d2c;
}

.user-meta {
  font-size: 0.8rem;
  color: #6a7b7a;
}

.nav-item i.pi-lock {
  margin-left: auto;
  font-size: 0.9rem;
}
</style>
