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
          v-permission="['results','create']"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'results'"
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
import type { ReadResultDTO } from './results.api'
import { createResult, deleteResult, listResults, updateResult } from './results.api'

const { t } = useI18n()

const columns = computed<TableColumn[]>(() => [
  { field: 'id', header: t('field.id'), sortable: true },
  {
    field: 'sample.name',
    header: t('field.sample'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadResultDTO) => row.sample?.name || '-'
  },
  {
    field: 'lab.name',
    header: t('field.department'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadResultDTO) => row.lab?.name || '-'
  },
  {
    field: 'status.name',
    header: t('field.status'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadResultDTO) => row.status?.name || '-'
  },
  {
    field: 'is_done',
    header: t('field.completed'),
    sortable: true,
    filter: {
      type: 'multiSelect',
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false }
      ]
    }
  },
  {
    field: 'received_at',
    header: t('field.receivedAt'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadResultDTO) => (row.received_at ? formatDateTime(row.received_at) : '-')
  },
  {
    field: 'completed_at',
    header: t('field.completedAt'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadResultDTO) => (row.completed_at ? formatDateTime(row.completed_at) : '-')
  }
])

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  'sample.name': { value: '', matchMode: 'contains' },
  'lab.name': { value: '', matchMode: 'contains' },
  'status.name': { value: '', matchMode: 'contains' },
  is_done: { value: null, matchMode: 'in' },
  received_at: { value: null, matchMode: 'between' },
  completed_at: { value: null, matchMode: 'between' }
}

const table = useServerTable<ReadResultDTO>(listResults, {
  presetKey: 'results',
  filters: initialFilters
})

const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)
const dialog = useCrudDialog<ReadResultDTO>('results')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const saving = ref(false)
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadResultDTO>()
const { can } = usePermission()
const canEdit = computed(() => can('results', 'edit'))
const sampleOptions = ref<FormField['options']>([])
const labOptions = ref<FormField['options']>([])
const statusOptions = ref<FormField['options']>([])

const formFields = computed<FormField[]>(() => [
  { key: 'sample_id', label: t('field.sampleId'), type: 'select', required: true, options: sampleOptions.value },
  { key: 'lab_id', label: t('field.departmentId'), type: 'select', options: labOptions.value },
  { key: 'status_id', label: t('field.statusId'), type: 'select', options: statusOptions.value },
  { key: 'is_done', label: t('field.completed'), type: 'boolean' },
  { key: 'comment', label: t('field.comment'), type: 'textarea' },
  { key: 'recommendation', label: t('field.text'), type: 'textarea' },
  { key: 'received_at', label: t('field.receivedAt'), type: 'date' },
  { key: 'completed_at', label: t('field.completedAt'), type: 'date' }
])

const dialogTitle = computed(() => {
  if (mode.value === 'create') {
    return `${t('button.create')} ${t('resource.results')}`
  }
  if (mode.value === 'edit') {
    return `${t('dialog.edit')} ${t('resource.results')}`
  }
  return t('resource.results')
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
    loadReferenceOptions('/labs').then((options) => {
      labOptions.value = options
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
      const response = await createResult(payload)
      table.data.value = [response.data, ...table.data.value]
    } else if (selected.value?.id) {
      const response = await updateResult(selected.value.id, payload)
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

const confirmDelete = (row: ReadResultDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await deleteResult(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('common.deleteFailed'))
    }
  })
}
</script>
