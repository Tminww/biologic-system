import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
  code: string | null
}

export interface ReadTestDTO {
  id: UUID
  value: string | null
  comment: string | null
  norm: string | null
  is_active: boolean
  result_id: UUID
  indicator_id: UUID | null
  status_id: UUID | null
  created_at: string
  updated_at: string
  result?: EntityRefDTO | null
  indicator?: EntityRefDTO | null
  status?: EntityRefDTO | null
}

export interface ReadListTestDTO extends ReadTestDTO {}

export interface CreateTestDTO {
  value?: string | null
  comment?: string | null
  norm?: string | null
  is_active: boolean
  result_id: UUID
  indicator_id?: UUID | null
  status_id?: UUID | null
}

export interface UpdateTestDTO extends Partial<CreateTestDTO> {}

export const listTests = (params: Record<string, any>) =>
  apiReadListRequest<ReadListTestDTO>('/tests', {
    method: 'GET',
    params: { ...params, include: params?.include || 'result,indicator,status' }
  })

export const createTest = (payload: CreateTestDTO) =>
  apiCreateRequest<ReadTestDTO>('/tests', { method: 'POST', body: payload })

export const updateTest = (id: UUID, payload: UpdateTestDTO) =>
  apiUpdateRequest<ReadTestDTO>(`/tests/${id}`, { method: 'PATCH', body: payload })

export const deleteTest = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/tests/${id}`, { method: 'DELETE' })
