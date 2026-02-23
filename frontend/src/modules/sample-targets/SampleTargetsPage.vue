<template>
  <div class="card">
    <BaseTable
      ref="tableRef"
      :columns="columns"
      :data="data"
      :total="total"
      :loading="loading"
      v-model:filters="filtersModel"
      @page="table.onPage"
      @sort="table.onSort"
      @filter="table.onFilter"
      @refresh="table.refresh"
    >
      <template #toolbar-actions>
        <Button
          :label="t('button.create')"
          icon="pi pi-plus"
          v-permission="['sample-targets','create']"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'sample-targets'"
          @view="openView(row)"
          @edit="openEdit(row)"
          @delete="confirmDelete(row)"
        />
      </template>
    </BaseTable>

    <CatalogDialog
      :visible="visible"
      :mode="mode"
      :title="dialogTitle"
      :item="selected"
      :fields="formFields"
      :loading="saving"
      :readOnly="readOnly"
      :canEdit="canEdit"
      @close="close"
      @save="onSave"
      @edit="startEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import Button from 'primevue/button'
import BaseTable from '@/shared/components/BaseTable.vue'
import CatalogDialog from '@/shared/components/CatalogDialog.vue'
import RowActions from '@/shared/components/RowActions.vue'
import { useServerTable, TABLE_PRESETS_KEY } from '@/shared/composables/useServerTable'
import { useCrudDialog } from '@/shared/composables/useCrudDialog'
import { useDialogHash } from '@/shared/composables/useDialogHash'
import { useTableHash } from '@/shared/composables/useTableHash'
import { useConfirmDelete } from '@/shared/components/ConfirmDelete'
import { useOptimistic } from '@/shared/composables/useOptimistic'
import { useToast } from '@/shared/composables/useToast'
import { usePermission } from '@/shared/composables/usePermission'
import { useI18n } from '@/shared/i18n/i18n'
import { formatDateTime } from '@/shared/utils/datetime'
import { loadReferenceOptions } from '@/shared/api/reference'
import type { FormField } from '@/shared/types/form'
import type { TableColumn, TableFilters } from '@/shared/types/table'
import type { ReadSampleTargetDTO } from './sample-targets.api'
import {
  createSampleTarget,
  deleteSampleTarget,
  listSampleTargets,
  updateSampleTarget
} from './sample-targets.api'

const { t } = useI18n()

const columns = computed<TableColumn[]>(() => [
  { field: 'id', header: t('field.id'), sortable: true },
  {
    field: 'sample.name',
    header: t('field.sample'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadSampleTargetDTO) => row.sample?.name || '-'
  },
  {
    field: 'research_goal.name',
    header: t('field.target'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadSampleTargetDTO) => row.research_goal?.name || '-'
  },
  {
    field: 'status.name',
    header: t('field.status'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadSampleTargetDTO) => row.status?.name || '-'
  },
  {
    field: 'updated_at',
    header: t('field.updatedAt'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadSampleTargetDTO) => formatDateTime(row.updated_at)
  }
])

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  'sample.name': { value: '', matchMode: 'contains' },
  'research_goal.name': { value: '', matchMode: 'contains' },
  'status.name': { value: '', matchMode: 'contains' },
  updated_at: { value: null, matchMode: 'between' }
}

const table = useServerTable<ReadSampleTargetDTO>(listSampleTargets, {
  presetKey: 'sample-targets',
  filters: initialFilters
})

const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)
const dialog = useCrudDialog<ReadSampleTargetDTO>('sample-targets')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const saving = ref(false)
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadSampleTargetDTO>()
const { can } = usePermission()
const canEdit = computed(() => can('sample-targets', 'edit'))
const sampleOptions = ref<FormField['options']>([])
const researchGoalOptions = ref<FormField['options']>([])
const statusOptions = ref<FormField['options']>([])

const formFields = computed<FormField[]>(() => [
  { key: 'sample_id', label: t('field.sampleId'), type: 'select', required: true, options: sampleOptions.value },
  {
    key: 'research_goal_id',
    label: t('field.targetId'),
    type: 'select',
    required: true,
    options: researchGoalOptions.value
  },
  { key: 'status_id', label: t('field.statusId'), type: 'select', options: statusOptions.value }
])

const dialogTitle = computed(() => {
  if (mode.value === 'create') {
    return `${t('button.create')} ${t('resource.sample-targets')}`
  }
  if (mode.value === 'edit') {
    return `${t('dialog.edit')} ${t('resource.sample-targets')}`
  }
  return t('resource.sample-targets')
})

provide(TABLE_PRESETS_KEY, {
  presets: table.presets,
  savePreset: table.savePreset,
  applyPreset: table.applyPreset,
  deletePreset: table.deletePreset
})

onMounted(async () => {
  await Promise.all([
    table.fetch(),
    loadReferenceOptions('/samples').then((options) => {
      sampleOptions.value = options
    }),
    loadReferenceOptions('/research_goals').then((options) => {
      researchGoalOptions.value = options
    }),
    loadReferenceOptions('/statuses').then((options) => {
      statusOptions.value = options
    })
  ])
})

const onSave = async (payload: Record<string, any>) => {
  saving.value = true
  try {
    if (mode.value === 'create') {
      const response = await createSampleTarget(payload)
      table.data.value = [response.data, ...table.data.value]
    } else if (selected.value?.id) {
      const response = await updateSampleTarget(selected.value.id, payload)
      table.data.value = table.data.value.map((item) =>
        item.id === selected.value?.id ? response.data : item
      )
    }
    close()
  } catch (error: any) {
    toast.error(error?.message || t('common.saveFailed'))
  } finally {
    saving.value = false
  }
}

const confirmDelete = (row: ReadSampleTargetDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await deleteSampleTarget(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('common.deleteFailed'))
    }
  })
}
</script>
