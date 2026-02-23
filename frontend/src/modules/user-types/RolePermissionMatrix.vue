<template>
  <Accordion
    class="permissions-accordion"
    expandIcon="pi pi-chevron-down"
    collapseIcon="pi pi-chevron-up"
  >
    <AccordionTab v-for="resource in resources" :key="resource">
      <template #header>
        <OverlayBadge
          v-if="allowedCount(resource) > 0"
          class="permissions-accordion-badge"
          severity="success"
          :value="allowedCount(resource)"
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
              :outlined="!isAllowed(resource, action)"
              severity="success"
              :disabled="readOnly"
              @click="setPermission(resource, action, true)"
            >
              {{ t('permission.allow') }}
            </Button>
            <Button
              size="small"
              :outlined="isAllowed(resource, action)"
              severity="secondary"
              :disabled="readOnly"
              @click="setPermission(resource, action, false)"
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
import type { Action, Permission, Resource } from '@/shared/types/permissions'

const props = defineProps<{
  permissions: Permission[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:permissions', value: Permission[]): void
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

const allowedSet = computed(() => {
  const set = new Set<string>()
  props.permissions.forEach((perm) => {
    set.add(`${perm.resource}:${perm.action}`)
  })
  return set
})

const isAllowed = (resource: Resource, action: Action) =>
  allowedSet.value.has(`${resource}:${action}`)

const allowedCount = (resource: Resource) =>
  props.permissions.filter((perm) => perm.resource === resource).length

const setPermission = (resource: Resource, action: Action, allowed: boolean) => {
  if (props.readOnly) {
    return
  }
  const next = props.permissions.filter(
    (perm) => !(perm.resource === resource && perm.action === action)
  )
  if (allowed) {
    next.push({ resource, action })
  }
  emit('update:permissions', next)
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
