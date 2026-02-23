<template>
  <div class="dashboard">
    <Card class="dashboard-section">
      <template #title>
        <div class="section-title section-title--actions">
          <div>
            <h3>{{ t('dashboard.quickActionsTitle') }}</h3>
            <p>{{ t('dashboard.quickActionsSubtitle') }}</p>
          </div>
          <Button
            :label="t('dashboard.quickActionsAdd')"
            icon="pi pi-plus"
            @click="openCreate"
          />
        </div>
      </template>
      <template #content>
        <div v-if="actionsLoading" class="quick-actions-loading">
          <ProgressSpinner />
        </div>
        <div v-else-if="quickActions.length === 0" class="quick-actions-empty">
          {{ t('dashboard.quickActionsEmpty') }}
        </div>
        <div v-else class="quick-actions-grid">
          <div
            v-for="action in quickActions"
            :key="action.id"
            class="quick-action-card"
            :class="{ locked: !isAllowed(action) }"
          >
            <button
              class="quick-action-main"
              type="button"
              :disabled="!isAllowed(action)"
              @click="openQuickAction(action)"
            >
              <i :class="action.icon" />
              <span>{{ action.label }}</span>
              <i v-if="!isAllowed(action)" class="pi pi-lock" />
            </button>
            <Button
              class="quick-action-menu"
              icon="pi pi-ellipsis-v"
              severity="secondary"
              text
              :aria-label="t('table.actions')"
              @click="openMenu($event, action)"
            />
          </div>
        </div>
      </template>
    </Card>

    <Card class="dashboard-section">
      <template #title>
        <div class="section-title">
          <div>
            <h3>{{ t('dashboard.chartsTitle') }}</h3>
            <p>{{ t('dashboard.chartsSubtitle') }}</p>
          </div>
        </div>
      </template>
      <template #content>
        <div class="charts-grid">
          <Card
            v-for="chart in roleCharts"
            :key="chart.key"
            class="chart-card"
            :class="{ locked: !can(chart.resource, chart.action) }"
          >
            <template #title>
              <div class="chart-heading">
                <span>{{ t(chart.titleKey) }}</span>
                <Tag v-if="!can(chart.resource, chart.action)" severity="danger" :value="t('noAccess')" />
              </div>
            </template>
            <template #content>
              <p class="chart-description">{{ t(chart.subtitleKey) }}</p>
              <div v-if="can(chart.resource, chart.action)" class="chart-details">
                <div class="chart-summary">
                  <div v-for="item in chart.summary" :key="item.label" class="chart-summary-item">
                    <span class="summary-label">{{ item.label }}</span>
                    <span class="summary-value">{{ item.value }}</span>
                  </div>
                </div>
                <div class="chart-body">
                  <Chart :type="chart.type" :data="chart.data" :options="chart.options" class="chart" />
                </div>
              </div>
              <div v-else class="chart-locked">
                <i class="pi pi-lock" />
                <span>{{ t('noAccess') }}</span>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>

    <QuickActionDialog
      :visible="dialogVisible"
      :mode="dialogMode"
      :item="editingAction"
      :loading="saving"
      :options="actionOptions"
      @close="closeDialog"
      @save="saveAction"
    />

    <Menu ref="actionMenu" :model="actionMenuItems" popup />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Chart from 'primevue/chart'
import ProgressSpinner from 'primevue/progressspinner'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { useAuthStore } from '@/modules/auth/auth.store'
import QuickActionDialog, { type QuickActionOption } from './QuickActionDialog.vue'
import {
  listQuickActions,
  createQuickAction,
  updateQuickAction,
  deleteQuickAction
} from './dashboard.api'
import { useConfirmDelete } from '@/shared/components/ConfirmDelete'
import { usePermission } from '@/shared/composables/usePermission'
import { useToast } from '@/shared/composables/useToast'
import { useI18n } from '@/shared/i18n/i18n'
import type { Action, Resource } from '@/shared/types/permissions'
import type { ReadQuickActionDTO } from './dashboard.api'
import { useOptimistic } from '@/shared/composables/useOptimistic'

interface ChartCard {
  key: string
  titleKey: string
  subtitleKey: string
  resource: Resource
  action: Action
  type: 'bar' | 'line' | 'doughnut' | 'radar'
  data: any
  options: any
  summary: Array<{ label: string; value: string }>
}

const auth = useAuthStore()
const router = useRouter()
const { can } = usePermission()
const { t } = useI18n()
const toast = useToast()
const confirm = useConfirmDelete()
const optimistic = useOptimistic<ReadQuickActionDTO>()

