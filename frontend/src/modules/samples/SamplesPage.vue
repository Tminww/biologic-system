<template>
  <div class="card">
    <BaseTable
      ref="tableRef"
      :columns="columns"
      :data="data"
      :total="total"
      :loading="loading"
      v-model:filters="filtersModel"
      v-model:selection="selectedSamples"
      selectionMode="multiple"
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
          :resource="'samples'"
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

    <Dialog
      :visible="registryVisible"
      modal
      :header="t('samples.registryTitle')"
      :style="{ width: '640px' }"
      @update:visible="closeRegistry"
    >
      <div class="registry-form">
        <label class="registry-field">
          <span class="registry-label">{{ t('samples.registryStartNumber') }}</span>
          <InputNumber v-model="registryForm.startNumber" :min="1" :useGrouping="false" />
        </label>
        <label class="registry-field">
          <span class="registry-label">{{ t('samples.registryStartPeriod') }}</span>
          <div class="registry-period">
            <Dropdown
              v-model="registryForm.startMonth"
              :options="monthOptions"
              optionLabel="label"
              optionValue="value"
            />
            <span class="registry-separator">-</span>
            <InputNumber v-model="registryForm.startYear" :min="2000" :max="2100" :useGrouping="false" />
          </div>
        </label>
        <label class="registry-field">
          <span class="registry-label">{{ t('samples.registryEndNumber') }}</span>
          <InputNumber v-model="registryForm.endNumber" :min="1" :useGrouping="false" />
        </label>
        <label class="registry-field">
          <span class="registry-label">{{ t('samples.registryEndPeriod') }}</span>
          <div class="registry-period">
            <Dropdown
              v-model="registryForm.endMonth"
              :options="monthOptions"
              optionLabel="label"
              optionValue="value"
            />
            <span class="registry-separator">-</span>
            <InputNumber v-model="registryForm.endYear" :min="2000" :max="2100" :useGrouping="false" />
          </div>
        </label>
      </div>
      <template #footer>
        <Button :label="t('dialog.close')" severity="secondary" @click="closeRegistry" />
        <Button
          :label="t('button.confirm')"
          icon="pi pi-check"
          @click="onConfirmRegistry"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import SplitButton from 'primevue/splitbutton'
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
import type { ReadSampleDTO } from './samples.api'
import type { MenuItem } from 'primevue/menuitem'
import {
  createSample,
  deleteSample,
  generateSamplesProtocol,
  listSamples,
  updateSample
} from './samples.api'

const { t, locale } = useI18n()

const columns = computed<TableColumn[]>(() => [
  {
    field: 'id',
    header: t('field.id'),
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
    field: 'alternate_name',
    header: t('field.nameFull'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadSampleDTO) => row.alternate_name || '-'
  },
  {
    field: 'sample_type.name',
    header: t('field.sampleType'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadSampleDTO) => row.sample_type?.name || '-'
  },
  {
    field: 'direction.name',
    header: t('field.direction'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadSampleDTO) => row.direction?.name || '-'
  },
  {
    field: 'status.name',
    header: t('field.status'),
    sortable: true,
    filter: { type: 'text', placeholder: t('filter.default') },
    body: (row: ReadSampleDTO) => row.status?.name || '-'
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
    body: (row: ReadSampleDTO) => (row.is_urgent ? t('common.yes') : t('common.no'))
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
    body: (row: ReadSampleDTO) => (row.is_done ? t('common.yes') : t('common.no'))
  },
  {
    field: 'received_at',
    header: t('field.receivedAt'),
    sortable: true,
    filter: { type: 'dateRange' },
    body: (row: ReadSampleDTO) => (row.received_at ? formatDateTime(row.received_at) : '-')
  }
])

const initialFilters: TableFilters = {
  global: { value: '', matchMode: 'contains' },
  name: { value: '', matchMode: 'contains' },
  alternate_name: { value: '', matchMode: 'contains' },
  'sample_type.name': { value: '', matchMode: 'contains' },
  'direction.name': { value: '', matchMode: 'contains' },
  'status.name': { value: '', matchMode: 'contains' },
  is_urgent: { value: null, matchMode: 'in' },
  is_done: { value: null, matchMode: 'in' },
  received_at: { value: null, matchMode: 'between' }
}

const table = useServerTable<ReadSampleDTO>(listSamples, {
  presetKey: 'samples',
  filters: initialFilters
})

const data = table.data
const total = table.total
const loading = table.loading
const filtersModel = table.filters
const selectedSamples = ref<ReadSampleDTO[]>([])
const tableRef = ref<InstanceType<typeof BaseTable> | null>(null)
const dialog = useCrudDialog<ReadSampleDTO>('samples')
const { visible, mode, selected, readOnly, openView, openEdit, openCreate, close, startEdit } =
  dialog
useDialogHash({ items: data, openCreate, openEdit, openView })
useTableHash({ tableRef })
const saving = ref(false)
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadSampleDTO>()
const { can } = usePermission()
const canEdit = computed(() => can('samples', 'edit'))
const canCreate = computed(() => can('samples', 'create'))
const createIcon = computed(() => (canCreate.value ? 'pi pi-plus' : 'pi pi-lock'))
const createButtonProps = computed(() => ({
  disabled: !canCreate.value,
  title: !canCreate.value ? t('noAccess') : undefined
}))
const sampleTypeOptions = ref<FormField['options']>([])
const directionOptions = ref<FormField['options']>([])
const statusOptions = ref<FormField['options']>([])
const protocolOptions = ref<FormField['options']>([])
const toolbarActions = computed<MenuItem[]>(() => [
  {
    label: t('samples.registryButton'),
    icon: 'pi pi-book',
    command: openRegistry
  },
  {
    label: t('samples.registryGenerate'),
    icon: 'pi pi-file',
    disabled: !selectedSamples.value.length,
    command: onGenerateProtocol
  }
])

