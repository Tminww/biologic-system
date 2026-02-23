import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
}

export interface CreateResultDTO {
  comment?: string | null
  recommendation?: string | null
  is_done: boolean
  lab_id?: UUID | null
  sample_id: UUID
  status_id?: UUID | null
  received_at?: string | null
  completed_at?: string | null
}

export interface UpdateResultDTO {
  comment?: string | null
  recommendation?: string | null
  is_done?: boolean | null
  lab_id?: UUID | null
  sample_id?: UUID | null
  status_id?: UUID | null
  received_at?: string | null
  completed_at?: string | null
}

export interface ReadResultDTO {
  id: UUID
  comment: string | null
  recommendation: string | null
  is_done: boolean
  lab_id: UUID | null
  sample_id: UUID
  status_id: UUID | null
  received_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  lab?: EntityRefDTO | null
  sample?: EntityRefDTO | null
  status?: EntityRefDTO | null
}

export interface ReadListResultDTO {
  id: UUID
  comment: string | null
  recommendation: string | null
  is_done: boolean
  lab_id: UUID | null
  sample_id: UUID
  status_id: UUID | null
  received_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  lab?: EntityRefDTO | null
  sample?: EntityRefDTO | null
  status?: EntityRefDTO | null
}

export interface ResultDeleteDTO {
  id: UUID
  reason?: string | null
}

export const listResults = (params: Record<string, any>) =>
  apiReadListRequest<ReadListResultDTO>('/results', {
    method: 'GET',
    params: { ...params, include: params?.include || 'lab,sample,status' }
  })

export const createResult = (payload: CreateResultDTO) =>
  apiCreateRequest<ReadResultDTO>('/results', { method: 'POST', body: payload })

export const updateResult = (id: UUID, payload: UpdateResultDTO) =>
  apiUpdateRequest<ReadResultDTO>(`/results/${id}`, { method: 'PATCH', body: payload })

export const deleteResult = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/results/${id}`, { method: 'DELETE' })