const roleKey = computed(() => auth.user?.role || 'guest')

const quickActions = ref<ReadQuickActionDTO[]>([])
const actionsLoading = ref(false)
const dialogVisible = ref(false)
const saving = ref(false)
const editingAction = ref<ReadQuickActionDTO | null>(null)
const menuAction = ref<ReadQuickActionDTO | null>(null)
const actionMenu = ref<InstanceType<typeof Menu> | null>(null)

const dialogMode = computed(() => (editingAction.value ? 'edit' : 'create'))

const actionCatalog = [
  { resource: 'objects', to: '/objects', icon: 'pi pi-cog' },
  { resource: 'directions', to: '/directions', icon: 'pi pi-file' },
  { resource: 'samples', to: '/samples', icon: 'pi pi-box' },
  { resource: 'protocols', to: '/protocols', icon: 'pi pi-file-edit' },
  { resource: 'results', to: '/results', icon: 'pi pi-chart-bar' },
  { resource: 'conclusions', to: '/conclusions', icon: 'pi pi-file-check' },
  { resource: 'tests', to: '/tests', icon: 'pi pi-check-circle' },
  { resource: 'doctors', to: '/doctors', icon: 'pi pi-user' },
  { resource: 'branches', to: '/branches', icon: 'pi pi-building' },
  { resource: 'labs', to: '/labs', icon: 'pi pi-building-columns' },
  { resource: 'users', to: '/admin/users', icon: 'pi pi-users' },
  { resource: 'research-goals', to: '/research-goals', icon: 'pi pi-flag' },
  { resource: 'sample-targets', to: '/sample-targets', icon: 'pi pi-sitemap' },
  { resource: 'sample-types', to: '/sample-types', icon: 'pi pi-tags' },
  { resource: 'indicators', to: '/indicators', icon: 'pi pi-chart-line' },
  { resource: 'protocol-types', to: '/protocol-types', icon: 'pi pi-bookmark' },
  { resource: 'statuses', to: '/statuses', icon: 'pi pi-align-left' },
  { resource: 'user-types', to: '/user-types', icon: 'pi pi-users' }
] as const satisfies Array<{ resource: Resource; to: string; icon: string }>

const actionOptions = computed<QuickActionOption[]>(() => {
  const options: QuickActionOption[] = []
  const filtersLabel = t('table.filters')
  actionCatalog.forEach((item) => {
    const resourceLabel = t(`resource.${item.resource}`)
    options.push({
      key: `${item.resource}-view`,
      label: resourceLabel,
      resource: item.resource,
      action: 'view',
      to: item.to,
      icon: item.icon,
      locked: !can(item.resource, 'view'),
      kind: 'view'
    })
    options.push({
      key: `${item.resource}-create`,
      label: `${t('button.create')} ${resourceLabel}`,
      resource: item.resource,
      action: 'create',
      to: item.to,
      icon: item.icon,
      locked: !can(item.resource, 'create'),
      kind: 'create'
    })
    options.push({
      key: `${item.resource}-filters`,
      label: `${filtersLabel} ${resourceLabel}`,
      resource: item.resource,
      action: 'view',
      to: item.to,
      icon: 'pi pi-sliders-h',
      locked: !can(item.resource, 'view'),
      kind: 'filters'
    })
  })
  return options
})

const isAllowed = (action: { resource: Resource; action: Action }) => can(action.resource, action.action)

const loadQuickActions = async () => {
  actionsLoading.value = true
  try {
    const response = await listQuickActions()
    quickActions.value = response.items
  } catch (error: any) {
    toast.error(error?.message || t('common.loadFailed'))
  } finally {
    actionsLoading.value = false
  }
}

const openQuickAction = (action: ReadQuickActionDTO) => {
  if (!isAllowed(action)) {
    return
  }
  router.push(action.to)
}

const actionMenuItems = computed<MenuItem[]>(() => [
  {
    label: t('dialog.edit'),
    icon: 'pi pi-pencil',
    command: () => {
      if (menuAction.value) {
        openEdit(menuAction.value)
      }
    }
  },
  {
    label: t('table.delete'),
    icon: 'pi pi-trash',
    command: () => {
      if (menuAction.value) {
        confirmRemove(menuAction.value)
      }
    }
  }
])

const openMenu = (event: Event, action: ReadQuickActionDTO) => {
  menuAction.value = action
  actionMenu.value?.toggle(event)
}

const openCreate = () => {
  editingAction.value = null
  dialogVisible.value = true
}

