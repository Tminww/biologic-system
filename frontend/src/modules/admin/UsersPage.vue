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
          icon="pi pi-user-plus"
          v-permission="['users','create']"
          @click="openCreate()"
        />
      </template>
      <template #actions="{ row }">
        <RowActions
          :resource="'users'"
          @view="openView(row)"
          @edit="openEdit(row)"
          @delete="confirmDelete(row)"
        />
      </template>
    </BaseTable>

    <UserDialog
      :visible="visible"
      :mode="mode"
      :item="selected"
      :loading="saving"
      :readOnly="readOnly"
      :canEdit="canEdit"
      :rolePermissions="rolePermissions"
      :overrides="overrides"
      :permissionsLoading="permissionsLoading"
      :roleOptions="roleOptions"
      :labOptions="labOptions"
      @close="close"
      @save="onSave"
      @edit="startEdit"
      @update:overrides="updateOverrides"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue'
import Button from 'primevue/button'
import BaseTable from '@/shared/components/BaseTable.vue'
import UserDialog from './UserDialog.vue'
import RowActions from '@/shared/components/RowActions.vue'
import { useServerTable, TABLE_PRESETS_KEY } from '@/shared/composables/useServerTable'
import { useCrudDialog } from '@/shared/composables/useCrudDialog'
import { useDialogHash } from '@/shared/composables/useDialogHash'
import { useTableHash } from '@/shared/composables/useTableHash'
import { useOptimistic } from '@/shared/composables/useOptimistic'
import { useConfirmDelete } from '@/shared/components/ConfirmDelete'
import { usePermission } from '@/shared/composables/usePermission'
import { useToast } from '@/shared/composables/useToast'
import { useI18n } from '@/shared/i18n/i18n'
import { formatDateTime } from '@/shared/utils/datetime'
import { loadReferenceOptions } from '@/shared/api/reference'
import type { FieldOption } from '@/shared/types/form'
import type { TableColumn, TableFilters } from '@/shared/types/table'
import type { Permission, PermissionOverride } from '@/shared/types/permissions'
import type { CreateUserDTO, ReadUserDTO, UpdateUserDTO } from './admin.api'
import * as adminApi from './admin.api'
import { useAuthStore } from '@/modules/auth/auth.store'
import UserRoleCell from './UserRoleCell.vue'

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  username: { value: '', matchMode: 'contains' },
  code: { value: '', matchMode: 'contains' },
  first_name: { value: '', matchMode: 'contains' },
  last_name: { value: '', matchMode: 'contains' },
  patronymic: { value: '', matchMode: 'contains' },
  'role.name': { value: '', matchMode: 'contains' },
  'lab.name': { value: '', matchMode: 'contains' },
  is_registrar: { value: null, matchMode: 'in' },
  is_lab_head: { value: null, matchMode: 'in' },
  is_branch_head: { value: null, matchMode: 'in' },
  updated_at: { value: null, matchMode: 'between' }
}

const { t } = useI18n()

const columns = computed<TableColumn[]>(() => [
  { field: 'id', header: t('field.id'), sortable: true },
  {
    field: 'username',
    header: t('field.username'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.login') }
  },
  {
    field: 'code',
    header: t('field.code'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadUserDTO) => row.code || '-'
  },
  {
    field: 'first_name',
    header: t('field.name'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadUserDTO) => row.first_name || '-'
  },
  {
    field: 'last_name',
    header: t('field.nameFull'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadUserDTO) => [row.last_name, row.patronymic].filter(Boolean).join(' ') || '-'
  },
  {
    field: 'role.name',
    header: t('field.role'),
    sortable: true,
    bodyClass: 'role-cell-column',
    filter: { type: 'text', placeholder: t('filter.default') },
    bodyComponent: UserRoleCell
  },
  {
    field: 'lab.name',
    header: t('field.department'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.department') },
    body: (row: ReadUserDTO) => row.lab?.name || '-'
  },
  {
    field: 'is_registrar',
    header: 'Registrar',
    sortable: true,
    filter: {
      type: 'multiSelect',
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false }
      ]
    },
    body: (row: ReadUserDTO) => (row.is_registrar ? t('common.yes') : t('common.no'))
  },
  {
    field: 'updated_at',
    header: t('field.updatedAt'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadUserDTO) => formatDateTime(row.updated_at)
  }
])

