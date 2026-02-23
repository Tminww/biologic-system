<template>
  <div v-if="hasAccess" class="access-summary">
    <Tag
      v-for="action in actions"
      :key="action.key"
      :icon="action.icon"
      :severity="action.severity"
      :value="String(summary[action.key])"
      :title="t(`action.${action.key}`)"
    />
  </div>
  <span v-else class="access-empty">{{ t('noAccess') }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Tag from 'primevue/tag'
import { useI18n } from '@/shared/i18n/i18n'
import type { PermissionSummary } from '@/shared/types/permissions'
import type { ReadUserTypeDTO } from './user-types.api'

const props = defineProps<{
  row: ReadUserTypeDTO
}>()

const { t } = useI18n()

const summary = computed<PermissionSummary>(() => ({
  view: props.row.permissionsSummary?.view ?? 0,
  create: props.row.permissionsSummary?.create ?? 0,
  edit: props.row.permissionsSummary?.edit ?? 0,
  delete: props.row.permissionsSummary?.delete ?? 0
}))

const hasAccess = computed(() => Object.values(summary.value).some((value) => value > 0))

const actions = [
  { key: 'view', icon: 'pi pi-eye', severity: 'info' },
  { key: 'create', icon: 'pi pi-plus', severity: 'success' },
  { key: 'edit', icon: 'pi pi-pencil', severity: 'warning' },
  { key: 'delete', icon: 'pi pi-trash', severity: 'danger' }
] as const
</script>

<style scoped>
.access-summary {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: nowrap;
}

.access-summary :deep(.p-tag) {
  font-size: 0.75rem;
  padding: 0 0.35rem;
}

.access-empty {
  color: #8c9494;
  font-size: 0.85rem;
}
</style>
