import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'
import type { Action, Resource } from '@/shared/types/permissions'

export interface ReadQuickActionDTO {
  id: number
  label: string
  resource: Resource
  action: Action
  to: string
  icon: string
  createdAt: string
  updatedAt: string
}

export interface ReadListQuickActionDTO extends ReadQuickActionDTO {}

export interface CreateQuickActionDTO {
  label: string
  resource: Resource
  action: Action
  to: string
  icon: string
}

export interface UpdateQuickActionDTO extends Partial<CreateQuickActionDTO> {}

export const listQuickActions = () =>
  apiReadListRequest<ReadListQuickActionDTO>('/dashboard/quick-actions', { method: 'GET' })

export const createQuickAction = (payload: CreateQuickActionDTO) =>
  apiCreateRequest<ReadQuickActionDTO>('/dashboard/quick-actions', { method: 'POST', body: payload })

export const updateQuickAction = (id: number, payload: UpdateQuickActionDTO) =>
  apiUpdateRequest<ReadQuickActionDTO>(`/dashboard/quick-actions/${id}`, {
    method: 'PUT',
    body: payload
  })

export const deleteQuickAction = (id: number) =>
  apiRequest<{ ok: boolean }>(`/dashboard/quick-actions/${id}`, { method: 'DELETE' })