const registryHash = '#registry'
const registryVisible = ref(false)
const registryForm = reactive({
  startNumber: null as number | null,
  startMonth: 12,
  startYear: 2025,
  endNumber: null as number | null,
  endMonth: 12,
  endYear: 2025
})
const monthOptions = computed(() => {
  const formatter = new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'ru-RU', {
    month: 'long'
  })
  return Array.from({ length: 12 }, (_, index) => ({
    label: formatter.format(new Date(2025, index, 1)),
    value: index + 1
  }))
})
const route = useRoute()
const router = useRouter()

const formFields = computed<FormField[]>(() => [
  { key: 'month_no', label: t('field.month'), type: 'number' },
  { key: 'name', label: t('field.name'), type: 'text', required: true },
  { key: 'alternate_name', label: t('field.nameFull'), type: 'text' },
  { key: 'mass', label: t('field.value'), type: 'text' },
  { key: 'target_description', label: t('field.text'), type: 'textarea' },
  { key: 'comment', label: t('field.comment'), type: 'textarea' },
  { key: 'section', label: t('field.category'), type: 'text' },
  { key: 'delivery', label: t('field.address'), type: 'text' },
  { key: 'nomenclature_code', label: `${t('field.code')} (N)`, type: 'text' },
  { key: 'batch_code', label: `${t('field.code')} (B)`, type: 'text' },
  { key: 'supplier', label: t('field.departmentName'), type: 'text' },
  { key: 'is_urgent', label: t('field.active'), type: 'boolean' },
  { key: 'is_done', label: t('field.completed'), type: 'boolean' },
  {
    key: 'sample_type_id',
    label: t('field.sampleTypeId'),
    type: 'select',
    options: sampleTypeOptions.value
  },
  { key: 'status_id', label: t('field.statusId'), type: 'select', options: statusOptions.value },
  {
    key: 'direction_id',
    label: t('field.directionId'),
    type: 'select',
    options: directionOptions.value
  },
  {
    key: 'protocol_id',
    label: t('field.protocolTypeId'),
    type: 'select',
    options: protocolOptions.value
  },
  { key: 'sampled_at', label: t('field.sampledAt'), type: 'date' },
  { key: 'received_at', label: t('field.receivedAt'), type: 'date' },
  { key: 'completed_at', label: t('field.completedAt'), type: 'date' }
])

const dialogTitle = computed(() => {
  if (mode.value === 'create') {
    return `${t('button.create')} ${t('resource.samples')}`
  }
  if (mode.value === 'edit') {
    return `${t('dialog.edit')} ${t('resource.samples')}`
  }
  return t('resource.samples')
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
    loadReferenceOptions('/directions').then((options) => {
      directionOptions.value = options
    }),
    loadReferenceOptions('/statuses').then((options) => {
      statusOptions.value = options
    }),
    loadReferenceOptions('/protocols').then((options) => {
      protocolOptions.value = options
    })
  ])
})

const openRegistry = () => {
  registryVisible.value = true
  if (route.hash !== registryHash) {
    router.replace({ hash: registryHash })
  }
}

const closeRegistry = () => {
  registryVisible.value = false
  if (route.hash === registryHash) {
    router.replace({ hash: '' })
  }
}

const onConfirmRegistry = () => {
  closeRegistry()
}

const onGenerateProtocol = async () => {
  if (!selectedSamples.value.length) {
    return
  }
  try {
    await generateSamplesProtocol({ ids: selectedSamples.value.map((item) => item.id) })
    toast.success(t('samples.registryGenerated'))
    selectedSamples.value = []
  } catch (error: any) {
    toast.error(error?.message || t('common.saveFailed'))
  }
}

watch(
  () => route.hash,
  (hash) => {
    if (hash === registryHash) {
      registryVisible.value = true
      return
    }
    if (registryVisible.value) {
      registryVisible.value = false
    }
  },
  { immediate: true }
)

const onSave = async (payload: Record<string, any>) => {
  saving.value = true
  try {
    if (mode.value === 'create') {
      const response = await createSample(payload)
      table.data.value = [response.data, ...table.data.value]
    } else if (selected.value?.id) {
      const response = await updateSample(selected.value.id, payload)
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

const confirmDelete = (row: ReadSampleDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(table.data, row.id)
    try {
      await deleteSample(row.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('common.deleteFailed'))
    }
  })
}
</script>

<style scoped>
.registry-form {
  display: grid;
  gap: 1rem;
}

.registry-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.registry-label {
  font-size: 0.85rem;
  color: #4b5b5a;
}

.registry-period {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.registry-separator {
  color: #4b5b5a;
}

.registry-form :deep(.p-inputnumber),
.registry-form :deep(.p-dropdown) {
  width: 100%;
}

.registry-period :deep(.p-dropdown) {
  width: auto;
  flex: 1 1 220px;
  min-width: 160px;
}

.registry-period :deep(.p-inputnumber) {
  width: auto;
  flex: 0 1 140px;
  min-width: 120px;
}
</style>
