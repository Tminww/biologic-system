import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
}

export interface ReadLabDTO {
  id: UUID
  branch_id: UUID | null
  code: string | null
  name: string | null
  full_name: string | null
  created_at: string
  updated_at: string
  branch?: EntityRefDTO | null
}

export interface ReadListLabDTO extends ReadLabDTO {}

export interface CreateLabDTO {
  branch_id?: UUID | null
  code?: string | null
  name?: string | null
  full_name?: string | null
}

export interface UpdateLabDTO extends Partial<CreateLabDTO> {}

export const listLabs = (params: Record<string, any>) =>
  apiReadListRequest<ReadListLabDTO>('/labs', {
    method: 'GET',
    params: { ...params, include: params?.include || 'branch' }
  })

export const createLab = (payload: CreateLabDTO) =>
  apiCreateRequest<ReadLabDTO>('/labs', { method: 'POST', body: payload })

export const updateLab = (id: UUID, payload: UpdateLabDTO) =>
  apiUpdateRequest<ReadLabDTO>(`/labs/${id}`, { method: 'PATCH', body: payload })

export const deleteLab = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/labs/${id}`, { method: 'DELETE' })
