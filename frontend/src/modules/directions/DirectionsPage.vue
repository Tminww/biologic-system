<template>
  <div class="card">
    <BaseTable
      ref="tableRef"
      :columns="columns"
      :data="data"
      :total="total"
      :loading="loading"
      v-model:filters="filtersModel"
      v-model:selection="selectedDirection"
      selectionMode="single"
      :showSelectionColumn="true"
      rowKey="id"
      @page="table.onPage"
      @sort="table.onSort"
      @filter="table.onFilter"
      @refresh="table.refresh"
    >
      <template #toolbar-actions>
        <SplitButton
          :label="t('button.create')"
          :icon="createIcon"
          :model="toolbarActions"
          :buttonProps="createButtonProps"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'directions'"
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

    <ImportDirectionsDialog
      :visible="importVisible"
      :loading="importing"
      @close="closeImport"
      @import="onImport"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import SplitButton from 'primevue/splitbutton'
import BaseTable from '@/shared/components/BaseTable.vue'
import CatalogDialog from '@/shared/components/CatalogDialog.vue'
import RowActions from '@/shared/components/RowActions.vue'
import ImportDirectionsDialog from './ImportDirectionsDialog.vue'
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
import type { ReadDirectionDTO } from './directions.api'
import type { MenuItem } from 'primevue/menuitem'
import {
  createDirection,
  deleteDirection,
  generateDirectionsProtocol,
  importDirections,
  listDirections,
  updateDirection
} from './directions.api'

const { t } = useI18n()

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  year_no: { value: '', matchMode: 'contains' },
  base_no: { value: '', matchMode: 'contains' },
  'doctor.name': { value: '', matchMode: 'contains' },
  'object.name': { value: '', matchMode: 'contains' },
  'status.name': { value: '', matchMode: 'contains' },
  sampled_at: { value: null, matchMode: 'between' },
  received_at: { value: null, matchMode: 'between' },
  completed_at: { value: null, matchMode: 'between' },
  is_done: { value: null, matchMode: 'in' },
  is_urgent: { value: null, matchMode: 'in' }
}

const table = useServerTable<ReadDirectionDTO>(listDirections, {
  presetKey: 'directions',
  filters: initialFilters
})

const columns = computed<TableColumn[]>(() => [
  {
    field: 'id',
    header: t('field.id'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'year_no',
    header: t('field.year'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadDirectionDTO) => row.year_no
  },
  {
    field: 'base_no',
    header: t('field.sequence'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadDirectionDTO) => row.base_no ?? '-'
  },
  {
    field: 'sampled_at',
    header: t('field.sampledTime'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadDirectionDTO) => (row.sampled_at ? formatDateTime(row.sampled_at) : '-')
  },
  {
    field: 'received_at',
    header: t('field.deliveryTime'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadDirectionDTO) => (row.received_at ? formatDateTime(row.received_at) : '-')
  },
  {
    field: 'doctor.name',
    header: t('field.doctor'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadDirectionDTO) => row.doctor?.name || '-'
  },
  {
    field: 'object.name',
    header: t('field.object'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadDirectionDTO) => row.object?.name || '-'
  },
  {
    field: 'status.name',
    header: t('field.status'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadDirectionDTO) => row.status?.name || '-'
  },
  {
    field: 'completed_at',
    header: t('field.releaseTime'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadDirectionDTO) => (row.completed_at ? formatDateTime(row.completed_at) : '-')
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
    },
    body: (row: ReadDirectionDTO) => (row.is_done ? t('common.yes') : t('common.no'))
  },
  {
    field: 'is_urgent',
    header: t('field.active'),
    sortable: true,
    filter: {
      type: 'multiSelect',
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false }
      ]
    },
    body: (row: ReadDirectionDTO) => (row.is_urgent ? t('common.yes') : t('common.no'))
  }
])
const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)
const selectedDirection = ref<ReadDirectionDTO | null>(null)
const dialog = useCrudDialog<ReadDirectionDTO>('directions')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
const importVisible = ref(false)
const importing = ref(false)
const openImport = () => {
  importVisible.value = true
}

const closeImport = () => {
  importVisible.value = false
}

