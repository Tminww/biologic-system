<template>
  <div class="permissions-tab">
    <p class="permissions-hint">{{ t('permissions.hint') }}</p>
    <PermissionMatrix
      :rolePermissions="rolePermissions"
      :overrides="overrides"
      :readOnly="readOnly"
      @update:overrides="$emit('update:overrides', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import PermissionMatrix from './PermissionMatrix.vue'
import { useI18n } from '@/shared/i18n/i18n'
import type { Permission, PermissionOverride } from '@/shared/types/permissions'

defineProps<{
  rolePermissions: Permission[]
  overrides: PermissionOverride[]
  readOnly?: boolean
}>()

defineEmits<{
  (e: 'update:overrides', value: PermissionOverride[]): void
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
