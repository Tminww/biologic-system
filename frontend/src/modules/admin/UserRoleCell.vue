<template>
  <div class="role-cell">
    <OverlayBadge v-if="overridesCount > 0" class="role-badge" severity="danger" :value="overridesCount">
      <span class="role-label role-label--padded">{{ roleLabel }}</span>
    </OverlayBadge>
    <span v-else class="role-label">{{ roleLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import OverlayBadge from 'primevue/overlaybadge'
import { useI18n } from '@/shared/i18n/i18n'

const props = defineProps<{
  row: {
    id: string
    role?:
      | string
      | {
          id: string
          name: string | null
          code: string | null
        }
      | null
    overridesCount?: number
  }
}>()

const { t } = useI18n()

const roleLabel = computed(() => {
  const rawRole = typeof props.row.role === 'string' ? props.row.role : props.row.role?.code
  if (!rawRole) {
    return props.row.role && typeof props.row.role !== 'string'
      ? props.row.role.name || '-'
      : '-'
  }
  const key = `role.${rawRole}`
  const label = t(key)
  if (label !== key) {
    return label
  }
  if (props.row.role && typeof props.row.role !== 'string') {
    return props.row.role.name || rawRole
  }
  return rawRole
})

const overridesCount = computed(() => {
  if (typeof props.row.overridesCount === 'number') {
    return props.row.overridesCount
  }
  if (typeof window === 'undefined') {
    return 0
  }
  try {
    const raw = window.localStorage.getItem('mock_overrides_v3')
    if (!raw) {
      return 0
    }
    const parsed = JSON.parse(raw) as Record<string, unknown[]>
    const list = parsed[String(props.row.id)]
    return Array.isArray(list) ? list.length : 0
  } catch {
    return 0
  }
})
</script>

<style scoped>
.role-cell {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  overflow: visible;
}

.role-label {
  display: inline-flex;
  align-items: center;
}

.role-label--padded {
  padding-right: 0.75rem;
}

.role-badge :deep(.p-badge) {
  font-size: 0.65rem;
  min-width: 1.1rem;
  height: 1.1rem;
  line-height: 1.1rem;
  padding: 0 0.35rem;
  right: 0.1rem;
  top: 0.1rem;
  transform: translate(0, -40%);
}
</style>
