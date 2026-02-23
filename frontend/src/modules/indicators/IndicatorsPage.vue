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
          v-permission="['indicators','create']"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'indicators'"
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
import { loadReferenceOptions } from '@/shared/api/reference'
import type { FormField } from '@/shared/types/form'
import type { TableColumn, TableFilters } from '@/shared/types/table'
import type { ReadIndicatorDTO } from './indicators.api'
import { createIndicator, deleteIndicator, listIndicators, updateIndicator } from './indicators.api'

const { t } = useI18n()

const columns = computed<TableColumn[]>(() => [
  { field: 'id', header: t('field.id'), sortable: true },
  {
    field: 'name',
    header: t('field.name'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'unit',
    header: t('field.unit'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'norm_text',
    header: t('field.norm'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'sample_type.name',
    header: t('field.sampleType'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadIndicatorDTO) => row.sample_type?.name || '-'
  },
  {
    field: 'lab.name',
    header: t('field.department'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadIndicatorDTO) => row.lab?.name || '-'
  }
])

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  name: { value: '', matchMode: 'contains' },
  unit: { value: '', matchMode: 'contains' },
  norm_text: { value: '', matchMode: 'contains' },
  'sample_type.name': { value: '', matchMode: 'contains' },
  'lab.name': { value: '', matchMode: 'contains' }
}

const table = useServerTable<ReadIndicatorDTO>(listIndicators, {
  presetKey: 'indicators',
  filters: initialFilters
})

const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)
const dialog = useCrudDialog<ReadIndicatorDTO>('indicators')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const saving = ref(false)
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadIndicatorDTO>()
const { can } = usePermission()
const canEdit = computed(() => can('indicators', 'edit'))
const sampleTypeOptions = ref<FormField['options']>([])
const labOptions = ref<FormField['options']>([])

const formFields = computed<FormField[]>(() => [
  { key: 'name', label: t('field.name'), type: 'text', required: true },
  { key: 'unit', label: t('field.unit'), type: 'text' },
  { key: 'norm_text', label: t('field.norm'), type: 'text' },
  { key: 'norm_value', label: t('field.value'), type: 'text' },
  { key: 'default_text', label: t('field.text'), type: 'textarea' },
  { key: 'comment', label: t('field.comment'), type: 'textarea' },
  { key: 'sample_type_id', label: t('field.sampleTypeId'), type: 'select', options: sampleTypeOptions.value },
  { key: 'lab_id', label: t('field.departmentId'), type: 'select', options: labOptions.value }
])

const dialogTitle = computed(() => {
  if (mode.value === 'create') {
    return `${t('button.create')} ${t('resource.indicators')}`
  }
  if (mode.value === 'edit') {
    return `${t('dialog.edit')} ${t('resource.indicators')}`
  }
  return t('resource.indicators')
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
    loadReferenceOptions('/sample_types').then((options) => {
      sampleTypeOptions.value = options
    }),
    loadReferenceOptions('/labs').then((options) => {
      labOptions.value = options
    })
  ])
})

const onSave = async (payload: Record<string, any>) => {
  saving.value = true
  try {
    if (mode.value === 'create') {
      const response = await createIndicator(payload)
      table.data.value = [response.data, ...table.data.value]
    } else if (selected.value?.id) {
      const response = await updateIndicator(selected.value.id, payload)
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

const confirmDelete = (row: ReadIndicatorDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await deleteIndicator(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('common.deleteFailed'))
    }
  })
}
</script>
