<template>
  <BaseDialog
    :visible="visible"
    mode="view"
    :title="title"
    :readOnly="true"
    :canEdit="false"
    @close="$emit('close')"
  >
    <template #tabs>
      <TabPanel :header="t('tab.details')">
        <div class="record-grid">
          <div v-for="row in displayRows" :key="row.label" class="record-row">
            <span class="record-label">{{ row.label }}</span>
            <span class="record-value">{{ row.value }}</span>
          </div>
        </div>
      </TabPanel>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TabPanel from 'primevue/tabpanel'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import type { TableColumn } from '@/shared/types/table'
import { useI18n } from '@/shared/i18n/i18n'
import { formatDateTime, isIsoDateString } from '@/shared/utils/datetime'

const props = defineProps<{
  visible: boolean
  title: string
  item: Record<string, any> | null
  columns: TableColumn[]
}>()

defineEmits<{
  (e: 'close'): void
}>()

const { t } = useI18n()

const resolveField = (row: Record<string, any>, field: string) =>
  field.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), row)

const formatValue = (value: any) => {
  if (value === null || value === undefined || value === '') {
    return '-'
  }
  if (value instanceof Date) {
    return formatDateTime(value)
  }
  if (typeof value === 'string' && isIsoDateString(value)) {
    return formatDateTime(value)
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

const displayRows = computed(() => {
  if (!props.item) {
    return []
  }
  return props.columns.map((column) => {
    const value = column.body ? column.body(props.item) : resolveField(props.item, column.field)
    return { label: column.header, value: formatValue(value) }
  })
})
</script>

<style scoped>
.record-grid {
  display: grid;
  gap: 0.75rem;
}

.record-row {
  display: grid;
  gap: 0.25rem;
}

.record-label {
  font-size: 0.85rem;
  color: #5b6b6a;
}

.record-value {
  font-weight: 500;
  color: #1e2f2e;
  word-break: break-word;
}
</style>
