import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
}

export interface CreateResearchGoalDTO {
  code: string
  name: string
  comment?: string | null
  lab_id?: UUID | null
}

export interface UpdateResearchGoalDTO {
  code?: string | null
  name?: string | null
  comment?: string | null
  lab_id?: UUID | null
}

export interface ReadResearchGoalDTO {
  id: UUID
  code: string
  name: string
  comment: string | null
  lab_id: UUID | null
  created_at: string
  updated_at: string
  lab?: EntityRefDTO | null
}

export interface ReadListResearchGoalDTO {
  id: UUID
  code: string
  name: string
  comment: string | null
  lab_id: UUID | null
  created_at: string
  updated_at: string
  lab?: EntityRefDTO | null
}

export interface ResearchGoalDeleteDTO {
  id: UUID
  reason?: string | null
}

export const listResearchGoals = (params: Record<string, any>) =>
  apiReadListRequest<ReadListResearchGoalDTO>('/research_goals', {
    method: 'GET',
    params: { ...params, include: params?.include || 'lab' }
  })

export const createResearchGoal = (payload: CreateResearchGoalDTO) =>
  apiCreateRequest<ReadResearchGoalDTO>('/research_goals', { method: 'POST', body: payload })

export const updateResearchGoal = (id: UUID, payload: UpdateResearchGoalDTO) =>
  apiUpdateRequest<ReadResearchGoalDTO>(`/research_goals/${id}`, { method: 'PATCH', body: payload })

export const deleteResearchGoal = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/research_goals/${id}`, { method: 'DELETE' })
