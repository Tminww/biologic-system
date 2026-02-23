import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface EntityRefDTO {
  id: UUID
  name: string | null
  code: string | null
}

export interface ReadProtocolDTO {
  id: UUID
  year_no: number
  copies: number | null
  is_signed: boolean
  protocol_copy_name: string | null
  excerpt_copy_name: string | null
  conclusion_id: UUID | null
  protocol_type_id: UUID | null
  issued_at: string | null
  created_at: string
  updated_at: string
  conclusion?: EntityRefDTO | null
  protocol_type?: EntityRefDTO | null
}

export interface ReadListProtocolDTO extends ReadProtocolDTO {}

export interface CreateProtocolDTO {
  year_no: number
  copies?: number | null
  is_signed: boolean
  protocol_copy_name?: string | null
  excerpt_copy_name?: string | null
  conclusion_id?: UUID | null
  protocol_type_id?: UUID | null
  issued_at?: string | null
}

export interface UpdateProtocolDTO extends Partial<CreateProtocolDTO> {}

export const listProtocols = (params: Record<string, any>) =>
  apiReadListRequest<ReadListProtocolDTO>('/protocols', {
    method: 'GET',
    params: { ...params, include: params?.include || 'conclusion,protocol_type' }
  })

export const createProtocol = (payload: CreateProtocolDTO) =>
  apiCreateRequest<ReadProtocolDTO>('/protocols', { method: 'POST', body: payload })

export const updateProtocol = (id: UUID, payload: UpdateProtocolDTO) =>
  apiUpdateRequest<ReadProtocolDTO>(`/protocols/${id}`, { method: 'PATCH', body: payload })

export const deleteProtocol = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/protocols/${id}`, { method: 'DELETE' })
