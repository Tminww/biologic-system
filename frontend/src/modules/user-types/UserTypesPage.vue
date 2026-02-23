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
          v-permission="['user-types','create']"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'user-types'"
          @view="openView(row)"
          @edit="openEdit(row)"
          @delete="confirmDelete(row)"
        />
      </template>
    </BaseTable>

    <RoleDialog
      :visible="visible"
      :mode="mode"
      :item="selected"
      :loading="saving"
      :readOnly="readOnly"
      :canEdit="canEdit"
      :permissions="permissions"
      :permissionsLoading="permissionsLoading"
      @close="close"
      @save="onSave"
      @edit="startEdit"
      @update:permissions="updatePermissions"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue'
import Button from 'primevue/button'
import BaseTable from '@/shared/components/BaseTable.vue'
import RoleDialog from './RoleDialog.vue'
import RoleAccessCell from './RoleAccessCell.vue'
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
import { summarizePermissions } from '@/shared/utils/permissions'
import { formatDateTime } from '@/shared/utils/datetime'
import type { TableColumn, TableFilters } from '@/shared/types/table'
import type { Permission } from '@/shared/types/permissions'
import type { ReadUserTypeDTO, UUID } from './user-types.api'
import {
  createUserType,
  deleteUserType,
  getUserTypePermissions,
  listUserTypes,
  updateUserType,
  updateUserTypePermissions
} from './user-types.api'

const { t } = useI18n()

const columns = computed<TableColumn[]>(() => [
  { field: 'id', header: t('field.id'), sortable: true },
  {
    field: 'key',
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
    field: 'updated_at',
    header: t('field.updatedAt'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadUserTypeDTO) => formatDateTime(row.updated_at)
  },
  {
    field: 'permissionsSummary',
    header: t('field.access'),
    sortable: false,
    bodyComponent: RoleAccessCell
  }
])

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  key: { value: '', matchMode: 'contains' },
  name: { value: '', matchMode: 'contains' },
  updated_at: { value: null, matchMode: 'between' }
}

const table = useServerTable<ReadUserTypeDTO>(listUserTypes, {
  presetKey: 'user-types',
  filters: initialFilters
})

const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)
const dialog = useCrudDialog<ReadUserTypeDTO>('user-types')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const saving = ref(false)
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadUserTypeDTO>()
const { can } = usePermission()
const canEdit = computed(() => can('user-types', 'edit'))

const permissionsLoading = ref(false)
const permissions = ref<Permission[]>([])

provide(TABLE_PRESETS_KEY, {
  presets: table.presets,
  savePreset: table.savePreset,
  applyPreset: table.applyPreset,
  deletePreset: table.deletePreset
})

onMounted(() => {
  table.fetch()
})

const updatePermissions = (value: Permission[]) => {
  permissions.value = value
}

const loadPermissions = async (role: ReadUserTypeDTO) => {
  permissionsLoading.value = true
  try {
    const response = await getUserTypePermissions(role.id)
    permissions.value = response.data.permissions
  } catch (error: any) {
    toast.error(error?.message || t('roles.permissionsLoadFailed'))
  } finally {
    permissionsLoading.value = false
  }
}

watch(
  [visible, selected],
  ([isVisible, row]) => {
    if (!isVisible || !row) {
      permissions.value = []
      return
    }
    loadPermissions(row)
  }
)

const onSave = async (payload: { id?: UUID; key: string; name: string }) => {
  saving.value = true
  try {
    if (mode.value === 'create') {
      const response = await createUserType(payload)
      if (permissions.value.length > 0) {
        await updateUserTypePermissions(response.data.id, permissions.value)
      }
      const permissionsSummary = summarizePermissions(permissions.value)
      table.data.value = [response.data, ...table.data.value]
      table.data.value = table.data.value.map((item) =>
        item.id === response.data.id ? { ...item, permissionsSummary } : item
      )
    } else if (selected.value?.id) {
      const response = await updateUserType(selected.value.id, payload)
      await updateUserTypePermissions(selected.value.id, permissions.value)
      const permissionsSummary = summarizePermissions(permissions.value)
      table.data.value = table.data.value.map((item) =>
        item.id === selected.value?.id ? { ...response.data, permissionsSummary } : item
      )
    }
    close()
  } catch (error: any) {
    toast.error(error?.message || t('roles.saveFailed'))
  } finally {
    saving.value = false
  }
}

const confirmDelete = (row: ReadUserTypeDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await deleteUserType(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('roles.deleteFailed'))
    }
  })
}
</script>
