<template>
  <Dialog
    :visible="visible"
    modal
    :header="title"
    :style="{ width: '480px' }"
    @update:visible="$emit('close')"
  >
    <form ref="formRef" class="quick-action-form" @submit.prevent="onSave">
      <label class="field">
        <span class="field-label">{{ t('field.action') }}</span>
        <Dropdown
          v-model="selectedKey"
          :options="options"
          optionLabel="label"
          optionValue="key"
          :disabled="loading"
          :placeholder="t('dashboard.quickActionsSelect')"
          class="quick-action-select"
        >
          <template #value>
            <div v-if="selectedOption" class="option-row">
              <i :class="selectedOption.icon" />
              <span>{{ selectedOption.label }}</span>
              <i v-if="selectedOption.locked" class="pi pi-lock" />
            </div>
            <span v-else class="option-placeholder">{{ t('dashboard.quickActionsSelect') }}</span>
          </template>
          <template #option="slotProps">
            <div class="option-row">
              <i :class="slotProps.option.icon" />
              <span>{{ slotProps.option.label }}</span>
              <i v-if="slotProps.option.locked" class="pi pi-lock" />
            </div>
          </template>
        </Dropdown>
      </label>
      <label class="field">
        <span class="field-label">{{ t('field.label') }}</span>
        <InputText v-model="label" :disabled="loading" required />
      </label>
    </form>
    <template #footer>
      <Button :label="t('dialog.close')" severity="secondary" text @click="$emit('close')" />
      <Button
        :label="mode === 'edit' ? t('dialog.save') : t('button.create')"
        icon="pi pi-check"
        :loading="loading"
        :disabled="!canSave"
        @click="onSave"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from '@/shared/i18n/i18n'
import type { Action, Resource } from '@/shared/types/permissions'
import type { ReadQuickActionDTO } from './dashboard.api'

export interface QuickActionOption {
  key: string
  label: string
  resource: Resource
  action: Action
  to: string
  icon: string
  locked: boolean
  kind: 'view' | 'create' | 'filters'
}

const props = defineProps<{
  visible: boolean
  loading?: boolean
  options: QuickActionOption[]
  mode?: 'create' | 'edit'
  item?: ReadQuickActionDTO | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { label: string; option: QuickActionOption }): void
}>()

const { t } = useI18n()
const formRef = ref<HTMLFormElement | null>(null)
const selectedKey = ref<string | null>(null)
const label = ref('')
const lastDefaultLabel = ref('')

const selectedOption = computed(
  () => props.options.find((item) => item.key === selectedKey.value) || null
)

const mode = computed(() => props.mode ?? 'create')

const title = computed(() =>
  mode.value === 'edit' ? t('dialog.edit') : t('dashboard.quickActionsAdd')
)

const canSave = computed(() => {
  return !!selectedOption.value && label.value.trim().length > 0
})

const resolveKind = (item: ReadQuickActionDTO) => {
  if (item.to.includes('#filters')) {
    return 'filters'
  }
  if (item.to.includes('#create') || item.action === 'create') {
    return 'create'
  }
  return 'view'
}

watch(
  () => [props.visible, props.item],
  ([visible, item]) => {
    if (!visible) {
      selectedKey.value = null
      label.value = ''
      lastDefaultLabel.value = ''
      return
    }
    if (item) {
      const kind = resolveKind(item)
      const option = props.options.find(
        (entry) => entry.resource === item.resource && entry.kind === kind
      )
      selectedKey.value = option?.key ?? null
      label.value = item.label || ''
      lastDefaultLabel.value = option?.label || ''
    }
  }
)

watch(
  selectedOption,
  (option) => {
    if (!option) {
      return
    }
    if (!label.value || label.value === lastDefaultLabel.value) {
      label.value = option.label
    }
    lastDefaultLabel.value = option.label
  }
)

const onSave = () => {
  if (!canSave.value || !selectedOption.value) {
    return
  }
  if (formRef.value && !formRef.value.reportValidity()) {
    return
  }
  emit('save', { label: label.value.trim(), option: selectedOption.value })
}
</script>

<style scoped>
.quick-action-form {
  display: grid;
  gap: 1rem;
}

.quick-action-select {
  width: 100%;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field-label {
  font-size: 0.85rem;
  color: #4b5b5a;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.option-row .pi-lock {
  margin-left: auto;
  font-size: 0.9rem;
  color: #c57b0a;
}

.option-placeholder {
  color: #8b9796;
}
</style>
