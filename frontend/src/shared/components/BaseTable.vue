<template>
  <div>
    <div class="table-toolbar">
      <div class="table-toolbar-left">
        <IconField class="table-search">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="globalSearch"
            :disabled="readOnly"
            :placeholder="t('table.search')"
            @input="onGlobalSearch"
          />
        </IconField>
        <Button
          icon="pi pi-sliders-h"
          text
          :label="t('table.filters')"
          :disabled="readOnly"
          :badge="activeFiltersCount > 0 ? String(activeFiltersCount) : undefined"
          badgeSeverity="danger"
          @click="openFilters"
        />
        <Button
          icon="pi pi-filter-slash"
          text
          :label="t('table.clear')"
          :disabled="readOnly"
          @click="clearAllFilters"
        />
      </div>
      <div class="table-toolbar-right">
        <Button icon="pi pi-refresh" :label="t('table.refresh')" :disabled="readOnly" @click="$emit('refresh')" />
        <slot name="toolbar-actions" />
      </div>
    </div>

    <DataTable
      ref="dataTableRef"
      :key="tableKey"
      :value="displayData"
      :lazy="true"
      :totalRecords="total"
      v-model:filters="filtersModel"
      v-model:selection="selectionModel"
      filterDisplay="menu"
      :globalFilterFields="globalFilterFields"
      :selectionMode="effectiveSelectionMode"
      :dataKey="dataKeyValue"
      @sort="onSort"
      @filter="onFilter"
    >
      <Column
        v-if="showSelectionColumn && !loading"
        :selectionMode="selectionColumnMode"
        :headerStyle="{ width: '3rem' }"
      />
      <Column
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :header="resolveColumnHeader(column)"
        :sortable="isTechnicalIdColumn(column) ? false : column.sortable"
        :style="{ width: column.width }"
        :bodyClass="column.bodyClass"
        :filter="showRowFilter(column)"
        :showFilterMenu="false"
      >
        <template #body="slotProps">
          <Skeleton v-if="isSkeletonRow(slotProps.data)" height="1rem" />
          <component
            v-else-if="column.bodyComponent"
            :is="column.bodyComponent"
            :row="slotProps.data"
          />
          <span v-else>{{ formatValue(resolveCellValue(column, slotProps.data, slotProps.index)) }}</span>
        </template>
        <template v-if="showRowFilter(column)" #filter="{ filterModel, filterCallback }">
          <InputText
            v-if="column.filter.type === 'text'"
            v-model="filterModel.value"
            :disabled="readOnly"
            :placeholder="column.filter.placeholder || t('filter.default')"
            @input="filterCallback()"
          />
          <DatePicker
            v-else-if="column.filter.type === 'dateRange'"
            v-model="filterModel.value"
            selectionMode="range"
            :manualInput="false"
            showButtonBar
            :disabled="readOnly"
            class="table-date-range"
            @update:modelValue="filterCallback()"
          />
          <MultiSelect
            v-else-if="column.filter.type === 'multiSelect'"
            v-model="filterModel.value"
            :options="column.filter.options || []"
            optionLabel="label"
            optionValue="value"
            :disabled="readOnly"
            :placeholder="t('table.select')"
            @change="filterCallback()"
          />
        </template>
      </Column>
      <Column
        v-if="$slots.actions"
        :exportable="false"
        headerClass="table-actions-column"
        bodyClass="table-actions-column"
      >
        <template #body="slotProps">
          <Skeleton v-if="isSkeletonRow(slotProps.data)" height="1rem" />
          <slot v-else name="actions" :row="slotProps.data" />
        </template>
      </Column>
    </DataTable>

    <Paginator
      :first="first"
      :rows="rows"
      :totalRecords="total"
      :rowsPerPageOptions="[15, 20, 50, 100]"
      @page="onPage"
    />

    <Dialog
      v-model:visible="filtersVisible"
      modal
      :header="t('table.filtersTitle')"
      :style="{ width: '640px' }"
    >
      <div class="filters-dialog">
        <div class="filters-section">
          <div class="filters-grid">
            <div class="filter-field">
              <span class="filter-label">{{ t('table.search') }}</span>
              <InputText v-model="dialogFilters.global.value" :disabled="readOnly" />
            </div>
            <div v-for="column in filterColumns" :key="column.field" class="filter-field">
              <span class="filter-label">{{ column.filter?.label || column.header }}</span>
              <InputText
                v-if="column.filter?.type === 'text'"
                v-model="dialogFilters[column.field].value"
                :disabled="readOnly"
                :placeholder="column.filter.placeholder || t('filter.default')"
              />
              <div v-else-if="column.filter?.type === 'deliveryTime'" class="time-filter">
                <Dropdown
                  v-model="timeFilterState[column.field].preset"
                  :options="timePresetOptions"
                  optionLabel="label"
                  optionValue="value"
                  :disabled="readOnly"
                  @change="onTimePresetChange(column.field)"
                />
                <div class="time-range-grid">
                  <div class="time-range-field">
                    <span class="filter-label">{{ t('filter.timeBegin') }}</span>
                    <DatePicker
                      :modelValue="getTimeDatePickerRange(column.field)"
                      selectionMode="range"
                      :manualInput="false"
                      showButtonBar
                      :disabled="readOnly || timeFilterState[column.field].preset !== 'custom'"
                      @update:modelValue="onTimeDatePickerUpdate(column.field, $event)"
                    />
                  </div>
                </div>
              </div>
              <DatePicker
                v-else-if="column.filter?.type === 'dateRange'"
                v-model="dialogFilters[column.field].value"
                selectionMode="range"
                :manualInput="false"
                showButtonBar
                :disabled="readOnly"
              />
              <MultiSelect
                v-else-if="column.filter?.type === 'multiSelect'"
                v-model="dialogFilters[column.field].value"
                :options="column.filter.options || []"
                optionLabel="label"
                optionValue="value"
                :disabled="readOnly"
                :placeholder="t('table.select')"
              />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button :label="t('table.reset')" severity="secondary" text :disabled="readOnly" @click="resetFilters" />
        <Button :label="t('dialog.close')" severity="secondary" @click="filtersVisible = false" />
        <Button :label="t('table.apply')" icon="pi pi-check" :disabled="readOnly" @click="applyFilters" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import DatePicker from 'primevue/datepicker'
