import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
}

export interface CreateIndicatorDTO {
  name: string
  unit?: string | null
  norm_text?: string | null
  norm_value?: string | null
  default_text?: string | null
  comment?: string | null
  lab_id?: UUID | null
  sample_type_id?: UUID | null
}

export interface UpdateIndicatorDTO {
  name?: string | null
  unit?: string | null
  norm_text?: string | null
  norm_value?: string | null
  default_text?: string | null
  comment?: string | null
  lab_id?: UUID | null
  sample_type_id?: UUID | null
}

export interface ReadIndicatorDTO {
  id: UUID
  name: string
  unit: string | null
  norm_text: string | null
  norm_value: string | null
  default_text: string | null
  comment: string | null
  lab_id: UUID | null
  sample_type_id: UUID | null
  created_at: string
  updated_at: string
  lab?: EntityRefDTO | null
  sample_type?: EntityRefDTO | null
}

export interface ReadListIndicatorDTO {
  id: UUID
  name: string
  unit: string | null
  norm_text: string | null
  norm_value: string | null
  default_text: string | null
  comment: string | null
  lab_id: UUID | null
  sample_type_id: UUID | null
  created_at: string
  updated_at: string
  lab?: EntityRefDTO | null
  sample_type?: EntityRefDTO | null
}

export interface IndicatorDeleteDTO {
  id: UUID
  reason?: string | null
}

export const listIndicators = (params: Record<string, any>) =>
  apiReadListRequest<ReadListIndicatorDTO>('/indicators', {
    method: 'GET',
    params: { ...params, include: params?.include || 'lab,sample_type' }
  })

export const createIndicator = (payload: CreateIndicatorDTO) =>
  apiCreateRequest<ReadIndicatorDTO>('/indicators', { method: 'POST', body: payload })

export const updateIndicator = (id: UUID, payload: UpdateIndicatorDTO) =>
  apiUpdateRequest<ReadIndicatorDTO>(`/indicators/${id}`, { method: 'PATCH', body: payload })

export const deleteIndicator = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/indicators/${id}`, { method: 'DELETE' })
