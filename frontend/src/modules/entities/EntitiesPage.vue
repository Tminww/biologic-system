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
          v-permission="['objects', 'create']"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'objects'"
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
import { useOptimistic } from '@/shared/composables/useOptimistic'
import { useConfirmDelete } from '@/shared/components/ConfirmDelete'
import { useToast } from '@/shared/composables/useToast'
import { useI18n } from '@/shared/i18n/i18n'
import { usePermission } from '@/shared/composables/usePermission'
import { formatDateTime } from '@/shared/utils/datetime'
import { loadReferenceOptions } from '@/shared/api/reference'
import type { FormField } from '@/shared/types/form'
import type { TableColumn, TableFilters } from '@/shared/types/table'
import type {
  CreateEntityDTO,
  ReadEntityDTO,
  ReadListEntityDTO,
  UpdateEntityDTO
} from './entities.api'
import * as entitiesApi from './entities.api'

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  code: { value: '', matchMode: 'contains' },
  name: { value: '', matchMode: 'contains' },
  full_name: { value: '', matchMode: 'contains' },
  address: { value: '', matchMode: 'contains' },
  'branch.name': { value: '', matchMode: 'contains' },
  updated_at: { value: null, matchMode: 'between' }
}

const { t } = useI18n()

const columns = computed<TableColumn[]>(() => [
  { field: 'id', header: t('field.id'), sortable: true },
  {
    field: 'code',
    header: t('field.code'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'name',
    header: t('field.name'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'full_name',
    header: t('field.nameFull'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') }
  },
  {
    field: 'address',
    header: t('field.address'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.address') }
  },
  {
    field: 'branch.name',
    header: t('field.branch'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadListEntityDTO) => row.branch?.name || row.branch_id || '-'
  },
  {
    field: 'updated_at',
    header: t('field.updatedAt'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadListEntityDTO) => formatDateTime(row.updated_at)
  }
])

const table = useServerTable<ReadListEntityDTO>(entitiesApi.listEntities, {
  presetKey: 'objects',
  filters: initialFilters
})

const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)

provide(TABLE_PRESETS_KEY, {
  presets: table.presets,
  savePreset: table.savePreset,
  applyPreset: table.applyPreset,
  deletePreset: table.deletePreset
})

const dialog = useCrudDialog<ReadListEntityDTO>('objects')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const optimistic = useOptimistic<ReadListEntityDTO>()
const confirm = useConfirmDelete()
const toast = useToast()
const { can } = usePermission()
const saving = ref(false)
const branchOptions = ref<FormField['options']>([])

onMounted(async () => {
  await Promise.all([
    table.fetch(),
    loadReferenceOptions('/branches').then((options) => {
      branchOptions.value = options
    })
  ])
})

const canEdit = computed(() => can('objects', 'edit'))
const formFields = computed<FormField[]>(() => [
  { key: 'code', label: t('field.code'), type: 'text', required: true },
  { key: 'name', label: t('field.name'), type: 'text', required: true },
  { key: 'full_name', label: t('field.nameFull'), type: 'text' },
  { key: 'address', label: t('field.address'), type: 'text' },
  { key: 'branch_id', label: t('field.branchId'), type: 'select', options: branchOptions.value }
])

const dialogTitle = computed(() => {
  if (mode.value === 'create') {
    return t('objects.createTitle')
  }
  if (mode.value === 'edit') {
    return t('objects.editTitle')
  }
  return t('objects.viewTitle')
})

const onSave = async (payload: CreateEntityDTO | UpdateEntityDTO) => {
  saving.value = true
  try {
    if (mode.value === 'create') {
      const response = await entitiesApi.createEntity(payload as CreateEntityDTO)
      table.data.value = [response.data, ...table.data.value]
      close()
      return
    }

    if (selected.value?.id) {
      const optimisticRow = {
        ...(selected.value || ({} as ReadEntityDTO)),
        ...(payload as UpdateEntityDTO)
      } as ReadListEntityDTO
      const rollback = optimistic.updateItem(table.data, optimisticRow)
      try {
        const response = await entitiesApi.updateEntity(selected.value.id, payload as UpdateEntityDTO)
        table.data.value = table.data.value.map((item) =>
          item.id === selected.value?.id ? response.data : item
        )
        close()
      } catch (error: any) {
        rollback()
        if (error?.code === 'STALE_DATA') {
          toast.warn(t('objects.stale'))
          table.refresh()
        } else {
          toast.error(error?.message || t('objects.saveFailed'))
        }
      }
    }
  } catch (error: any) {
    toast.error(error?.message || t('objects.saveFailed'))
  } finally {
    saving.value = false
  }
}

const confirmDelete = (row: ReadListEntityDTO) => {
  confirm(t('objects.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await entitiesApi.deleteEntity(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('objects.deleteFailed'))
    }
  })
}
</script>