import Dialog from 'primevue/dialog'
import Skeleton from 'primevue/skeleton'
import type { TableColumn, TableFilters } from '@/shared/types/table'
import { useI18n } from '@/shared/i18n/i18n'
import { formatDateTime, isIsoDateString } from '@/shared/utils/datetime'

const props = defineProps<{
  columns: TableColumn[]
  data: any[]
  total: number
  loading: boolean
  readOnly?: boolean
  selectionMode?: 'single' | 'multiple'
  showSelectionColumn?: boolean
  rowKey?: string
}>()

const filtersModel = defineModel<TableFilters>('filters', { required: true })
const selectionModel = defineModel<any[] | any>('selection')

const emit = defineEmits<{
  (e: 'page', event: any): void
  (e: 'sort', event: any): void
  (e: 'filter', event: any): void
  (e: 'refresh'): void
}>()

const globalSearch = computed({
  get: () => filtersModel.value.global?.value ?? '',
  set: (value: string) => {
    filtersModel.value.global = { ...filtersModel.value.global, value }
  }
})
const rows = ref(15)
const first = ref(0)
const tableKey = ref(0)
const dataTableRef = ref<any>(null)
const filterColumns = computed(() => props.columns.filter((column) => column.filter))
const allFilterColumns = computed(() => props.columns.filter((column) => column.filter))
const globalFilterFields = computed(() => props.columns.map((column) => column.field))
const showRowFilter = () => false
const hasFilterValue = (value: any) => {
  if (value === null || value === undefined || value === '') {
    return false
  }
  if (Array.isArray(value)) {
    return value.some((item) => item !== null && item !== undefined && item !== '')
  }
  return true
}
const countSelectedDialogFilters = (filters: TableFilters) => {
  let count = 0
  if (hasFilterValue(filters.global?.value)) {
    count += 1
  }
  allFilterColumns.value.forEach((column) => {
    if (hasFilterValue(filters[column.field]?.value)) {
      count += 1
    }
  })
  return count
}
const dataKeyValue = computed(() =>
  props.selectionMode || props.showSelectionColumn ? props.rowKey || 'id' : undefined
)
const selectionColumnMode = computed(() => props.selectionMode ?? 'multiple')
const effectiveSelectionMode = computed(() =>
  props.loading ? undefined : props.selectionMode
)
const skeletonRowsData = computed(() =>
  Array.from({ length: Math.min(rows.value, 15) }, (_, index) => ({
    __skeleton: true,
    id: `skeleton-${index}`
  }))
)
const displayData = computed(() => (props.loading ? skeletonRowsData.value : props.data))
const isSkeletonRow = (row: any) => !!row?.__skeleton

