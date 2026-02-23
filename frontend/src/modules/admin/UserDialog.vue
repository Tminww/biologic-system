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
            <span class="field-label">{{ t('field.username') }}</span>
            <InputText v-model="form.username" :disabled="readOnly" required />
          </label>
          <label class="field">
            <span class="field-label">{{ t('field.code') }}</span>
            <InputText v-model="form.code" :disabled="readOnly" />
          </label>
          <label class="field">
            <span class="field-label">{{ t('field.name') }}</span>
            <InputText v-model="form.first_name" :disabled="readOnly" />
          </label>
          <label class="field">
            <span class="field-label">{{ t('field.nameFull') }}</span>
            <InputText v-model="form.last_name" :disabled="readOnly" />
          </label>
          <label class="field">
            <span class="field-label">{{ t('field.comment') }}</span>
            <InputText v-model="form.patronymic" :disabled="readOnly" />
          </label>
          <label class="field">
            <span class="field-label">{{ t('field.role') }}</span>
            <Dropdown
              v-model="form.role_id"
              :options="roleOptions"
              optionLabel="label"
              optionValue="value"
              :disabled="readOnly"
            />
          </label>
          <label class="field">
            <span class="field-label">{{ t('field.department') }}</span>
            <Dropdown
              v-model="form.lab_id"
              :options="labOptions"
              optionLabel="label"
              optionValue="value"
              :disabled="readOnly"
            />
          </label>
          <label class="field field-switch">
            <span class="field-label">Registrar</span>
            <InputSwitch v-model="form.is_registrar" :disabled="readOnly" />
          </label>
          <label class="field field-switch">
            <span class="field-label">Lab head</span>
            <InputSwitch v-model="form.is_lab_head" :disabled="readOnly" />
          </label>
          <label class="field field-switch">
            <span class="field-label">Branch head</span>
            <InputSwitch v-model="form.is_branch_head" :disabled="readOnly" />
          </label>
          <label v-if="mode === 'create' || mode === 'edit'" class="field">
            <span class="field-label">{{ t('login.password') }}</span>
            <Password
              v-model="form.password_hash"
              toggleMask
              :feedback="false"
              :disabled="readOnly"
              :required="mode === 'create'"
            />
          </label>
        </form>
      </TabPanel>
      <TabPanel>
        <template #header>
          <span class="dialog-tab-header">
            <span class="dialog-tab-label">{{ t('tab.permissions') }}</span>
            <Badge v-if="overridesCount > 0" :value="overridesCount" severity="danger" />
          </span>
        </template>
        <div v-if="permissionsLoading" class="permissions-loading">
          <ProgressSpinner />
        </div>
        <PermissionsTab
          v-else
          :rolePermissions="rolePermissions"
          :overrides="overrides"
          :readOnly="readOnly"
          @update:overrides="$emit('update:overrides', $event)"
        />
      </TabPanel>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import TabPanel from 'primevue/tabpanel'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import ProgressSpinner from 'primevue/progressspinner'
import Badge from 'primevue/badge'
import Password from 'primevue/password'
import InputSwitch from 'primevue/inputswitch'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import { useI18n } from '@/shared/i18n/i18n'
import PermissionsTab from './PermissionsTab.vue'
import type { Permission, PermissionOverride } from '@/shared/types/permissions'
import type { ReadUserDTO, UpdateUserDTO, CreateUserDTO } from './admin.api'
import type { FieldOption } from '@/shared/types/form'

const props = defineProps<{
  visible: boolean
  mode: 'view' | 'edit' | 'create'
  item: ReadUserDTO | null
  loading?: boolean
  readOnly?: boolean
  canEdit?: boolean
  rolePermissions: Permission[]
  overrides: PermissionOverride[]
  permissionsLoading?: boolean
  roleOptions: FieldOption[]
  labOptions: FieldOption[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: CreateUserDTO | UpdateUserDTO): void
  (e: 'edit'): void
  (e: 'update:overrides', value: PermissionOverride[]): void
}>()

const form = reactive({
  username: '',
  code: '',
  first_name: '',
  last_name: '',
  patronymic: '',
  role_id: '' as string,
  lab_id: null as string | null,
  is_registrar: false,
  is_lab_head: false,
  is_branch_head: false,
  password_hash: ''
})
const formRef = ref<HTMLFormElement | null>(null)
const { t } = useI18n()

const overridesCount = computed(() => props.overrides?.length || 0)

watch(
  () => props.item,
  (item) => {
    if (!item) {
      form.username = ''
      form.code = ''
      form.first_name = ''
      form.last_name = ''
      form.patronymic = ''
      form.role_id = ''
      form.lab_id = null
      form.is_registrar = false
      form.is_lab_head = false
      form.is_branch_head = false
      form.password_hash = ''
      return
    }
    form.username = item.username
    form.code = item.code || ''
    form.first_name = item.first_name || ''
    form.last_name = item.last_name || ''
    form.patronymic = item.patronymic || ''
    form.role_id = item.role_id
    form.lab_id = item.lab_id
    form.is_registrar = !!item.is_registrar
    form.is_lab_head = !!item.is_lab_head
    form.is_branch_head = !!item.is_branch_head
    form.password_hash = ''
  },
  { immediate: true }
)

const title = computed(() => {
  if (props.mode === 'create') {
    return t('users.createTitle')
  }
  if (props.mode === 'edit') {
    return t('users.editTitle')
  }
  return t('users.viewTitle')
})

const normalizeString = (value: string) => {
  const normalized = value.trim()
  return normalized ? normalized : null
}

const onSave = () => {
  if (formRef.value && !formRef.value.reportValidity()) {
    return
  }

  const payload: UpdateUserDTO = {
    username: form.username,
    code: normalizeString(form.code),
    first_name: normalizeString(form.first_name),
    last_name: normalizeString(form.last_name),
    patronymic: normalizeString(form.patronymic),
    role_id: form.role_id || undefined,
    lab_id: form.lab_id,
    is_registrar: form.is_registrar,
    is_lab_head: form.is_lab_head,
    is_branch_head: form.is_branch_head
  }

  if (form.password_hash.trim()) {
    payload.password_hash = form.password_hash
  }

  emit('save', payload)
}
</script>

<style scoped>
.form-grid {
  display: grid;
  gap: 1rem;
}

.form-grid :deep(.p-inputtext),
.form-grid :deep(.p-dropdown),
.form-grid :deep(.p-password) {
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

.field-switch {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
