<template>
  <Dialog
    :visible="visible"
    modal
    :style="{ width: '720px' }"
    @update:visible="$emit('close')"
  >
    <template #header>
      <div class="dialog-header">
        <span class="dialog-header-title p-dialog-title">{{ title }}</span>
      </div>
    </template>

    <TabView v-model:activeIndex="activeIndex">
      <slot name="tabs" />
    </TabView>

    <template #footer>
      <slot name="footer">
        <Button :label="t('dialog.close')" severity="secondary" @click="$emit('close')" />
        <Button
          v-if="showSave"
          :label="t('dialog.save')"
          icon="pi pi-check"
          :loading="loading"
          :disabled="readOnly"
          @click="$emit('save')"
        />
      </slot>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import TabView from 'primevue/tabview'
import Button from 'primevue/button'
import { useI18n } from '@/shared/i18n/i18n'

const props = defineProps<{
  visible: boolean
  mode: 'view' | 'edit' | 'create'
  title: string
  loading?: boolean
  readOnly?: boolean
  canEdit?: boolean
  actionScope?: 'all' | 'details'
  detailsTabIndex?: number
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
  (e: 'edit'): void
}>()

const { t } = useI18n()
const activeIndex = ref(props.detailsTabIndex ?? 0)

watch(
  () => props.visible,
  (value) => {
    if (!value) {
      activeIndex.value = props.detailsTabIndex ?? 0
    }
  }
)

const showSave = computed(() => {
  if (props.mode === 'view') {
    return false
  }
  const scope = props.actionScope ?? 'details'
  if (scope === 'all') {
    return true
  }
  return activeIndex.value === (props.detailsTabIndex ?? 0)
})
</script>

<style scoped>
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.dialog-header-title {
  font-weight: 600;
}

</style>
