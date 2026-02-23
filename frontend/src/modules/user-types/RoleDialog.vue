<template>
  <BaseDialog
    :visible="visible"
    :mode="mode"
    :title="title"
    :loading="loading"
    :readOnly="readOnly"
    :canEdit="canEdit"
    actionScope="all"
    @close="$emit('close')"
    @save="onSave"
    @edit="$emit('edit')"
  >
    <template #tabs>
      <TabPanel :header="t('tab.details')">
        <form ref="formRef" class="form-grid" @submit.prevent="onSave">
          <label class="field">
            <span class="field-label">{{ t('field.code') }}</span>
            <InputText v-model="form.key" :disabled="readOnly" required />
          </label>
          <label class="field">
            <span class="field-label">{{ t('field.name') }}</span>
            <InputText v-model="form.name" :disabled="readOnly" required />
          </label>
        </form>
      </TabPanel>
      <TabPanel>
        <template #header>
          <span class="dialog-tab-header">
            <span class="dialog-tab-label">{{ t('tab.permissions') }}</span>
            <Badge v-if="permissionsCount > 0" :value="permissionsCount" severity="success" />
          </span>
        </template>
        <div v-if="permissionsLoading" class="permissions-loading">
          <ProgressSpinner />
        </div>
        <RolePermissionsTab
          v-else
          :permissions="permissions"
          :readOnly="readOnly"
          @update:permissions="$emit('update:permissions', $event)"
        />
      </TabPanel>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import TabPanel from 'primevue/tabpanel'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'
import Badge from 'primevue/badge'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import { useI18n } from '@/shared/i18n/i18n'
import type { Permission } from '@/shared/types/permissions'
import type { ReadUserTypeDTO, UUID } from './user-types.api'
import RolePermissionsTab from './RolePermissionsTab.vue'

const props = defineProps<{
  visible: boolean
  mode: 'view' | 'edit' | 'create'
  item: ReadUserTypeDTO | null
  loading?: boolean
  readOnly?: boolean
  canEdit?: boolean
  permissions: Permission[]
  permissionsLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { id?: UUID; key: string; name: string }): void
  (e: 'edit'): void
  (e: 'update:permissions', value: Permission[]): void
}>()

const form = reactive({
  key: '',
  name: ''
})
const formRef = ref<HTMLFormElement | null>(null)
const { t } = useI18n()

const permissionsCount = computed(() => props.permissions?.length || 0)

watch(
  () => props.item,
  (item) => {
    if (!item) {
      form.key = ''
      form.name = ''
      return
    }
    form.key = item.key
    form.name = item.name
  },
  { immediate: true }
)

const title = computed(() => {
  if (props.mode === 'create') {
    return `${t('button.create')} ${t('resource.user-types')}`
  }
  if (props.mode === 'edit') {
    return `${t('dialog.edit')} ${t('resource.user-types')}`
  }
  return t('resource.user-types')
})

const onSave = () => {
  if (formRef.value && !formRef.value.reportValidity()) {
    return
  }
  emit('save', {
    id: props.item?.id,
    key: form.key,
    name: form.name
  })
}
</script>

<style scoped>
.form-grid {
  display: grid;
  gap: 1rem;
}

.form-grid :deep(.p-inputtext) {
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

.permissions-loading {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.dialog-tab-header {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
