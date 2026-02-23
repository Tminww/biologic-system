import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface CreateProtocolTypeDTO {
  code?: string | null
  name: string
}

export interface UpdateProtocolTypeDTO {
  code?: string | null
  name?: string | null
}

export interface ReadProtocolTypeDTO {
  id: UUID
  code: string | null
  name: string
  created_at: string
  updated_at: string
}

export interface ReadListProtocolTypeDTO {
  id: UUID
  code: string | null
  name: string
  created_at: string
  updated_at: string
}

export interface ProtocolTypeDeleteDTO {
  id: UUID
  reason?: string | null
}

export const listProtocolTypes = (params: Record<string, any>) =>
  apiReadListRequest<ReadListProtocolTypeDTO>('/protocol_types', { method: 'GET', params })

export const createProtocolType = (payload: CreateProtocolTypeDTO) =>
  apiCreateRequest<ReadProtocolTypeDTO>('/protocol_types', { method: 'POST', body: payload })

export const updateProtocolType = (id: UUID, payload: UpdateProtocolTypeDTO) =>
  apiUpdateRequest<ReadProtocolTypeDTO>(`/protocol_types/${id}`, { method: 'PATCH', body: payload })

export const deleteProtocolType = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/protocol_types/${id}`, { method: 'DELETE' })
