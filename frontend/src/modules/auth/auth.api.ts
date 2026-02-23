import { apiRequest } from '@/shared/api/client'
import type { Action, Permission, Resource } from '@/shared/types/permissions'
import type { NamedRef } from '@/shared/types/api'

export interface AuthUser {
  id: number
  login: string
  email: string
  fullName: string
  role: string
  status: string
  department: NamedRef
  deletedAt: string | null
}

export interface AuthResponse {
  user: AuthUser
  permissions: Permission[]
}

const apiMode = import.meta.env.VITE_API_MODE || 'mock'
const authMode = import.meta.env.VITE_AUTH_MODE || (apiMode === 'mock' ? 'mock' : 'live')
const useMockAuth = authMode === 'mock'
const mockAuthEnabledKey = 'mock_auth_admin_enabled_v1'

const allResources: Resource[] = [
  'dashboard',
  'directions',
  'samples',
  'sample-targets',
  'protocols',
  'results',
  'conclusions',
  'tests',
  'doctors',
  'branches',
  'labs',
  'users',
  'research-goals',
  'sample-types',
  'indicators',
  'protocol-types',
  'statuses',
  'user-types',
  'objects'
]

const crudActions: Action[] = ['create', 'edit', 'delete']
const adminCrudResources: Resource[] = allResources.filter((resource) => resource !== 'dashboard')

const mockAdminPermissions: Permission[] = [
  ...allResources.map((resource) => ({ resource, action: 'view' as Action })),
  ...adminCrudResources.flatMap((resource) =>
    crudActions.map((action) => ({ resource, action }))
  )
]

const mockAdminUser: AuthUser = {
  id: 1,
  login: 'admin',
  email: 'admin@example.com',
  fullName: 'Admin User',
  role: 'admin',
  status: 'active',
  department: { id: 3, name: 'Хим.' } satisfies NamedRef,
  deletedAt: null
}

const readMockAuthEnabled = () => {
  if (typeof window === 'undefined') {
    return true
  }
  const raw = window.localStorage.getItem(mockAuthEnabledKey)
  if (raw === null) {
    return true
  }
  return raw === '1'
}

const writeMockAuthEnabled = (enabled: boolean) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(mockAuthEnabledKey, enabled ? '1' : '0')
}

const buildError = (status: number, code: string, message: string) => ({
  status,
  code,
  message
})

export const login = async (login: string, password: string) => {
  if (!useMockAuth) {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: { username: login, password }
    })
  }
  if (login !== 'admin' || password !== 'admin123') {
    throw buildError(422, 'INVALID_CREDENTIALS', 'Invalid credentials')
  }
  writeMockAuthEnabled(true)
  return {
    user: mockAdminUser,
    permissions: mockAdminPermissions
  } satisfies AuthResponse
}

export const logout = async () => {
  if (!useMockAuth) {
    return apiRequest<void>('/auth/logout', { method: 'POST' })
  }
  writeMockAuthEnabled(false)
}

export const me = async () => {
  if (!useMockAuth) {
    return apiRequest<AuthResponse>('/auth/me', { method: 'GET' })
  }
  if (!readMockAuthEnabled()) {
    throw buildError(401, 'UNAUTHORIZED', 'Unauthorized')
  }
  return {
    user: mockAdminUser,
    permissions: mockAdminPermissions
  } satisfies AuthResponse
}