const ensureFilter = (field: string, fallback: any = null) => {
  if (!filtersModel.value[field]) {
    filtersModel.value[field] = { value: fallback }
  }
  return filtersModel.value[field]
}

const initFilters = () => {
  if (!filtersModel.value.global) {
    filtersModel.value.global = { value: '' }
  }
  allFilterColumns.value.forEach((column) => {
    const fallback = null
    ensureFilter(column.field, fallback)
  })
}

initFilters()

const onGlobalSearch = () => {
  emit('filter', { filters: filtersModel.value })
}

const onPage = (event: any) => {
  const nextFirst = event.first ?? first.value
  const nextRows = event.rows ?? rows.value
  if (nextFirst === first.value && nextRows === rows.value) {
    return
  }
  first.value = nextFirst
  rows.value = nextRows
  emit('page', event)
}

const onSort = (event: any) => {
  emit('sort', event)
}

const onFilter = (event: any) => {
  first.value = 0
  emit('filter', event)
}

const { t } = useI18n()
const filtersVisible = ref(false)
type TimePreset = 'none' | 'last30' | 'today' | 'week' | 'month' | 'custom'
type TimeRange = [Date | null, Date | null]
type TimeFilterState = { preset: TimePreset; range: TimeRange }

const timeFilterState = reactive<Record<string, TimeFilterState>>({})

const timePresetOptions = computed(() => [
  { label: t('filter.time.none'), value: 'none' },
  { label: t('filter.time.last30'), value: 'last30' },
  { label: t('filter.time.today'), value: 'today' },
  { label: t('filter.time.week'), value: 'week' },
  { label: t('filter.time.month'), value: 'month' },
  { label: t('filter.time.custom'), value: 'custom' }
])

const cloneFilterValue = (value: any) => {
  if (Array.isArray(value)) {
    return value.map((item) => (item instanceof Date ? new Date(item) : item))
  }
  if (value instanceof Date) {
    return new Date(value)
  }
  return value
}

const cloneFilters = (value: TableFilters) => {
  const entries = Object.entries(value).map(([key, meta]) => [
    key,
    { ...meta, value: cloneFilterValue(meta?.value) }
  ])
  return Object.fromEntries(entries) as TableFilters
}

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
const endOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)

const startOfWeek = (date: Date) => {
  const day = date.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  const start = new Date(date)
  start.setDate(date.getDate() + diff)
  return startOfDay(start)
}

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)

const buildPresetRange = (preset: TimePreset) => {
  const now = new Date()
  if (preset === 'last30') {
    const start = new Date(now)
    start.setDate(now.getDate() - 29)
    return [startOfDay(start), endOfDay(now)] as [Date, Date]
  }
  if (preset === 'today') {
    return [startOfDay(now), endOfDay(now)] as [Date, Date]
  }
  if (preset === 'week') {
    return [startOfWeek(now), endOfDay(now)] as [Date, Date]
  }
  if (preset === 'month') {
    return [startOfMonth(now), endOfDay(now)] as [Date, Date]
  }
  return null
}

const ensureTimeState = (field: string) => {
  if (!timeFilterState[field]) {
    timeFilterState[field] = { preset: 'none', range: [null, null] }
  }
  return timeFilterState[field]
}

const normalizeRange = (value: any): TimeRange => {
  if (!Array.isArray(value)) {
    return [null, null]
  }
  const [start, end] = value
  return [
    start ? new Date(start) : null,
    end ? new Date(end) : null
  ]
}

const rangeMatchesPreset = (range: TimeRange, preset: TimePreset) => {
  const expected = buildPresetRange(preset)
  if (!expected || !range[0] || !range[1]) {
    return false
  }
  return range[0].getTime() === expected[0].getTime() && range[1].getTime() === expected[1].getTime()
}

const detectPreset = (range: TimeRange) => {
  if (!range[0] && !range[1]) {
    return 'none'
  }
  const presets: TimePreset[] = ['last30', 'today', 'week', 'month']
  for (const preset of presets) {
    if (rangeMatchesPreset(range, preset)) {
      return preset
    }
  }
  return 'custom'
}

