<template>
  <div class="row-actions">
    <Button
      :icon="canView ? 'pi pi-eye' : 'pi pi-lock'"
      text
      severity="contrast"
      :aria-label="t('button.more')"
      :disabled="!canView"
      :title="canView ? undefined : t('noAccess')"
      @click="$emit('view')"
    />
    <Button
      :icon="canEdit ? 'pi pi-pencil' : 'pi pi-lock'"
      text
      severity="contrast"
      :aria-label="t('dialog.edit')"
      :disabled="!canEdit"
      :title="canEdit ? undefined : t('noAccess')"
      @click="$emit('edit')"
    />
    <Button
      :icon="canDelete ? 'pi pi-trash' : 'pi pi-lock'"
      text
      severity="danger"
      :aria-label="t('button.delete')"
      :disabled="!canDelete"
      :title="canDelete ? undefined : t('noAccess')"
      @click="$emit('delete')"
    />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import type { Resource } from '@/shared/types/permissions'
import { useI18n } from '@/shared/i18n/i18n'
import { computed } from 'vue'
import { usePermission } from '@/shared/composables/usePermission'

const props = defineProps<{
  resource: Resource
}>()

defineEmits<{
  (e: 'view'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const { t } = useI18n()
const { can } = usePermission()

const canView = computed(() => can(props.resource, 'view'))
const canEdit = computed(() => can(props.resource, 'edit'))
const canDelete = computed(() => can(props.resource, 'delete'))
</script>
