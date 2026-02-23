import { apiCreateRequest, apiReadListRequest, apiRequest, apiUpdateRequest } from '@/shared/api/client'

export type UUID = string

export interface CreateDoctorDTO {
  first_name: string
  last_name?: string | null
  patronymic?: string | null
}

export interface UpdateDoctorDTO {
  first_name?: string | null
  last_name?: string | null
  patronymic?: string | null
}

export interface ReadDoctorDTO {
  id: UUID
  first_name: string
  last_name: string | null
  patronymic: string | null
  created_at: string
  updated_at: string
}

export interface ReadListDoctorDTO {
  id: UUID
  first_name: string
  last_name: string | null
  patronymic: string | null
  created_at: string
  updated_at: string
}

export interface DoctorDeleteDTO {
  id: UUID
  reason?: string | null
}

export const listDoctors = (params: Record<string, any>) =>
  apiReadListRequest<ReadListDoctorDTO>('/doctors', { method: 'GET', params })

export const createDoctor = (payload: CreateDoctorDTO) =>
  apiCreateRequest<ReadDoctorDTO>('/doctors', { method: 'POST', body: payload })

export const updateDoctor = (id: UUID, payload: UpdateDoctorDTO) =>
  apiUpdateRequest<ReadDoctorDTO>(`/doctors/${id}`, { method: 'PATCH', body: payload })

export const deleteDoctor = (id: UUID) =>
  apiRequest<{ ok: boolean }>(`/doctors/${id}`, { method: 'DELETE' })