const updateTimeFilterValue = (field: string) => {
  const state = ensureTimeState(field)
  if (state.preset === 'none') {
    dialogFilters.value[field].value = null
    return
  }
  if (state.preset === 'custom') {
    const hasRange = state.range[0] || state.range[1]
    dialogFilters.value[field].value = hasRange ? [...state.range] : null
    return
  }
  const range = buildPresetRange(state.preset)
  state.range = range ? [...range] : [null, null]
  dialogFilters.value[field].value = range ? [...range] : null
}

const syncTimeFilters = () => {
  filterColumns.value.forEach((column) => {
    if (column.filter?.type !== 'deliveryTime') {
      return
    }
    const state = ensureTimeState(column.field)
    const range = normalizeRange(dialogFilters.value[column.field]?.value)
    state.range = range
    state.preset = detectPreset(range)
  })
}

const onTimePresetChange = (field: string) => {
  ensureTimeState(field)
  updateTimeFilterValue(field)
}

const getTimeDatePickerRange = (field: string) => {
  const [start, end] = ensureTimeState(field).range
  if (!start && !end) {
    return null
  }
  if (start && !end) {
    return [start]
  }
  if (!start && end) {
    return [end]
  }
  return [start as Date, end as Date]
}

const onTimeDatePickerUpdate = (field: string, value: any) => {
  const state = ensureTimeState(field)
  state.range = normalizeRange(value)
  if (state.preset !== 'custom') {
    state.preset = 'custom'
  }
  updateTimeFilterValue(field)
}

const isTechnicalIdColumn = (column: TableColumn) =>
  column.field === 'id' && !column.body && !column.bodyComponent

const resolveColumnHeader = (column: TableColumn) =>
  isTechnicalIdColumn(column) ? t('field.sequence') : column.header

const resolveCellValue = (column: TableColumn, row: any, rowIndex?: number) => {
  if (isTechnicalIdColumn(column)) {
    return first.value + (rowIndex ?? 0) + 1
  }
  if (column.body) {
    return column.body(row, rowIndex)
  }
  return resolveField(row, column.field)
}

const resolveField = (row: Record<string, any>, field: string) =>
  field.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), row)

const formatValue = (value: any) => {
  if (value === null || value === undefined || value === '') {
    return '-'
  }
  if (value instanceof Date) {
    return formatDateTime(value)
  }
  if (typeof value === 'string' && isIsoDateString(value)) {
    return formatDateTime(value)
  }
  return value
}

const dialogFilters = ref<TableFilters>(cloneFilters(filtersModel.value))
const activeFiltersCount = computed(() => countSelectedDialogFilters(dialogFilters.value))
syncTimeFilters()

const openFilters = () => {
  dialogFilters.value = cloneFilters(filtersModel.value)
  if (!dialogFilters.value.global) {
    dialogFilters.value.global = { value: '' }
  }
  filterColumns.value.forEach((column) => {
    if (!dialogFilters.value[column.field]) {
      dialogFilters.value[column.field] = { value: null }
    }
  })
  syncTimeFilters()
  filtersVisible.value = true
}

const resetFilters = () => {
  const next: TableFilters = {}
  Object.entries(dialogFilters.value).forEach(([field, config]) => {
    const value = field === 'global' ? '' : null
    next[field] = { ...config, value }
  })
  dialogFilters.value = next
  syncTimeFilters()
}

const buildEmptyFilters = () => {
  const next: TableFilters = {}
  const keys = new Set(Object.keys(filtersModel.value))
  keys.add('global')
  allFilterColumns.value.forEach((column) => keys.add(column.field))
  keys.forEach((field) => {
    const current = filtersModel.value[field] ?? {}
    next[field] = { ...current, value: field === 'global' ? '' : null }
  })
  return next
}

const clearAllFilters = () => {
  const cleared = buildEmptyFilters()
  filtersModel.value = cleared
  dialogFilters.value = cloneFilters(cleared)
  first.value = 0
  emit('filter', { filters: filtersModel.value })
  dataTableRef.value?.reset?.()
  tableKey.value += 1
  syncTimeFilters()
}

const applyFilters = () => {
  filtersModel.value = cloneFilters(dialogFilters.value)
  emit('filter', { filters: filtersModel.value })
  filtersVisible.value = false
}

defineExpose({ openFilters })
</script>

<style scoped>
.time-filter {
  display: grid;
  gap: 0.75rem;
}

.time-range-grid {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.time-range-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

</style>
