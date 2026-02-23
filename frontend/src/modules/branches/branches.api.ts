import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface ReadBranchDTO {
  id: UUID
  code: string | null
  name: string | null
  created_at: string
  updated_at: string
}

export interface ReadListBranchDTO extends ReadBranchDTO {}

export interface CreateBranchDTO {
  code?: string | null
  name?: string | null
}

export interface UpdateBranchDTO extends Partial<CreateBranchDTO> {}

export const listBranches = (params: Record<string, any>) =>
  apiReadListRequest<ReadListBranchDTO>('/branches', { method: 'GET', params })

export const createBranch = (payload: CreateBranchDTO) =>
  apiCreateRequest<ReadBranchDTO>('/branches', { method: 'POST', body: payload })

export const updateBranch = (id: UUID, payload: UpdateBranchDTO) =>
  apiUpdateRequest<ReadBranchDTO>(`/branches/${id}`, { method: 'PATCH', body: payload })

export const deleteBranch = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/branches/${id}`, { method: 'DELETE' })
