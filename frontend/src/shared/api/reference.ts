import { apiReadListRequest } from '@/shared/api/client'
import type { FieldOption } from '@/shared/types/form'

type ReferenceRow = {
  id: string | number
  name?: string | null
  code?: string | null
  [key: string]: any
}

export const toReferenceLabel = (row: ReferenceRow) => {
  if (row.name && row.code) {
    return `${row.name} (${row.code})`
  }
  if (row.name) {
    return row.name
  }
  if (row.code) {
    return row.code
  }
  return String(row.id)
}

export const loadReferenceOptions = async (
  path: string,
  params: Record<string, any> = {},
  labelResolver: (row: ReferenceRow) => string = toReferenceLabel
): Promise<FieldOption[]> => {
  const response = await apiReadListRequest<ReferenceRow>(path, {
    method: 'GET',
    params: {
      offset: 0,
      limit: 500,
      ...params
    }
  })
  return response.items.map((row) => ({
    label: labelResolver(row),
    value: row.id
  }))
}
