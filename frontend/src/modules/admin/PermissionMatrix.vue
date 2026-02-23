<template>
  <Accordion
    class="permissions-accordion"
    expandIcon="pi pi-chevron-down"
    collapseIcon="pi pi-chevron-up"
  >
    <AccordionTab v-for="resource in resources" :key="resource">
      <template #header>
        <OverlayBadge
          v-if="overrideCount(resource) > 0"
          class="permissions-accordion-badge"
          severity="danger"
          :value="overrideCount(resource)"
        >
          <span class="permissions-accordion-title permissions-accordion-title--padded">
            {{ t(`resource.${resource}`) }}
          </span>
        </OverlayBadge>
        <span v-else class="permissions-accordion-title">{{ t(`resource.${resource}`) }}</span>
      </template>
      <div class="matrix">
        <div v-for="action in actions" :key="action" class="matrix-row">
          <div class="matrix-label">{{ t(`action.${action}`) }}</div>
          <div class="permission-actions">
            <Button
              size="small"
              :outlined="state(resource, action) !== 'inherit'"
              :severity="inheritedAllowed(resource, action) ? 'success' : 'secondary'"
              :disabled="readOnly"
              @click="setState(resource, action, 'inherit')"
            >
              {{ t('permission.inherit') }} ({{ inheritedAllowed(resource, action) ? t('permission.allowed') : t('permission.denied') }})
            </Button>
            <Button
              size="small"
              :outlined="state(resource, action) !== 'allow'"
              severity="success"
              :disabled="readOnly"
              @click="setState(resource, action, 'allow')"
            >
              {{ t('permission.allow') }}
            </Button>
            <Button
              size="small"
              :outlined="state(resource, action) !== 'deny'"
              severity="danger"
              :disabled="readOnly"
              @click="setState(resource, action, 'deny')"
            >
              {{ t('permission.deny') }}
            </Button>
          </div>
        </div>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import OverlayBadge from 'primevue/overlaybadge'
import Button from 'primevue/button'
import { useI18n } from '@/shared/i18n/i18n'
import type { Permission, PermissionOverride, Resource, Action } from '@/shared/types/permissions'

const props = defineProps<{
  rolePermissions: Permission[]
  overrides: PermissionOverride[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:overrides', value: PermissionOverride[]): void
}>()

const resources: Resource[] = [
  'dashboard',
  'directions',
  'samples',
  'sample-targets',
  'protocols',
  'results',
  'conclusions',
  'tests',
  'doctors',
  'branches',
  'labs',
  'users',
  'research-goals',
  'sample-types',
  'indicators',
  'protocol-types',
  'statuses',
  'user-types',
  'objects'
]
const actions: Action[] = ['view', 'create', 'edit', 'delete']
const { t } = useI18n()

const overridesByResource = computed(() => {
  const map = new Map<Resource, number>()
  resources.forEach((resource) => map.set(resource, 0))
  props.overrides.forEach((override) => {
    map.set(override.resource, (map.get(override.resource) || 0) + 1)
  })
  return map
})

const overrideCount = (resource: Resource) => overridesByResource.value.get(resource) || 0

const inheritedAllowed = (resource: Resource, action: Action) =>
  props.rolePermissions.some((perm) => perm.resource === resource && perm.action === action)

const findOverride = (resource: Resource, action: Action) =>
  props.overrides.find((item) => item.resource === resource && item.action === action)

const state = (resource: Resource, action: Action) => {
  const override = findOverride(resource, action)
  if (!override) {
    return 'inherit'
  }
  return override.allowed ? 'allow' : 'deny'
}

const setState = (resource: Resource, action: Action, next: 'inherit' | 'allow' | 'deny') => {
  if (props.readOnly) {
    return
  }
  const nextOverrides = props.overrides.filter(
    (item) => !(item.resource === resource && item.action === action)
  )
  if (next === 'allow') {
    nextOverrides.push({ resource, action, allowed: true })
  }
  if (next === 'deny') {
    nextOverrides.push({ resource, action, allowed: false })
  }
  emit('update:overrides', nextOverrides)
}
</script>

<style scoped>
.permissions-accordion :deep(.p-accordion-toggle-icon) {
  opacity: 1;
}

.permissions-accordion :deep(.p-accordion-header-link) {
  display: flex;
  align-items: center;
}

.permissions-accordion-title {
  display: inline-flex;
  align-items: center;
}

.permissions-accordion-title--padded {
  padding-right: 0.75rem;
}

.permissions-accordion-badge :deep(.p-badge) {
  font-size: 0.65rem;
  min-width: 1.1rem;
  height: 1.1rem;
  line-height: 1.1rem;
  padding: 0 0.35rem;
  transform: translate(30%, -40%);
}

.matrix {
  display: grid;
  gap: 1rem;
}

.matrix-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 1rem;
}

.matrix-label {
  font-weight: 500;
}

@media (max-width: 700px) {
  .matrix-row {
    grid-template-columns: 1fr;
  }
}
</style>
