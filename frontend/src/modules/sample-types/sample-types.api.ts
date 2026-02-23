import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface CreateSampleTypeDTO {
  code: string
  name: string
}

export interface UpdateSampleTypeDTO {
  code?: string | null
  name?: string | null
}

export interface ReadSampleTypeDTO {
  id: UUID
  code: string
  name: string
  created_at: string
  updated_at: string
}

export interface ReadListSampleTypeDTO {
  id: UUID
  code: string
  name: string
  created_at: string
  updated_at: string
}

export interface SampleTypeDeleteDTO {
  id: UUID
  reason?: string | null
}

export const listSampleTypes = (params: Record<string, any>) =>
  apiReadListRequest<ReadListSampleTypeDTO>('/sample_types', { method: 'GET', params })

export const createSampleType = (payload: CreateSampleTypeDTO) =>
  apiCreateRequest<ReadSampleTypeDTO>('/sample_types', { method: 'POST', body: payload })

export const updateSampleType = (id: UUID, payload: UpdateSampleTypeDTO) =>
  apiUpdateRequest<ReadSampleTypeDTO>(`/sample_types/${id}`, { method: 'PATCH', body: payload })

export const deleteSampleType = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/sample_types/${id}`, { method: 'DELETE' })
