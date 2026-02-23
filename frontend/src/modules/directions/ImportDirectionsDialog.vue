<template>
  <Dialog
    :visible="visible"
    modal
    :header="t('directions.importTitle')"
    :style="{ width: '520px' }"
    @update:visible="$emit('close')"
  >
    <div class="import-body" :class="{ 'has-file': !!file }">
      <FileUpload
        ref="uploader"
        name="file"
        mode="advanced"
        :customUpload="true"
        :showUploadButton="false"
        :showCancelButton="false"
        :multiple="false"
        accept=".xlsx,.csv"
        :disabled="loading"
        :chooseLabel="t('file.choose')"
        @select="onSelect"
        @clear="onClear"
        @remove="onClear"
      >
        <template #empty>
          <div class="import-drop">
            <i class="pi pi-cloud-upload" />
            <span class="import-drop-title">{{ t('directions.importHint') }}</span>
            <span class="import-drop-subtitle">{{ t('directions.importFormats') }}</span>
          </div>
        </template>
      </FileUpload>
      <div v-if="file" class="import-file">
        <div class="import-file-info">
          <div class="import-file-title">
            <i class="pi pi-file" />
            <span>{{ fileName }}</span>
          </div>
          <div class="import-file-meta">
            <span>{{ t('file.size') }}: {{ fileSize }}</span>
            <span>{{ t('file.modified') }}: {{ fileModified }}</span>
          </div>
        </div>
        <Button
          icon="pi pi-times"
          text
          rounded
          severity="secondary"
          :aria-label="t('file.remove')"
          @click="onClear"
        />
      </div>
    </div>
    <template #footer>
      <Button :label="t('dialog.close')" severity="secondary" @click="$emit('close')" />
      <Button
        :label="t('button.upload')"
        icon="pi pi-upload"
        :disabled="!file || loading"
        :loading="loading"
        @click="submit"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import { useI18n } from '@/shared/i18n/i18n'

const props = defineProps<{
  visible: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'import', file: File): void
}>()

const { t } = useI18n()
const file = ref<File | null>(null)
const uploader = ref<any>(null)

const fileName = computed(() => file.value?.name || '')
const fileSize = computed(() => (file.value ? formatSize(file.value.size) : '-'))
const fileModified = computed(() =>
  file.value ? new Date(file.value.lastModified).toLocaleString() : '-'
)

watch(
  () => props.visible,
  (value) => {
    if (!value) {
      file.value = null
    }
  }
)

const onSelect = (event: { files?: File[] }) => {
  file.value = event.files?.[0] || null
}

const onClear = () => {
  file.value = null
  uploader.value?.clear?.()
}

const submit = () => {
  if (!file.value) {
    return
  }
  emit('import', file.value)
}

const formatSize = (size: number) => {
  if (!size) {
    return '0 B'
  }
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1)
  const value = size / Math.pow(1024, index)
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`
}
</script>

<style scoped>
.import-body {
  display: grid;
  gap: 1rem;
}

.import-drop {
  display: grid;
  gap: 0.35rem;
  text-align: center;
  padding: 1.5rem 1rem;
  color: #5b6b6a;
}

.import-body :deep(.p-fileupload-buttonbar) {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0 0 0.75rem;
  width: 100%;
}

.import-body :deep(.p-fileupload-choose) {
  margin: 0 auto;
  display: inline-flex;
}

.import-body :deep(.p-fileupload-buttonbar .p-button) {
  margin: 0;
}

.import-body.has-file :deep(.p-fileupload-buttonbar) {
  display: none;
}

.import-body.has-file :deep(.p-fileupload-content) {
  display: none;
}

.import-drop i {
  font-size: 1.6rem;
  color: #1f7a6e;
}

.import-drop-title {
  font-weight: 600;
  color: #1f2f2e;
}

.import-drop-subtitle {
  font-size: 0.85rem;
}

.import-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  background: #f5f9f8;
  color: #1f2f2e;
}

.import-file-info {
  display: grid;
  gap: 0.35rem;
}

.import-file-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.import-file-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #5b6b6a;
}
</style>
