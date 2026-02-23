import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface ReadEntityBranchDTO {
  id: UUID
  name: string | null
  code: string | null
}

export interface ReadEntityDTO {
  id: UUID
  branch_id: UUID | null
  code: string
  name: string
  full_name: string | null
  address: string | null
  created_at: string
  updated_at: string
  branch?: ReadEntityBranchDTO | null
}

export interface ReadListEntityDTO extends ReadEntityDTO {}

export interface CreateEntityDTO {
  branch_id?: UUID | null
  code: string
  name: string
  full_name?: string | null
  address?: string | null
}

export interface UpdateEntityDTO extends Partial<CreateEntityDTO> {
  branch_id?: UUID | null
  code?: string | null
  name?: string | null
  full_name?: string | null
  address?: string | null
}

export const listEntities = (params: Record<string, any>) =>
  apiReadListRequest<ReadListEntityDTO>('/objects', {
    method: 'GET',
    params: { ...params, include: params?.include || 'branch' }
  })

export const createEntity = (payload: CreateEntityDTO) =>
  apiCreateRequest<ReadEntityDTO>('/objects', { method: 'POST', body: payload })

export const updateEntity = (id: UUID, payload: UpdateEntityDTO) =>
  apiUpdateRequest<ReadEntityDTO>(`/objects/${id}`, { method: 'PATCH', body: payload })

export const deleteEntity = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/objects/${id}`, { method: 'DELETE' })
