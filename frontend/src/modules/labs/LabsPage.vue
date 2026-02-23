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
          v-permission="['labs','create']"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'labs'"
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
import type { ReadLabDTO } from './labs.api'
import { createLab, deleteLab, listLabs, updateLab } from './labs.api'

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
    field: 'branch.name',
    header: t('field.branch'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadLabDTO) => row.branch?.name || '-'
  }
])

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  code: { value: '', matchMode: 'contains' },
  name: { value: '', matchMode: 'contains' },
  full_name: { value: '', matchMode: 'contains' },
  'branch.name': { value: '', matchMode: 'contains' }
}

const table = useServerTable<ReadLabDTO>(listLabs, {
  presetKey: 'labs',
  filters: initialFilters
})

const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)
const dialog = useCrudDialog<ReadLabDTO>('labs')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const saving = ref(false)
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadLabDTO>()
const { can } = usePermission()
const canEdit = computed(() => can('labs', 'edit'))
const branchOptions = ref<FormField['options']>([])

const formFields = computed<FormField[]>(() => [
  { key: 'code', label: t('field.code'), type: 'text' },
  { key: 'name', label: t('field.name'), type: 'text', required: true },
  { key: 'full_name', label: t('field.nameFull'), type: 'text' },
  { key: 'branch_id', label: t('field.branchId'), type: 'select', options: branchOptions.value }
])

const dialogTitle = computed(() => {
  if (mode.value === 'create') {
    return `${t('button.create')} ${t('resource.labs')}`
  }
  if (mode.value === 'edit') {
    return `${t('dialog.edit')} ${t('resource.labs')}`
  }
  return t('resource.labs')
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
    loadReferenceOptions('/branches').then((options) => {
      branchOptions.value = options
    })
  ])
})

const onSave = async (payload: Record<string, any>) => {
  saving.value = true
  try {
    if (mode.value === 'create') {
      const response = await createLab(payload)
      table.data.value = [response.data, ...table.data.value]
    } else if (selected.value?.id) {
      const response = await updateLab(selected.value.id, payload)
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

const confirmDelete = (row: ReadLabDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await deleteLab(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('common.deleteFailed'))
    }
  })
}
</script>
