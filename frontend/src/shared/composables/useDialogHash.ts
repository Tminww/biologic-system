import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Ref } from 'vue'

type HashAction = 'create' | 'view' | 'edit' | 'import'

interface HashResult {
  action: HashAction
  id?: string
}

interface DialogHashOptions<T extends { id: number | string }> {
  items?: Ref<T[]>
  openCreate: () => void
  openView?: (row: T) => void
  openEdit?: (row: T) => void
  openImport?: () => void
  resolveById?: (id: string) => Promise<T | null>
}

const parseHash = (hash: string): HashResult | null => {
  const normalized = decodeURIComponent(hash.replace('#', '').trim())
  if (!normalized) {
    return null
  }
  if (normalized === 'create') {
    return { action: 'create' }
  }
  if (normalized === 'import') {
    return { action: 'import' }
  }
  const match = normalized.match(/^(view|edit)([:=-])(.+)$/)
  if (!match) {
    return null
  }
  return { action: match[1] as HashAction, id: match[3] }
}

export const useDialogHash = <T extends { id: number | string }>(options: DialogHashOptions<T>) => {
  const route = useRoute()
  const lastHandledHash = ref<string | null>(null)
  const pendingHash = ref<string | null>(null)

  const resolveItem = async (id: string) => {
    const items = options.items?.value || []
    const found = items.find((item) => String(item.id) === id)
    if (found) {
      return found
    }
    if (options.resolveById) {
      return options.resolveById(id)
    }
    return null
  }

  const openFromHash = async () => {
    const hash = route.hash
    if (!hash) {
      lastHandledHash.value = null
      pendingHash.value = null
      return
    }
    if (hash === lastHandledHash.value) {
      return
    }
    const parsed = parseHash(hash)
    if (!parsed) {
      return
    }
    if (parsed.action === 'create') {
      options.openCreate()
      lastHandledHash.value = hash
      pendingHash.value = null
      return
    }
    if (parsed.action === 'import') {
      if (options.openImport) {
        options.openImport()
        lastHandledHash.value = hash
      }
      pendingHash.value = null
      return
    }
    if (!parsed.id) {
      return
    }
    const target = await resolveItem(parsed.id)
    if (!target) {
      pendingHash.value = hash
      return
    }
    if (parsed.action === 'edit' && options.openEdit) {
      options.openEdit(target)
    } else if (options.openView) {
      options.openView(target)
    }
    lastHandledHash.value = hash
    pendingHash.value = null
  }

  watch(
    () => route.hash,
    () => {
      void openFromHash()
    },
    { immediate: true }
  )

  if (options.items) {
    watch(
      () => options.items?.value,
      () => {
        if (pendingHash.value) {
          void openFromHash()
        }
      }
    )
  }
}
