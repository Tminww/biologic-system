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
          v-permission="['protocols','create']"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'protocols'"
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
import type { ReadProtocolDTO } from './protocols.api'
import { createProtocol, deleteProtocol, listProtocols, updateProtocol } from './protocols.api'

const { t } = useI18n()

const columns = computed<TableColumn[]>(() => [
  { field: 'id', header: t('field.id'), sortable: true },
  {
    field: 'year_no',
    header: t('field.year'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'copies',
    header: t('field.value'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'protocol_type.name',
    header: t('field.protocolType'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadProtocolDTO) => row.protocol_type?.name || '-'
  },
  {
    field: 'conclusion.name',
    header: t('field.conclusion'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadProtocolDTO) => row.conclusion?.name || '-'
  },
  {
    field: 'is_signed',
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
    field: 'issued_at',
    header: t('field.createdAt'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadProtocolDTO) => (row.issued_at ? formatDateTime(row.issued_at) : '-')
  }
])

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  year_no: { value: '', matchMode: 'contains' },
  copies: { value: '', matchMode: 'contains' },
  'protocol_type.name': { value: '', matchMode: 'contains' },
  'conclusion.name': { value: '', matchMode: 'contains' },
  is_signed: { value: null, matchMode: 'in' },
  issued_at: { value: null, matchMode: 'between' }
}

const table = useServerTable<ReadProtocolDTO>(listProtocols, {
  presetKey: 'protocols',
  filters: initialFilters
})

const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)
const dialog = useCrudDialog<ReadProtocolDTO>('protocols')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const saving = ref(false)
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadProtocolDTO>()
const { can } = usePermission()
const canEdit = computed(() => can('protocols', 'edit'))
const protocolTypeOptions = ref<FormField['options']>([])
const conclusionOptions = ref<FormField['options']>([])

const formFields = computed<FormField[]>(() => [
  { key: 'year_no', label: t('field.year'), type: 'number', required: true },
  { key: 'copies', label: t('field.value'), type: 'number' },
  { key: 'is_signed', label: t('field.active'), type: 'boolean' },
  { key: 'protocol_copy_name', label: t('field.name'), type: 'text' },
  { key: 'excerpt_copy_name', label: t('field.text'), type: 'text' },
  {
    key: 'protocol_type_id',
    label: t('field.protocolTypeId'),
    type: 'select',
    options: protocolTypeOptions.value
  },
  { key: 'conclusion_id', label: t('field.conclusionId'), type: 'select', options: conclusionOptions.value },
  { key: 'issued_at', label: t('field.createdAt'), type: 'date' }
])

const dialogTitle = computed(() => {
  if (mode.value === 'create') {
    return `${t('button.create')} ${t('resource.protocols')}`
  }
  if (mode.value === 'edit') {
    return `${t('dialog.edit')} ${t('resource.protocols')}`
  }
  return t('resource.protocols')
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
    loadReferenceOptions('/protocol_types').then((options) => {
      protocolTypeOptions.value = options
    }),
    loadReferenceOptions('/conclusions').then((options) => {
      conclusionOptions.value = options
    })
  ])
})

const onSave = async (payload: Record<string, any>) => {
  saving.value = true
  try {
    if (mode.value === 'create') {
      const response = await createProtocol(payload)
      table.data.value = [response.data, ...table.data.value]
    } else if (selected.value?.id) {
      const response = await updateProtocol(selected.value.id, payload)
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

const confirmDelete = (row: ReadProtocolDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await deleteProtocol(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('common.deleteFailed'))
    }
  })
}
</script>