const openEdit = (action: ReadQuickActionDTO) => {
  editingAction.value = action
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
  editingAction.value = null
}

const buildActionTo = (option: QuickActionOption, existingTo?: string) => {
  if (option.kind === 'create') {
    return `${option.to}#create`
  }
  if (option.kind === 'filters') {
    if (existingTo && existingTo.startsWith(option.to) && existingTo.includes('#filters=')) {
      return existingTo
    }
    return `${option.to}#filters`
  }
  return option.to
}

const saveAction = async (payload: { label: string; option: QuickActionOption }) => {
  saving.value = true
  try {
    const actionPayload = {
      label: payload.label,
      resource: payload.option.resource,
      action: payload.option.action,
      to: buildActionTo(payload.option, editingAction.value?.to),
      icon: payload.option.icon
    }
    if (editingAction.value) {
      const response = await updateQuickAction(editingAction.value.id, actionPayload)
      quickActions.value = quickActions.value.map((item) =>
        item.id === editingAction.value?.id ? response.data : item
      )
    } else {
      const response = await createQuickAction(actionPayload)
      quickActions.value = [response.data, ...quickActions.value]
    }
    closeDialog()
  } catch (error: any) {
    toast.error(error?.message || t('common.saveFailed'))
  } finally {
    saving.value = false
  }
}

const confirmRemove = (action: ReadQuickActionDTO) => {
  confirm(t('common.deleteConfirm'), async () => {
    const rollback = optimistic.removeItem(quickActions, action.id)
    try {
      await deleteQuickAction(action.id)
    } catch (error: any) {
      rollback()
      toast.error(error?.message || t('common.deleteFailed'))
    }
  })
}

const palette = {
  primary: '#0ea5e9',
  secondary: '#f97316',
  success: '#22c55e',
  danger: '#ef4444',
  slate: '#94a3b8'
}

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true
      }
    }
  }
}

const cartesianOptions = {
  ...baseOptions,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#e2e8f0'
      }
    }
  }
}

const buildSummary = (labels: string[], values: number[]) =>
  labels.map((label, index) => ({
    label,
    value: String(values[index] ?? 0)
  }))

