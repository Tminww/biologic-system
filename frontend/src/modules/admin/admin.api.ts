import { apiCreateRequest, apiReadListRequest, apiReadRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'
import type { Permission, PermissionOverride } from '@/shared/types/permissions'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
  code: string | null
}

export interface ReadUserDTO {
  id: UUID
  username: string
  code: string | null
  first_name: string | null
  last_name: string | null
  patronymic: string | null
  is_registrar: boolean | null
  is_lab_head: boolean | null
  is_branch_head: boolean | null
  role_id: UUID
  lab_id: UUID | null
  created_at: string
  updated_at: string
  role?: EntityRefDTO | null
  lab?: EntityRefDTO | null
  overridesCount?: number
}

export interface ReadListUserDTO extends ReadUserDTO {}

export interface CreateUserDTO {
  username: string
  password_hash: string
  code?: string | null
  first_name?: string | null
  last_name?: string | null
  patronymic?: string | null
  is_registrar?: boolean | null
  is_lab_head?: boolean | null
  is_branch_head?: boolean | null
  role_id: UUID
  lab_id?: UUID | null
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}

export interface ReadUserPermissionsDTO {
  rolePermissions: Permission[]
  overrides: PermissionOverride[]
}

export interface UpdateUserPermissionsDTO {
  overrides: PermissionOverride[]
}

export const listUsers = (params: Record<string, any>) =>
  apiReadListRequest<ReadListUserDTO>('/users', {
    method: 'GET',
    params: { ...params, include: params?.include || 'role,lab' }
  })

export const createUser = (payload: CreateUserDTO) =>
  apiCreateRequest<ReadUserDTO>('/users', { method: 'POST', body: payload })

export const updateUser = (id: UUID, payload: UpdateUserDTO) =>
  apiUpdateRequest<ReadUserDTO>(`/users/${id}`, { method: 'PATCH', body: payload })

export const deleteUser = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/users/${id}`, { method: 'DELETE' })

export const getUserPermissions = (id: UUID) =>
  apiReadRequest<ReadUserPermissionsDTO>(`/users/${id}/permissions`, { method: 'GET' })

export const updateUserPermissions = (id: UUID, overrides: PermissionOverride[]) =>
  apiRequest<{ ok: boolean }>(`/users/${id}/permissions`, {
    method: 'PUT',
    body: { overrides } satisfies UpdateUserPermissionsDTO
  })
