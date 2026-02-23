import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Ref } from 'vue'

interface TableHashTarget {
  openFilters: (preset?: string) => void
}

interface TableHashOptions {
  tableRef: Ref<TableHashTarget | null>
}

const parseFiltersHash = (hash: string) => {
  const normalized = hash.replace('#', '').trim()
  if (!normalized) {
    return null
  }
  if (normalized === 'filters') {
    return ''
  }
  if (normalized.startsWith('filters=')) {
    return decodeURIComponent(normalized.slice('filters='.length))
  }
  if (normalized.startsWith('filters:')) {
    return decodeURIComponent(normalized.slice('filters:'.length))
  }
  return null
}

export const useTableHash = ({ tableRef }: TableHashOptions) => {
  const route = useRoute()
  const lastHandledHash = ref<string | null>(null)
  const pendingHash = ref<string | null>(null)

  const openFromHash = () => {
    const hash = route.hash
    if (!hash) {
      lastHandledHash.value = null
      pendingHash.value = null
      return
    }
    if (hash === lastHandledHash.value) {
      return
    }
    const preset = parseFiltersHash(hash)
    if (preset === null) {
      return
    }
    if (!tableRef.value) {
      pendingHash.value = hash
      return
    }
    tableRef.value.openFilters(preset || undefined)
    lastHandledHash.value = hash
    pendingHash.value = null
  }

  watch(
    () => route.hash,
    () => {
      openFromHash()
    },
    { immediate: true }
  )

  watch(
    () => tableRef.value,
    () => {
      if (pendingHash.value) {
        openFromHash()
      }
    }
  )
}
