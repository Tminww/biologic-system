import type {
  ApiError,
  CreateResponse,
  ListResponse,
  OperationMeta,
  ReadListResponse,
  ReadMeta,
  ReadResponse,
  UpdateResponse
} from '@/shared/types/api'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
const apiPrefixRaw = import.meta.env.VITE_API_PREFIX || '/api/v1'
const requestCaseMode = import.meta.env.VITE_API_REQUEST_CASE || 'snake'
const useSnakeCaseRequests = requestCaseMode === 'snake'

const normalizePrefix = (value: string) => {
  if (!value) {
    return ''
  }
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`
  return withLeadingSlash.replace(/\/+$/, '')
}

const apiPrefix = normalizePrefix(apiPrefixRaw)

const isPlainObject = (value: unknown): value is Record<string, any> =>
  Object.prototype.toString.call(value) === '[object Object]'

const toSnakeCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase()

const toSnakeFieldPath = (value: string) => value.split('.').map((segment) => toSnakeCase(segment)).join('.')

const convertKeysToSnakeCase = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map((item) => convertKeysToSnakeCase(item))
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [toSnakeCase(key), convertKeysToSnakeCase(nested)])
    )
  }
  return value
}

const normalizeParamValue = (key: string, value: unknown) => {
  if (!useSnakeCaseRequests) {
    return value
  }
  if (key === 'sort_by' && typeof value === 'string') {
    return toSnakeFieldPath(value)
  }
  if (key === 'sort_order') {
    if (typeof value === 'number') {
      return value === -1 ? 'desc' : 'asc'
    }
    if (typeof value === 'string') {
      const normalized = value.toLowerCase()
      if (normalized === '-1' || normalized === 'desc') {
        return 'desc'
      }
      if (normalized === '1' || normalized === 'asc') {
        return 'asc'
      }
    }
  }
  if (key === 'filters' && typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return JSON.stringify(convertKeysToSnakeCase(parsed))
    } catch {
      return value
    }
  }
  return value
}

let hooks = {
  onUnauthorized: () => {},
  onForbidden: () => {}
}

export const setApiHooks = (next: Partial<typeof hooks>) => {
  hooks = { ...hooks, ...next }
}

const buildUrl = (path: string, params?: Record<string, any>) => {
  const isAbsolute = /^https?:\/\//i.test(path)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const withPrefix =
    apiPrefix && !isAbsolute && !normalizedPath.startsWith(`${apiPrefix}/`)
      ? `${apiPrefix}${normalizedPath}`
      : path
  const url = new URL(withPrefix, apiBaseUrl || window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      const normalizedValue = normalizeParamValue(key, value)
      if (normalizedValue === undefined || normalizedValue === null || normalizedValue === '') {
        return
      }
      url.searchParams.set(key, String(normalizedValue))
    })
  }
  return apiBaseUrl ? url.toString() : `${url.pathname}${url.search}`
}

const parseResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }
  return response.text()
}

export const apiRequest = async <T>(
  path: string,
  options: RequestInit & { params?: Record<string, any>; body?: any } = {}
): Promise<T> => {
  const requestParams =
    useSnakeCaseRequests && options.params ? convertKeysToSnakeCase(options.params) : options.params
  const url = buildUrl(path, requestParams)
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  const requestBody =
    !isFormData && useSnakeCaseRequests && options.body !== undefined
      ? convertKeysToSnakeCase(options.body)
      : options.body
  const init: RequestInit = {
    method: options.method || 'GET',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {})
    },
    credentials: 'include'
  }
  if (requestBody !== undefined) {
    init.body = isFormData ? requestBody : JSON.stringify(requestBody)
  }

  const response = await fetch(url, init)

  if (!response.ok) {
    const payload = await parseResponse(response)
    const error: ApiError = {
      status: response.status,
      code: payload?.code || payload?.type,
      message: payload?.message || payload?.detail || payload?.title || response.statusText
    }
    if (response.status === 401) {
      hooks.onUnauthorized()
    }
    if (response.status === 403) {
      hooks.onForbidden()
    }
    throw error
  }

  return parseResponse(response) as Promise<T>
}

type CompatListResponse<T> = ListResponse<T> | ReadListResponse<T>
type CompatDataResponse<T> = { data: T } | CreateResponse<T> | UpdateResponse<T> | ReadResponse<T>
type CompatReadResponse<T> = { data: T } | ReadResponse<T>
type CompatCreateResponse<T> = { data: T } | CreateResponse<T>
type CompatUpdateResponse<T> = { data: T } | UpdateResponse<T>

const nowIso = () => new Date().toISOString()

const toStringArray = (value: unknown) =>
  Array.isArray(value) ? value.map((item) => String(item)) : []

const normalizeOperationMeta = (meta: any, fallbackOperation: string): OperationMeta => ({
  timestamp: String(meta?.timestamp ?? nowIso()),
  request_id: String(meta?.request_id ?? ''),
  version: String(meta?.version ?? ''),
  operation: String(meta?.operation ?? fallbackOperation)
})

const normalizeReadMeta = (meta: any): ReadMeta => ({
  timestamp: String(meta?.timestamp ?? nowIso()),
  request_id: String(meta?.request_id ?? ''),
  version: String(meta?.version ?? ''),
  includes: toStringArray(meta?.includes),
  includes_requested: toStringArray(meta?.includes_requested),
  includes_applied: toStringArray(meta?.includes_applied),
  includes_allowed: toStringArray(meta?.includes_allowed)
})

export const normalizeListResponse = <T>(response: CompatListResponse<T>): ListResponse<T> => {
  const payload = normalizeReadListResponse(response)
  return {
    data: payload.items,
    meta: {
      total: Number(payload.meta.total ?? payload.items.length)
    }
  }
}

export const normalizeDataResponse = <T>(response: CompatDataResponse<T>): { data: T } => {
  return { data: response.data }
}

export const normalizeReadListResponse = <T>(response: CompatListResponse<T>): ReadListResponse<T> => {
  if (Array.isArray((response as ReadListResponse<T>).items)) {
    const payload = response as ReadListResponse<T>
    return {
      items: payload.items,
      meta: {
        timestamp: String(payload.meta?.timestamp ?? nowIso()),
        request_id: String(payload.meta?.request_id ?? ''),
        version: String(payload.meta?.version ?? ''),
        total: Number(payload.meta?.total ?? payload.items.length),
        offset: Number(payload.meta?.offset ?? 0),
        limit: Number(payload.meta?.limit ?? payload.items.length),
        includes_request: toStringArray(payload.meta?.includes_request),
        includes_applied: toStringArray(payload.meta?.includes_applied),
        includes_allowed: toStringArray(payload.meta?.includes_allowed)
      }
    }
  }

  const payload = response as ListResponse<T>
  return {
    items: payload.data ?? [],
    meta: {
      timestamp: nowIso(),
      request_id: '',
      version: '',
      total: Number(payload.meta?.total ?? payload.data?.length ?? 0),
      offset: 0,
      limit: Number(payload.data?.length ?? 0),
      includes_request: [],
      includes_applied: [],
      includes_allowed: []
    }
  }
}

export const normalizeReadResponse = <T>(response: CompatReadResponse<T>): ReadResponse<T> => ({
  data: response.data,
  meta: normalizeReadMeta((response as ReadResponse<T>).meta)
})

export const normalizeCreateResponse = <T>(response: CompatCreateResponse<T>): CreateResponse<T> => ({
  data: response.data,
  meta: normalizeOperationMeta((response as CreateResponse<T>).meta, 'create')
})

export const normalizeUpdateResponse = <T>(response: CompatUpdateResponse<T>): UpdateResponse<T> => ({
  data: response.data,
  meta: normalizeOperationMeta((response as UpdateResponse<T>).meta, 'update')
})

export const apiListRequest = async <T>(
  path: string,
  options: RequestInit & { params?: Record<string, any>; body?: any } = {}
): Promise<ListResponse<T>> => {
  const response = await apiRequest<CompatListResponse<T>>(path, options)
  return normalizeListResponse(response)
}

export const apiDataRequest = async <T>(
  path: string,
  options: RequestInit & { params?: Record<string, any>; body?: any } = {}
): Promise<{ data: T }> => {
  const response = await apiRequest<CompatDataResponse<T>>(path, options)
  return normalizeDataResponse(response)
}

export const apiReadListRequest = async <T>(
  path: string,
  options: RequestInit & { params?: Record<string, any>; body?: any } = {}
): Promise<ReadListResponse<T>> => {
  const response = await apiRequest<CompatListResponse<T>>(path, options)
  return normalizeReadListResponse(response)
}

export const apiReadRequest = async <T>(
  path: string,
  options: RequestInit & { params?: Record<string, any>; body?: any } = {}
): Promise<ReadResponse<T>> => {
  const response = await apiRequest<CompatReadResponse<T>>(path, options)
  return normalizeReadResponse(response)
}

export const apiCreateRequest = async <T>(
  path: string,
  options: RequestInit & { params?: Record<string, any>; body?: any } = {}
): Promise<CreateResponse<T>> => {
  const response = await apiRequest<CompatCreateResponse<T>>(path, options)
  return normalizeCreateResponse(response)
}

export const apiUpdateRequest = async <T>(
  path: string,
  options: RequestInit & { params?: Record<string, any>; body?: any } = {}
): Promise<UpdateResponse<T>> => {
  const response = await apiRequest<CompatUpdateResponse<T>>(path, options)
  return normalizeUpdateResponse(response)
}
