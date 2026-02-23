import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface ReadStatusDTO {
  id: UUID
  code: string | null
  name: string
  created_at: string
  updated_at: string
}

export interface ReadListStatusDTO extends ReadStatusDTO {}

export interface CreateStatusDTO {
  code?: string | null
  name: string
}

export interface UpdateStatusDTO extends Partial<CreateStatusDTO> {}

export const listStatuses = (params: Record<string, any>) =>
  apiReadListRequest<ReadListStatusDTO>('/statuses', { method: 'GET', params })

export const createStatus = (payload: CreateStatusDTO) =>
  apiCreateRequest<ReadStatusDTO>('/statuses', { method: 'POST', body: payload })

export const updateStatus = (id: UUID, payload: UpdateStatusDTO) =>
  apiUpdateRequest<ReadStatusDTO>(`/statuses/${id}`, { method: 'PATCH', body: payload })

export const deleteStatus = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/statuses/${id}`, { method: 'DELETE' })