const roleCharts = computed<ChartCard[]>(() => {
  if (roleKey.value === 'admin') {
    const usersByRole = [6, 14, 8]
    const objectsLifecycle = [7, 22, 11]
    return [
      {
        key: 'users-by-role',
        titleKey: 'dashboard.chart.usersByRole',
        subtitleKey: 'dashboard.chart.usersByRoleHint',
        resource: 'users',
        action: 'view',
        type: 'doughnut',
        data: {
          labels: [t('role.admin'), t('role.doctor'), t('role.technician')],
          datasets: [
            {
              data: usersByRole,
              backgroundColor: [palette.primary, palette.success, palette.secondary],
              borderWidth: 0
            }
          ]
        },
        options: baseOptions,
        summary: buildSummary(
          [t('role.admin'), t('role.doctor'), t('role.technician')],
          usersByRole
        )
      },
      {
        key: 'objects-lifecycle',
        titleKey: 'dashboard.chart.objectLifecycle',
        subtitleKey: 'dashboard.chart.objectLifecycleHint',
        resource: 'objects',
        action: 'view',
        type: 'bar',
        data: {
          labels: [t('status.draft'), t('status.active'), t('status.archived')],
          datasets: [
            {
              label: t('resource.objects'),
              data: objectsLifecycle,
              backgroundColor: [palette.secondary, palette.primary, palette.slate]
            }
          ]
        },
        options: cartesianOptions,
        summary: buildSummary(
          [t('status.draft'), t('status.active'), t('status.archived')],
          objectsLifecycle
        )
      }
    ]
  }
  if (roleKey.value === 'doctor') {
    const newSeries = [6, 9, 7, 12, 10, 13, 11]
    const completedSeries = [4, 6, 5, 7, 9, 8, 10]
    return [
      {
        key: 'protocol-flow',
        titleKey: 'dashboard.chart.protocolFlow',
        subtitleKey: 'dashboard.chart.protocolFlowHint',
        resource: 'protocols',
        action: 'view',
        type: 'line',
        data: {
          labels: ['1', '2', '3', '4', '5', '6', '7'],
          datasets: [
            {
              label: t('dashboard.chart.new'),
              data: newSeries,
              borderColor: palette.primary,
              backgroundColor: 'rgba(14, 165, 233, 0.2)',
              tension: 0.4,
              fill: true
            },
            {
              label: t('dashboard.chart.completed'),
              data: completedSeries,
              borderColor: palette.success,
              backgroundColor: 'rgba(34, 197, 94, 0.18)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: cartesianOptions,
        summary: buildSummary(
          [t('dashboard.chart.new'), t('dashboard.chart.completed')],
          [newSeries[newSeries.length - 1] ?? 0, completedSeries[completedSeries.length - 1] ?? 0]
        )
      },
      {
        key: 'conclusion-status',
        titleKey: 'dashboard.chart.conclusionStatus',
        subtitleKey: 'dashboard.chart.conclusionStatusHint',
        resource: 'conclusions',
        action: 'view',
        type: 'doughnut',
        data: {
          labels: [t('dashboard.chart.inReview'), t('dashboard.chart.ready')],
          datasets: [
            {
              data: [12, 8],
              backgroundColor: [palette.secondary, palette.success],
              borderWidth: 0
            }
          ]
        },
        options: baseOptions,
        summary: buildSummary(
          [t('dashboard.chart.inReview'), t('dashboard.chart.ready')],
          [12, 8]
        )
      }
    ]
  }
  if (roleKey.value === 'technician') {
    const sampleStatus = [18, 9, 14]
    const indicatorCoverage = [72, 85, 78]
    return [
      {
        key: 'samples-status',
        titleKey: 'dashboard.chart.sampleStatus',
        subtitleKey: 'dashboard.chart.sampleStatusHint',
        resource: 'samples',
        action: 'view',
        type: 'bar',
        data: {
          labels: [t('dashboard.chart.received'), t('dashboard.chart.processing'), t('dashboard.chart.ready')],
          datasets: [
            {
              label: t('resource.samples'),
              data: sampleStatus,
              backgroundColor: [palette.primary, palette.secondary, palette.success]
            }
          ]
        },
        options: cartesianOptions,
        summary: buildSummary(
          [t('dashboard.chart.received'), t('dashboard.chart.processing'), t('dashboard.chart.ready')],
          sampleStatus
        )
      },
      {
        key: 'indicator-coverage',
        titleKey: 'dashboard.chart.indicatorCoverage',
        subtitleKey: 'dashboard.chart.indicatorCoverageHint',
        resource: 'indicators',
        action: 'view',
        type: 'radar',
        data: {
          labels: [t('category.bio'), t('category.chem'), t('category.med')],
          datasets: [
            {
              label: t('dashboard.chart.coverage'),
              data: indicatorCoverage,
              borderColor: palette.primary,
              backgroundColor: 'rgba(14, 165, 233, 0.25)',
              pointBackgroundColor: palette.primary
            }
          ]
        },
        options: baseOptions,
        summary: buildSummary(
          [t('category.bio'), t('category.chem'), t('category.med')],
          indicatorCoverage
        )
      }
    ]
  }
  return []
})

onMounted(() => {
  loadQuickActions()
})
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-section :deep(.p-card-title) {
  margin-bottom: 0.75rem;
}

.section-title h3 {
  margin: 0;
}

.section-title p {
  margin: 0.25rem 0 0;
  color: #4b5b5a;
}

.section-title--actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.quick-actions-loading {
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
}

.quick-actions-empty {
  color: #6a7b7a;
  font-size: 0.95rem;
}

.quick-actions-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.quick-action-card {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem;
  border-radius: 12px;
  border: 1px solid #e2e8e8;
  background: #f7faf9;
}

.quick-action-card.locked {
  border-color: #f2d6a7;
  background: #fff7e6;
}

.quick-action-main {
  border: none;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font: inherit;
  color: inherit;
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  flex: 1 1 auto;
}

.quick-action-main:disabled {
  cursor: not-allowed;
  color: #8b9796;
}

.quick-action-main .pi-lock {
  color: #c57b0a;
  margin-left: 0.35rem;
}

.quick-action-menu {
  margin-left: auto;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 1.25rem;
}

.chart-card :deep(.p-card-content) {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.chart-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.chart-description {
  margin: 0;
  color: #4b5b5a;
}

.chart-details {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.chart-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem 1rem;
}

.chart-summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.35rem 0.5rem;
  border-radius: 10px;
  background: #f1f6f5;
}

.summary-label {
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  color: #6a7b7a;
}

.summary-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2d2c;
}

.chart-body {
  height: 280px;
  padding: 0.25rem 0.25rem 0.75rem;
  border-radius: 16px;
  background: #f9fbfb;
}

.chart {
  width: 100%;
  height: 100%;
}

.chart :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}

.chart-locked {
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 12px;
  border: 1px dashed #d7e2e1;
  color: #6a7b7a;
}
</style>
