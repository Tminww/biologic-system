import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
  code: string | null
}

export interface ReadSampleDTO {
  id: UUID
  month_no: number | null
  name: string
  alternate_name: string | null
  mass: string | null
  target_description: string | null
  comment: string | null
  section: string | null
  delivery: string | null
  nomenclature_code: string | null
  batch_code: string | null
  supplier: string | null
  is_urgent: boolean
  is_done: boolean
  sample_type_id: UUID | null
  status_id: UUID | null
  direction_id: UUID | null
  protocol_id: UUID | null
  sampled_at: string | null
  received_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  sample_type?: EntityRefDTO | null
  status?: EntityRefDTO | null
  direction?: EntityRefDTO | null
  protocol?: EntityRefDTO | null
}

export interface ReadListSampleDTO extends ReadSampleDTO {}

export interface CreateSampleDTO {
  month_no?: number | null
  name: string
  alternate_name?: string | null
  mass?: string | null
  target_description?: string | null
  comment?: string | null
  section?: string | null
  delivery?: string | null
  nomenclature_code?: string | null
  batch_code?: string | null
  supplier?: string | null
  is_urgent: boolean
  is_done: boolean
  sample_type_id?: UUID | null
  status_id?: UUID | null
  direction_id?: UUID | null
  protocol_id?: UUID | null
  sampled_at?: string | null
  received_at?: string | null
  completed_at?: string | null
}

export interface UpdateSampleDTO extends Partial<CreateSampleDTO> {}

export const listSamples = (params: Record<string, any>) =>
  apiReadListRequest<ReadListSampleDTO>('/samples', {
    method: 'GET',
    params: { ...params, include: params?.include || 'sample_type,status,direction,protocol' }
  })

export const createSample = (payload: CreateSampleDTO) =>
  apiCreateRequest<ReadSampleDTO>('/samples', { method: 'POST', body: payload })

export const updateSample = (id: UUID, payload: UpdateSampleDTO) =>
  apiUpdateRequest<ReadSampleDTO>(`/samples/${id}`, { method: 'PATCH', body: payload })

export const deleteSample = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/samples/${id}`, { method: 'DELETE' })

export const generateSamplesProtocol = (payload: { ids: UUID[] }) =>
  apiRequest<{ ok: boolean }>('/samples/protocol', { method: 'POST', body: payload })
