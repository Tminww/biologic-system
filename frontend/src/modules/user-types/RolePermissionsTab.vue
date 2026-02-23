<template>
  <div class="permissions-tab">
    <p class="permissions-hint">{{ t('roles.permissionsHint') }}</p>
    <RolePermissionMatrix
      :permissions="permissions"
      :readOnly="readOnly"
      @update:permissions="$emit('update:permissions', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/shared/i18n/i18n'
import RolePermissionMatrix from './RolePermissionMatrix.vue'
import type { Permission } from '@/shared/types/permissions'

defineProps<{
  permissions: Permission[]
  readOnly?: boolean
}>()

defineEmits<{
  (e: 'update:permissions', value: Permission[]): void
}>()

const { t } = useI18n()
</script>

<style scoped>
.permissions-tab {
  display: grid;
  gap: 1rem;
}

.permissions-hint {
  margin: 0;
  color: #516462;
}
</style>
