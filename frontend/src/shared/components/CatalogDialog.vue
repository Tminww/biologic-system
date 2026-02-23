<template>
  <BaseDialog
    :visible="visible"
    :mode="mode"
    :title="title"
    :loading="loading"
    :readOnly="readOnly"
    :canEdit="canEdit"
    @close="$emit('close')"
    @save="onSave"
    @edit="$emit('edit')"
  >
    <template #tabs>
      <TabPanel :header="t('tab.details')">
        <form ref="formRef" class="form-grid" @submit.prevent="onSave">
          <label v-for="field in fields" :key="field.key" class="field">
            <span class="field-label">{{ field.label }}</span>
            <InputText
              v-if="field.type === 'text' || !field.type"
              v-model="form[field.key]"
              :disabled="readOnly"
              :required="field.required"
            />
            <Textarea
              v-else-if="field.type === 'textarea'"
              v-model="form[field.key]"
              :disabled="readOnly"
              :required="field.required"
              autoResize
              rows="4"
            />
            <InputNumber
              v-else-if="field.type === 'number'"
              v-model="form[field.key]"
              :disabled="readOnly"
              :required="field.required"
              :minFractionDigits="0"
              :maxFractionDigits="6"
            />
            <InputSwitch
              v-else-if="field.type === 'boolean'"
              v-model="form[field.key]"
              :disabled="readOnly"
            />
            <DatePicker
              v-else-if="field.type === 'date'"
              v-model="form[field.key]"
              :disabled="readOnly"
              :manualInput="false"
              showButtonBar
            />
            <Dropdown
              v-else-if="field.type === 'select'"
              v-model="form[field.key]"
              :disabled="readOnly"
              :options="field.options || []"
              optionLabel="label"
              optionValue="value"
              :placeholder="t('table.select')"
            />
          </label>
        </form>
      </TabPanel>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import TabPanel from 'primevue/tabpanel'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import DatePicker from 'primevue/datepicker'
import Dropdown from 'primevue/dropdown'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import type { FormField } from '@/shared/types/form'
import { useI18n } from '@/shared/i18n/i18n'

const props = defineProps<{
  visible: boolean
  mode: 'view' | 'edit' | 'create'
  title: string
  item: Record<string, any> | null
  fields: FormField[]
  loading?: boolean
  readOnly?: boolean
  canEdit?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: Record<string, any>): void
  (e: 'edit'): void
}>()

const { t } = useI18n()
const form = reactive<Record<string, any>>({})
const formRef = ref<HTMLFormElement | null>(null)

const resolvePath = (row: Record<string, any> | null, path: string) =>
  path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), row)

const initForm = () => {
  props.fields.forEach((field) => {
    const raw = resolvePath(props.item, field.key)
    if (field.type === 'date') {
      form[field.key] = raw ? new Date(raw) : null
      return
    }
    if (field.type === 'boolean') {
      form[field.key] = raw ?? false
      return
    }
    if (field.type === 'number' || field.type === 'select') {
      form[field.key] = raw ?? null
      return
    }
    form[field.key] = raw ?? ''
  })
}

watch(
  [() => props.item, () => props.visible, () => props.mode],
  () => {
    if (!props.visible) {
      return
    }
    initForm()
  },
  { immediate: true }
)

const setPathValue = (target: Record<string, any>, path: string, value: any) => {
  const keys = path.split('.')
  let current = target
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value
      return
    }
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  })
}

const normalizeValue = (field: FormField, value: any) => {
  if (field.type === 'date') {
    return value instanceof Date ? value.toISOString() : value ?? null
  }
  if (field.type === 'number' && value === '') {
    return null
  }
  return value
}

const onSave = () => {
  if (formRef.value && !formRef.value.reportValidity()) {
    return
  }
  const payload: Record<string, any> = {}
  props.fields.forEach((field) => {
    const value = normalizeValue(field, form[field.key])
    setPathValue(payload, field.key, value)
  })
  emit('save', payload)
}
</script>

<style scoped>
.form-grid {
  display: grid;
  gap: 1rem;
}

.form-grid :deep(.p-inputtext),
.form-grid :deep(.p-textarea),
.form-grid :deep(.p-dropdown),
.form-grid :deep(.p-inputnumber),
.form-grid :deep(.p-datepicker) {
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
</style>
