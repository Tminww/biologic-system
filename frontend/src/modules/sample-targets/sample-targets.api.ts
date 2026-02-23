import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
}

export interface CreateSampleTargetDTO {
  sample_id: UUID
  research_goal_id: UUID
  status_id?: UUID | null
}

export interface UpdateSampleTargetDTO {
  sample_id?: UUID | null
  research_goal_id?: UUID | null
  status_id?: UUID | null
}

export interface ReadSampleTargetDTO {
  id: UUID
  sample_id: UUID
  research_goal_id: UUID
  status_id: UUID | null
  created_at: string
  updated_at: string
  sample?: EntityRefDTO | null
  research_goal?: EntityRefDTO | null
  status?: EntityRefDTO | null
}

export interface ReadListSampleTargetDTO {
  id: UUID
  sample_id: UUID
  research_goal_id: UUID
  status_id: UUID | null
  created_at: string
  updated_at: string
  sample?: EntityRefDTO | null
  research_goal?: EntityRefDTO | null
  status?: EntityRefDTO | null
}

export interface SampleTargetDeleteDTO {
  id: UUID
  reason?: string | null
}

export const listSampleTargets = (params: Record<string, any>) =>
  apiReadListRequest<ReadListSampleTargetDTO>('/sample_targets', {
    method: 'GET',
    params: { ...params, include: params?.include || 'sample,research_goal,status' }
  })

export const createSampleTarget = (payload: CreateSampleTargetDTO) =>
  apiCreateRequest<ReadSampleTargetDTO>('/sample_targets', { method: 'POST', body: payload })

export const updateSampleTarget = (id: UUID, payload: UpdateSampleTargetDTO) =>
  apiUpdateRequest<ReadSampleTargetDTO>(`/sample_targets/${id}`, { method: 'PATCH', body: payload })

export const deleteSampleTarget = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/sample_targets/${id}`, { method: 'DELETE' })