useDialogHash({ items: data, openCreate, openEdit, openView, openImport })
useTableHash({ tableRef })
const saving = ref(false)
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadDirectionDTO>()
const { can } = usePermission()
const canEdit = computed(() => can('directions', 'edit'))
const canCreate = computed(() => can('directions', 'create'))
const createIcon = computed(() => (canCreate.value ? 'pi pi-plus' : 'pi pi-lock'))
const createButtonProps = computed(() => ({
  disabled: !canCreate.value,
  title: !canCreate.value ? t('noAccess') : undefined
}))
const doctorOptions = ref<FormField['options']>([])
const objectOptions = ref<FormField['options']>([])
const statusOptions = ref<FormField['options']>([])

const formFields = computed<FormField[]>(() => [
  { key: 'year_no', label: t('field.year'), type: 'number', required: true },
  { key: 'base_no', label: t('field.sequence'), type: 'number' },
  { key: 'is_done', label: t('field.completed'), type: 'boolean' },
  { key: 'is_urgent', label: t('field.active'), type: 'boolean' },
  { key: 'doctor_id', label: t('field.doctorId'), type: 'select', options: doctorOptions.value },
  { key: 'object_id', label: t('field.objectId'), type: 'select', options: objectOptions.value },
  { key: 'status_id', label: t('field.statusId'), type: 'select', options: statusOptions.value },
  { key: 'sampled_at', label: t('field.sampledAt'), type: 'date' },
  { key: 'received_at', label: t('field.receivedAt'), type: 'date' },
  { key: 'completed_at', label: t('field.completedAt'), type: 'date' }
])

const dialogTitle = computed(() => {
  if (mode.value === 'create') {
    return `${t('button.create')} ${t('resource.directions')}`
  }
  if (mode.value === 'edit') {
    return `${t('dialog.edit')} ${t('resource.directions')}`
  }
  return t('resource.directions')
})
const onPrintAllSamples = () => {}
const onPrintSamplesByDirections = () => {}
const toolbarActions = computed<MenuItem[]>(() => [
  {
    label: t('directions.printAllSamples'),
    icon: 'pi pi-print',
    disabled: !selectedDirection.value,
    command: onPrintAllSamples
  },
  {
    label: t('directions.printLabSamples'),
    icon: 'pi pi-print',
    disabled: !selectedDirection.value,
    command: onPrintSamplesByDirections
  },
  {
    label: t('directions.generateProtocolButton'),
    icon: 'pi pi-file',
    disabled: !selectedDirection.value,
    command: onGenerateProtocol
  },
  {
    label: t('button.import'),
    icon: canCreate.value ? 'pi pi-upload' : 'pi pi-lock',
    disabled: !canCreate.value,
    command: openImport
  }
])

const onGenerateProtocol = async () => {
  if (!selectedDirection.value) {
    return
  }
  try {
    await generateDirectionsProtocol({ ids: [selectedDirection.value.id] })
    toast.success(t('directions.protocolGenerated'))
    selectedDirection.value = null
  } catch (error: any) {
    toast.error(error?.message || t('common.saveFailed'))
  }
}

provide(TABLE_PRESETS_KEY, {
  presets: table.presets,
  savePreset: table.savePreset,
  applyPreset: table.applyPreset,
  deletePreset: table.deletePreset
})

onMounted(() => {
  Promise.all([
    table.fetch(),
    loadReferenceOptions('/doctors').then((options) => {
      doctorOptions.value = options
    }),
    loadReferenceOptions('/objects').then((options) => {
      objectOptions.value = options
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
      const response = await createDirection(payload)
      table.data.value = [response.data, ...table.data.value]
    } else if (selected.value?.id) {
      const response = await updateDirection(selected.value.id, payload)
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

const confirmDelete = (row: ReadDirectionDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await deleteDirection(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('common.deleteFailed'))
    }
  })
}

const onImport = async (file: File) => {
  importing.value = true
  try {
    await importDirections(file)
    toast.success(t('directions.importSuccess'))
    closeImport()
    table.refresh()
  } catch (error: any) {
    toast.error(error?.message || t('directions.importFailed'))
  } finally {
    importing.value = false
  }
}
</script>
