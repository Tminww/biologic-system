import { apiCreateRequest, apiReadListRequest, apiReadRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'
import type { Permission, PermissionSummary } from '@/shared/types/permissions'

export type UUID = string

export interface ReadUserTypeDTO {
  id: UUID
  key: string
  name: string
  created_at: string
  updated_at: string
  permissionsSummary?: PermissionSummary
}

export interface ReadListUserTypeDTO extends ReadUserTypeDTO {}

export interface CreateUserTypeDTO {
  key: string
  name: string
}

export interface UpdateUserTypeDTO extends Partial<CreateUserTypeDTO> {}

export interface ReadUserTypePermissionsDTO {
  permissions: Permission[]
}

export interface UpdateUserTypePermissionsDTO {
  permissions: Permission[]
}

export const listUserTypes = (params: Record<string, any>) =>
  apiReadListRequest<ReadListUserTypeDTO>('/roles', { method: 'GET', params })

export const createUserType = (payload: CreateUserTypeDTO) =>
  apiCreateRequest<ReadUserTypeDTO>('/roles', { method: 'POST', body: payload })

export const updateUserType = (id: UUID, payload: UpdateUserTypeDTO) =>
  apiUpdateRequest<ReadUserTypeDTO>(`/roles/${id}`, { method: 'PATCH', body: payload })

export const deleteUserType = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/roles/${id}`, { method: 'DELETE' })

export const getUserTypePermissions = (id: UUID) =>
  apiReadRequest<ReadUserTypePermissionsDTO>(`/roles/${id}/permissions`, {
    method: 'GET'
  }).catch(() =>
    apiReadRequest<ReadUserTypePermissionsDTO>(`/user-types/${id}/permissions`, {
      method: 'GET'
    })
  )

export const updateUserTypePermissions = (id: UUID, permissions: Permission[]) =>
  apiRequest<{ ok: boolean }>(`/roles/${id}/permissions`, {
    method: 'PUT',
    body: { permissions } satisfies UpdateUserTypePermissionsDTO
  }).catch(() =>
    apiRequest<{ ok: boolean }>(`/user-types/${id}/permissions`, {
      method: 'PUT',
      body: { permissions } satisfies UpdateUserTypePermissionsDTO
    })
  )
