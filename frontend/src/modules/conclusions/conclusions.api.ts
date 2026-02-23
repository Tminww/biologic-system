import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface CreateConclusionStatusDTO {
  code?: string | null
  name?: string | null
}

export interface UpdateConclusionStatusDTO {
  code?: string | null
  name?: string | null
}

export interface ReadConclusionStatusDTO {
  id: UUID
  code: string | null
  name: string | null
  created_at: string
  updated_at: string
}

export interface ReadListConclusionStatusDTO {
  id: UUID
  code: string | null
  name: string | null
  created_at: string
  updated_at: string
}

export interface DeleteConclusionStatusDTO {
  id: UUID
  reason?: string | null
}

export interface CreateConclusionDTO {
  comment?: string | null
  conclusion_status_id: UUID
}

export interface UpdateConclusionDTO {
  comment?: string | null
  conclusion_status_id?: UUID | null
}

export interface ReadConclusionDTO {
  id: UUID
  comment: string | null
  conclusion_status_id: UUID
  created_at: string
  updated_at: string
  conclusion_status?: ReadConclusionStatusDTO | null
}

export interface ReadListConclusionDTO {
  id: UUID
  comment: string | null
  conclusion_status_id: UUID
  created_at: string
  updated_at: string
  conclusion_status?: ReadConclusionStatusDTO | null
}

export interface DeleteConclusionDTO {
  id: UUID
  reason?: string | null
}


export const listConclusions = (params: Record<string, any>) =>
  apiReadListRequest<ReadListConclusionDTO>('/conclusions', {
    method: 'GET',
    params: { ...params, include: params?.include || 'conclusion_status' }
  })

export const listConclusionStatuses = (params: Record<string, any>) =>
  apiReadListRequest<ReadListConclusionStatusDTO>('/conclusion_statuses', { method: 'GET', params })

export const createConclusion = (payload: CreateConclusionDTO) =>
  apiCreateRequest<ReadConclusionDTO>('/conclusions', { method: 'POST', body: payload })

export const updateConclusion = (id: UUID, payload: UpdateConclusionDTO) =>
  apiUpdateRequest<ReadConclusionDTO>(`/conclusions/${id}`, { method: 'PATCH', body: payload })

export const deleteConclusion = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/conclusions/${id}`, { method: 'DELETE' })
