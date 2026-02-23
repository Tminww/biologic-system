export interface ApiError {
  status: number
  code?: string
  message: string
}

export interface OperationMeta {
  timestamp: string
  request_id: string
  version: string
  operation: string
}

export interface ReadMeta {
  timestamp: string
  request_id: string
  version: string
  includes: string[]
  includes_requested: string[]
  includes_applied: string[]
  includes_allowed: string[]
}

export interface ReadListMeta {
  timestamp: string
  request_id: string
  version: string
  total: number
  offset: number
  limit: number
  includes_request: string[]
  includes_applied: string[]
  includes_allowed: string[]
}

export interface CreateResponse<T> {
  data: T
  meta: OperationMeta
}

export interface UpdateResponse<T> {
  data: T
  meta: OperationMeta
}

export interface ReadResponse<T> {
  data: T
  meta: ReadMeta
}

export interface ReadListResponse<T> {
  items: T[]
  meta: ReadListMeta
}

export interface ListResponse<T> {
  data: T[]
  meta: {
    total: number
  }
}

export interface NamedRef {
  id: number | null
  name: string | null
}