const table = useServerTable<ReadUserDTO>(adminApi.listUsers, {
  presetKey: 'users',
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

const dialog = useCrudDialog<ReadUserDTO>('users')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } = dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const optimistic = useOptimistic<ReadUserDTO>()
const confirm = useConfirmDelete()
const toast = useToast()
const saving = ref(false)
const auth = useAuthStore()
const { can } = usePermission()
const canEdit = computed(() => can('users', 'edit'))
const roleOptions = ref<FieldOption[]>([])
const labOptions = ref<FieldOption[]>([])

onMounted(async () => {
  await Promise.all([
    table.fetch(),
    loadReferenceOptions('/roles').then((options) => {
      roleOptions.value = options
    }),
    loadReferenceOptions('/labs').then((options) => {
      labOptions.value = options
    })
  ])
})

const onSave = async (payload: CreateUserDTO | UpdateUserDTO) => {
  saving.value = true
  try {
    if (mode.value === 'create') {
      const response = await adminApi.createUser(payload as CreateUserDTO)
      table.data.value = [{ ...response.data }, ...table.data.value]
      if (overrides.value.length > 0) {
        await adminApi.updateUserPermissions(response.data.id, overrides.value)
        const overridesCount = overrides.value.length
        table.data.value = table.data.value.map((item) =>
          item.id === response.data.id ? { ...item, overridesCount } : item
        )
      }
    } else if (selected.value?.id) {
      const optimisticRow = {
        ...(selected.value || ({} as ReadUserDTO)),
        ...(payload as UpdateUserDTO)
      } as ReadUserDTO
      const rollback = optimistic.updateItem(table.data, optimisticRow)
      try {
        const response = await adminApi.updateUser(selected.value.id, payload)
        await adminApi.updateUserPermissions(selected.value.id, overrides.value)
        const overridesCount = overrides.value.length
        table.data.value = table.data.value.map((item) =>
          item.id === selected.value?.id ? { ...response.data, overridesCount } : item
        )
        if (String(auth.user?.id) === String(selected.value.id)) {
          await auth.restoreSession()
        }
      } catch (error: any) {
        rollback()
        toast.error(error?.message || t('users.saveFailed'))
        return
      }
    }
    close()
  } catch (error: any) {
    toast.error(error?.message || t('users.saveFailed'))
  } finally {
    saving.value = false
  }
}

const confirmDelete = (row: ReadUserDTO, onSuccess?: () => void) => {
  confirm(t('users.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await adminApi.deleteUser(row.id)
      onSuccess?.()
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('users.deleteFailed'))
    }
  })
}

const permissionsLoading = ref(false)
const rolePermissions = ref<Permission[]>([])
const overrides = ref<PermissionOverride[]>([])

const updateOverrides = (value: PermissionOverride[]) => {
  overrides.value = value
}

const loadPermissions = async (user: ReadUserDTO) => {
  permissionsLoading.value = true
  try {
    const response = await adminApi.getUserPermissions(user.id)
    rolePermissions.value = response.data.rolePermissions
    overrides.value = response.data.overrides
  } catch (error: any) {
    toast.error(error?.message || t('users.permissionsLoadFailed'))
  } finally {
    permissionsLoading.value = false
  }
}

watch(
  [visible, selected],
  ([isVisible, row]) => {
    if (!isVisible || !row) {
      rolePermissions.value = []
      overrides.value = []
      return
    }
    loadPermissions(row)
  }
)

</script>
