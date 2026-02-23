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
          v-permission="['tests','create']"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'tests'"
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
import type { ReadTestDTO } from './tests.api'
import { createTest, deleteTest, listTests, updateTest } from './tests.api'

const { t } = useI18n()

const columns = computed<TableColumn[]>(() => [
  { field: 'id', header: t('field.id'), sortable: true },
  {
    field: 'result.name',
    header: t('field.result'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadTestDTO) => row.result?.name || '-'
  },
  {
    field: 'indicator.name',
    header: t('field.indicator'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadTestDTO) => row.indicator?.name || '-'
  },
  {
    field: 'status.name',
    header: t('field.status'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadTestDTO) => row.status?.name || '-'
  },
  {
    field: 'value',
    header: t('field.value'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'is_active',
    header: t('field.active'),
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
    field: 'updated_at',
    header: t('field.updatedAt'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadTestDTO) => formatDateTime(row.updated_at)
  }
])

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  'result.name': { value: '', matchMode: 'contains' },
  'indicator.name': { value: '', matchMode: 'contains' },
  'status.name': { value: '', matchMode: 'contains' },
  value: { value: '', matchMode: 'contains' },
  is_active: { value: null, matchMode: 'in' },
  updated_at: { value: null, matchMode: 'between' }
}

const table = useServerTable<ReadTestDTO>(listTests, {
  presetKey: 'tests',
  filters: initialFilters
})

const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)
const dialog = useCrudDialog<ReadTestDTO>('tests')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const saving = ref(false)
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadTestDTO>()
const { can } = usePermission()
const canEdit = computed(() => can('tests', 'edit'))
const resultOptions = ref<FormField['options']>([])
const indicatorOptions = ref<FormField['options']>([])
const statusOptions = ref<FormField['options']>([])

const formFields = computed<FormField[]>(() => [
  { key: 'result_id', label: t('field.resultId'), type: 'select', required: true, options: resultOptions.value },
  { key: 'indicator_id', label: t('field.indicatorId'), type: 'select', options: indicatorOptions.value },
  { key: 'status_id', label: t('field.statusId'), type: 'select', options: statusOptions.value },
  { key: 'value', label: t('field.value'), type: 'text' },
  { key: 'norm', label: t('field.norm'), type: 'text' },
  { key: 'comment', label: t('field.comment'), type: 'textarea' },
  { key: 'is_active', label: t('field.active'), type: 'boolean' }
])

const dialogTitle = computed(() => {
  if (mode.value === 'create') {
    return `${t('button.create')} ${t('resource.tests')}`
  }
  if (mode.value === 'edit') {
    return `${t('dialog.edit')} ${t('resource.tests')}`
  }
  return t('resource.tests')
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
    loadReferenceOptions('/results').then((options) => {
      resultOptions.value = options
    }),
    loadReferenceOptions('/indicators').then((options) => {
      indicatorOptions.value = options
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
      const response = await createTest(payload)
      table.data.value = [response.data, ...table.data.value]
    } else if (selected.value?.id) {
      const response = await updateTest(selected.value.id, payload)
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

const confirmDelete = (row: ReadTestDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await deleteTest(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('common.deleteFailed'))
    }
  })
}
</script>
