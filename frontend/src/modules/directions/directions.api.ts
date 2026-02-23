import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
}

export interface CreateDirectionDTO {
  year_no: number
  base_no?: number | null
  is_done: boolean
  is_urgent: boolean
  doctor_id?: UUID | null
  object_id?: UUID | null
  status_id?: UUID | null
  sampled_at?: string | null
  received_at?: string | null
  completed_at?: string | null
}

export interface UpdateDirectionDTO {
  year_no?: number | null
  base_no?: number | null
  is_done?: boolean | null
  is_urgent?: boolean | null
  doctor_id?: UUID | null
  object_id?: UUID | null
  status_id?: UUID | null
  sampled_at?: string | null
  received_at?: string | null
  completed_at?: string | null
}

export interface ReadDirectionDTO {
  id: UUID
  year_no: number
  base_no: number | null
  is_done: boolean
  is_urgent: boolean
  doctor_id: UUID | null
  object_id: UUID | null
  status_id: UUID | null
  sampled_at: string | null
  received_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  doctor?: EntityRefDTO | null
  object?: EntityRefDTO | null
  status?: EntityRefDTO | null
}

export interface ReadListDirectionDTO {
  id: UUID
  year_no: number
  base_no: number | null
  is_done: boolean
  is_urgent: boolean
  doctor_id: UUID | null
  object_id: UUID | null
  status_id: UUID | null
  sampled_at: string | null
  received_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  doctor?: EntityRefDTO | null
  object?: EntityRefDTO | null
  status?: EntityRefDTO | null
}

export interface DirectionDeleteDTO {
  id: UUID
  reason?: string | null
}

export const listDirections = (params: Record<string, any>) =>
  apiReadListRequest<ReadListDirectionDTO>('/directions', {
    method: 'GET',
    params: { ...params, include: params?.include || 'doctor,object,status' }
  })

export const createDirection = (payload: CreateDirectionDTO) =>
  apiCreateRequest<ReadDirectionDTO>('/directions', { method: 'POST', body: payload })

export const updateDirection = (id: UUID, payload: UpdateDirectionDTO) =>
  apiUpdateRequest<ReadDirectionDTO>(`/directions/${id}`, { method: 'PATCH', body: payload })

export const deleteDirection = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/directions/${id}`, { method: 'DELETE' })

export const importDirections = (file: File) => {
  const form = new FormData()
  form.append('file', file)
  return apiRequest<{ ok: boolean }>('/directions/import', { method: 'POST', body: form })
}

export const generateDirectionsProtocol = (payload: { ids: UUID[] }) =>
  apiRequest<{ ok: boolean }>('/directions/protocol', { method: 'POST', body: payload })
