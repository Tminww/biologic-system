import type { Permission, PermissionOverride, Resource, Action } from '@/shared/types/permissions'
import { summarizePermissions } from '@/shared/utils/permissions'
import naprsData from './mock-data/naprs.json'
import obrsData from './mock-data/obrs.json'
import obrTargetsData from './mock-data/obr-targets.json'
import obrTypesData from './mock-data/obr-types.json'
import podrsData from './mock-data/podrs.json'
import poksData from './mock-data/poks.json'
import protocolsData from './mock-data/protocols.json'
import protocolTypesData from './mock-data/protocol-types.json'
import resultsData from './mock-data/results.json'
import sandoctorsData from './mock-data/sandoctors.json'
import statusesData from './mock-data/statuses.json'
import targetsData from './mock-data/targets.json'
import testsData from './mock-data/tests.json'
import userTypesData from './mock-data/user-types.json'
import zaklsData from './mock-data/zakls.json'

interface UserRecord {
  id: number
  login: string
  email: string
  fullName: string
  role: string
  status: string
  department: { id: number | null; name: string | null }
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

interface ObjectRecord {
  id: number
  branch_id: number | string | null
  code: string
  name: string
  full_name: string | null
  address: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

const storageAvailable = typeof window !== 'undefined' && !!window.localStorage
const storageGet = <T>(key: string, fallback: T): T => {
  if (!storageAvailable) {
    return fallback
  }
  const raw = window.localStorage.getItem(key)
  if (!raw) {
    return fallback
  }
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

const storageSet = (key: string, value: any) => {
  if (!storageAvailable) {
    return
  }
  window.localStorage.setItem(key, JSON.stringify(value))
}

const nowIso = () => new Date().toISOString()
const toIso = (value: string | null | undefined) => (value ? new Date(value).toISOString() : null)
const deletedAtFromFlag = (flag: boolean | null | undefined, fallback?: string | null) =>
  flag ? (fallback ? toIso(fallback) : nowIso()) : null

const cloneRecord = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T
const dateFields = [
  'createdAt',
  'updatedAt',
  'receivedAt',
  'completedAt',
  'sampledAt',
  'created_at',
  'updated_at',
  'received_at',
  'completed_at',
  'sampled_at'
]
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const applyDateFields = (record: Record<string, any>, offset: number) => {
  const dateValue = new Date(Date.now() - offset * 86400000).toISOString()
  dateFields.forEach((field) => {
    if (record[field] !== undefined && record[field] !== null) {
      record[field] = dateValue
    }
  })
}

const ensureMinRecords = <T extends { id: number }>(items: T[], min: number) => {
  if (items.length >= min) {
    return items
  }
  const result = [...items]
  const maxId = result.reduce((max, item) => Math.max(max, item.id || 0), 0)
  let index = 0
  while (result.length < min) {
    const seed = items.length ? items[index % items.length] : ({} as T)
    const record = cloneRecord(seed) as T & Record<string, any>
    record.id = maxId + index + 1
    const suffix = String(record.id)
    if (typeof record.name === 'string' && record.name.trim()) {
      record.name = `${record.name} ${suffix}`
    }
    if (typeof record.fullName === 'string' && record.fullName.trim()) {
      record.fullName = `${record.fullName} ${suffix}`
    }
    if (typeof record.text === 'string' && record.text.trim()) {
      record.text = `${record.text} ${suffix}`
    }
    if (typeof record.comment === 'string' && record.comment.trim()) {
      record.comment = `${record.comment} ${suffix}`
    }
    if (typeof record.description === 'string' && record.description.trim()) {
      record.description = `${record.description} ${suffix}`
    }
    if (record.name !== undefined && !record.name) {
      record.name = `Запись ${suffix}`
    }
    if (record.code !== undefined && record.code !== null) {
      record.code = `${record.code}-${suffix}`
    }
    applyDateFields(record, index + 1)
    if (record.deletedAt !== undefined) {
      record.deletedAt = null
    }
    result.push(record as T)
    index += 1
  }
  return result
}

const viewPermissions = (resources: Resource[]) =>
  resources.map((resource) => ({ resource, action: 'view' as Action }))

const crudPermissions = (resource: Resource) =>
  (['view', 'create', 'edit', 'delete'] as Action[]).map((action) => ({ resource, action }))

const adminCrudResources: Resource[] = [
  'directions',
  'samples',
  'sample-targets',
  'protocols',
  'results',
  'conclusions',
  'tests',
  'doctors',
  'branches',
  'labs',
  'users',
  'research-goals',
  'sample-types',
  'indicators',
  'protocol-types',
  'objects',
  'statuses',
  'user-types'
]

const rolePermissions: Record<string, Permission[]> = {
  admin: [
    ...viewPermissions([
      'dashboard',
      'directions',
      'samples',
      'sample-targets',
      'protocols',
      'results',
      'conclusions',
      'tests',
      'doctors',
      'branches',
      'labs',
      'users',
      'research-goals',
      'sample-types',
      'indicators',
      'protocol-types',
      'objects',
      'statuses',
      'user-types'
    ]),
    ...adminCrudResources.flatMap(crudPermissions)
  ],
  doctor: viewPermissions([
    'dashboard',
    'directions',
    'protocols',
    'results',
    'conclusions',
    'research-goals'
  ]),
  technician: viewPermissions(['dashboard', 'directions', 'samples', 'results', 'sample-types', 'indicators'])
}

const mapBranch = (item: any) => ({
  id: item.id,
  name: item.name,
  code: item.podr_cod ?? null,
  fullName: item.name_full ?? null,
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const branches = podrsData.map(mapBranch)
const branchMap = new Map(branches.map((item) => [item.id, item]))
const labs = branches.map((item) => ({
  id: item.id,
  branch_id: null,
  code: item.code,
  name: item.name,
  full_name: item.fullName,
  branch: null,
  created_at: item.createdAt,
  updated_at: item.updatedAt,
  deletedAt: item.deletedAt
}))

const resolveNamedRef = (id: number | null | undefined, name?: string | null) => ({
  id: id ?? null,
  name: id === null || id === undefined ? null : name ?? null
})

const resolveDepartmentRef = (departmentId: number | null | undefined) =>
  resolveNamedRef(
    departmentId,
    departmentId === null || departmentId === undefined ? null : branchMap.get(departmentId)?.name ?? null
  )

const initialUsers: UserRecord[] = [
  {
    id: 1,
    login: 'admin',
    email: 'admin@example.com',
    fullName: 'Администратор',
    role: 'admin',
    status: 'active',
    department: resolveDepartmentRef(3),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    deletedAt: null
  },
  {
    id: 2,
    login: 'doctor',
    email: 'doctor@example.com',
    fullName: 'Врач',
    role: 'doctor',
    status: 'active',
    department: resolveDepartmentRef(3),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    deletedAt: null
  },
  {
    id: 3,
    login: 'tech',
    email: 'tech@example.com',
    fullName: 'Лаборант',
    role: 'technician',
    status: 'active',
    department: resolveDepartmentRef(3),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    deletedAt: null
  }
]

const defaultObjects = () => {
  return Array.from({ length: 60 }).map((_, index) => {
    const offset = index * 86400000
    const createdAt = new Date(Date.now() - offset * 2).toISOString()
    const updatedAt = new Date(Date.now() - offset).toISOString()
    return {
      id: index + 1,
      branch_id: branches[index % branches.length]?.id ?? null,
      code: `OBJ-${index + 1}`,
      name: `Объект ${index + 1}`,
      full_name: `Объект ${index + 1} (полное)`,
      address: `ул. Ленина, ${index + 1}`,
      created_at: createdAt,
      updated_at: updatedAt,
      deleted_at: null
    }
  })
}

const db = {
  users: storageGet<UserRecord[]>('mock_users_v3', initialUsers),
  objects: storageGet<ObjectRecord[]>('mock_objects_v4', defaultObjects()),
  overrides: storageGet<Record<number, PermissionOverride[]>>('mock_overrides_v3', {}),
  sessionUserId: storageGet<number | null>('mock_session_user_v3', null),
  catalogs: {} as Record<string, any[]>,
  rolePermissions: storageGet<Record<number, Permission[]>>('mock_role_permissions_v3', {}),
  quickActions: storageGet<Record<number, any[]>>('mock_quick_actions_v1', {})
}

const ensureMinObjects = (min: number) => {
  const expanded = ensureMinRecords(db.objects, min)
  if (expanded.length !== db.objects.length) {
    db.objects = expanded
    persistDb()
  }
}

const resolveUserRef = (userId: number | null | undefined) => {
  const resolvedId = userId ?? null
  if (resolvedId === null) {
    return { id: null, name: null }
  }
  const user = db.users.find((item) => item.id === resolvedId)
  return {
    id: resolvedId,
    name: user?.fullName || user?.login || `User ${resolvedId}`
  }
}

const resolveObjectBranch = (branchId: number | string | null | undefined) => {
  if (branchId === null || branchId === undefined) {
    return null
  }
  const numericBranchId = typeof branchId === 'number' ? branchId : Number(branchId)
  const branch = Number.isFinite(numericBranchId) ? branchMap.get(numericBranchId) : null
  return {
    id: String(branch?.id ?? branchId),
    name: branch?.name ?? null,
    code: branch?.code ?? null
  }
}

const mapObjectRead = (item: ObjectRecord) => ({
  ...item,
  id: String(item.id),
  branch_id: item.branch_id === null || item.branch_id === undefined ? null : String(item.branch_id),
  full_name: item.full_name ?? null,
  address: item.address ?? null,
  created_at: item.created_at,
  updated_at: item.updated_at,
  branch: resolveObjectBranch(item.branch_id)
})

const objectMap = new Map(db.objects.map((item) => [item.id, item]))
const statusMap = new Map(statusesData.map((item) => [item.id, item.name]))
const doctorMap = new Map(
  sandoctorsData.map((item) => [item.id, item.name_full || item.name || `Специалист ${item.id}`])
)
const sampleTypeMap = new Map(obrTypesData.map((item) => [item.id, item.name]))
const protocolTypeMap = new Map(protocolTypesData.map((item) => [item.id, item.name]))
const conclusionMap = new Map(zaklsData.map((item) => [item.id, item.name]))
const indicatorMap = new Map(poksData.map((item) => [item.id, item.name]))
const targetMap = new Map(targetsData.map((item) => [item.id, item.name]))
const sampleMap = new Map(obrsData.map((item) => [item.id, item.name || `Образец ${item.id}`]))
const protocolMap = new Map(
  protocolsData.map((item) => [item.id, item.file_name || `Протокол ${item.id}`])
)
const directionMap = new Map(naprsData.map((item) => [item.id, `Направление ${item.id}`]))
const resultMap = new Map(resultsData.map((item) => [item.id, `Результат ${item.id}`]))

const defaultOverrides: PermissionOverride[] = [
  { resource: 'protocols', action: 'create', allowed: false },
  { resource: 'conclusions', action: 'edit', allowed: false }
]

const ensureSeedUsers = () => {
  let nextId = db.users.reduce((max, user) => Math.max(max, user.id), 0)
  const existing = new Set(db.users.map((user) => user.login))
  let changed = false
  initialUsers.forEach((seed) => {
    if (existing.has(seed.login)) {
      return
    }
    nextId += 1
    db.users.push({ ...seed, id: nextId })
    changed = true
  })
  if (changed) {
    persistDb()
  }
}

const ensureMinUsers = (min: number) => {
  let nextId = db.users.reduce((max, user) => Math.max(max, user.id), 0)
  const roles = ['admin', 'doctor', 'technician']
  let index = 0
  let changed = false
  while (db.users.filter((user) => !user.deletedAt).length < min) {
    nextId += 1
    const role = roles[index % roles.length]
    const login = `user${nextId}`
    db.users.push({
      id: nextId,
      login,
      email: `${login}@example.com`,
      fullName: `Пользователь ${nextId}`,
      role,
      status: 'active',
      department: resolveDepartmentRef(branches[nextId % branches.length]?.id ?? null),
      createdAt: nowIso(),
      updatedAt: nowIso(),
      deletedAt: null
    })
    index += 1
    changed = true
  }
  if (changed) {
    persistDb()
  }
}

const persistDb = () => {
  storageSet('mock_users_v3', db.users)
  storageSet('mock_objects_v4', db.objects)
  storageSet('mock_overrides_v3', db.overrides)
  storageSet('mock_session_user_v3', db.sessionUserId)
  storageSet('mock_catalogs_v3', db.catalogs)
  storageSet('mock_role_permissions_v3', db.rolePermissions)
  storageSet('mock_quick_actions_v1', db.quickActions)
}

const ensureSeedOverrides = () => {
  const doctor = db.users.find((user) => user.login === 'doctor')
  if (!doctor) {
    return
  }
  if (!db.overrides || Object.keys(db.overrides).length === 0) {
    db.overrides = { [doctor.id]: [...defaultOverrides] }
    persistDb()
    return
  }
  if (!db.overrides[doctor.id] || db.overrides[doctor.id].length === 0) {
    db.overrides[doctor.id] = [...defaultOverrides]
    persistDb()
  }
}

const credentials: Record<string, string> = {
  admin: 'admin123',
  doctor: 'doctor123',
  tech: 'tech123'
}

const defaultQuickActionsForRole = (role: string) => {
  if (role === 'admin') {
    return [
      {
        label: 'Создать объект',
        resource: 'objects',
        action: 'create',
        to: '/objects#create',
        icon: 'pi pi-cog'
      },
      {
        label: 'Создать пользователя',
        resource: 'users',
        action: 'create',
        to: '/admin/users#create',
        icon: 'pi pi-users'
      },
      {
        label: 'Филиалы',
        resource: 'branches',
        action: 'view',
        to: '/branches',
        icon: 'pi pi-building'
      },
      {
        label: 'Лаборатории',
        resource: 'labs',
        action: 'view',
        to: '/labs',
        icon: 'pi pi-building-columns'
      }
    ]
  }
  if (role === 'doctor') {
    return [
      {
        label: 'Направления',
        resource: 'directions',
        action: 'view',
        to: '/directions',
        icon: 'pi pi-file'
      },
      {
        label: 'Протоколы',
        resource: 'protocols',
        action: 'view',
        to: '/protocols',
        icon: 'pi pi-file-edit'
      },
      {
        label: 'Заключения',
        resource: 'conclusions',
        action: 'view',
        to: '/conclusions',
        icon: 'pi pi-file-check'
      }
    ]
  }
  return [
    {
      label: 'Образцы',
      resource: 'samples',
      action: 'view',
      to: '/samples',
      icon: 'pi pi-box'
    },
    {
      label: 'Результаты',
      resource: 'results',
      action: 'view',
      to: '/results',
      icon: 'pi pi-chart-bar'
    },
    {
      label: 'Показатели',
      resource: 'indicators',
      action: 'view',
      to: '/indicators',
      icon: 'pi pi-chart-line'
    }
  ]
}

const ensureQuickActions = () => {
  let changed = false
  db.users.forEach((user) => {
    if (!db.quickActions[user.id]) {
      const defaults = defaultQuickActionsForRole(user.role)
      db.quickActions[user.id] = defaults.map((item, index) => ({
        id: index + 1,
        ...item,
        createdAt: nowIso(),
        updatedAt: nowIso()
      }))
      changed = true
    }
  })
  if (changed) {
    persistDb()
  }
}

ensureSeedUsers()
ensureMinUsers(50)
ensureMinObjects(50)
ensureSeedOverrides()
ensureQuickActions()

const withOverridesCount = (user: UserRecord) => ({
  ...user,
  overridesCount: (db.overrides[user.id] || []).length
})

const jsonResponse = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })

const errorResponse = (status: number, message: string, code?: string) =>
  jsonResponse({ message, code }, status)

const permissionKey = (resource: Resource, action: Action) => `${resource}:${action}`

const computeEffectivePermissions = (user: UserRecord) => {
  const base = rolePermissions[user.role] || []
  const overrides = db.overrides[user.id] || []
  const map = new Map<string, boolean>()
  base.forEach((perm) => map.set(permissionKey(perm.resource, perm.action), true))
  overrides.forEach((override) =>
    map.set(permissionKey(override.resource, override.action), override.allowed)
  )
  const result: Permission[] = []
  map.forEach((allowed, key) => {
    if (!allowed) {
      return
    }
    const [resource, action] = key.split(':') as [Resource, Action]
    result.push({ resource, action })
  })
  return result
}

const getSessionUser = () => db.users.find((user) => user.id === db.sessionUserId) || null

const requireAuth = () => {
  const user = getSessionUser()
  if (!user) {
    return { ok: false as const, response: errorResponse(401, 'Unauthorized', 'UNAUTHORIZED') }
  }
  return { ok: true as const, user }
}

const requirePermission = (user: UserRecord, resource: Resource, action: Action) => {
  const effective = computeEffectivePermissions(user)
  const allowed = effective.some((perm) => perm.resource === resource && perm.action === action)
  if (!allowed) {
    return { ok: false as const, response: errorResponse(403, 'Forbidden', 'FORBIDDEN') }
  }
  return { ok: true as const }
}

const parseFilters = (filters: string | null) => {
  if (!filters) {
    return {}
  }
  try {
    return JSON.parse(filters) as Record<string, any>
  } catch {
    return {}
  }
}

const toCamelCase = (value: string) =>
  value.replace(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase())

const toCamelPath = (value: string) =>
  value
    .split('.')
    .map((segment) => toCamelCase(segment))
    .join('.')

const getValueByPath = (item: Record<string, any>, path: string) =>
  path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, any>)[key]
    }
    return undefined
  }, item as any)

const getValue = (item: Record<string, any>, path: string) => {
  const direct = getValueByPath(item, path)
  if (direct !== undefined || !path.includes('_')) {
    return direct
  }
  return getValueByPath(item, toCamelPath(path))
}

const collectSearchable = (value: any): string[] => {
  if (value === null || value === undefined) {
    return []
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return [String(value)]
  }
  if (Array.isArray(value)) {
    return value.flatMap(collectSearchable)
  }
  if (typeof value === 'object') {
    if ('name' in value && (value as any).name) {
      return [String((value as any).name)]
    }
    return Object.values(value).flatMap(collectSearchable)
  }
  return []
}

const applyFilters = <T extends Record<string, any>>(
  data: T[],
  global: string,
  filters: Record<string, any>
) => {
  let result = [...data]
  if (global) {
    const lower = global.toLowerCase()
    result = result.filter((item) =>
      collectSearchable(item).some((value) => value.toLowerCase().includes(lower))
    )
  }
  Object.entries(filters).forEach(([field, value]) => {
    if (value === null || value === undefined || value === '') {
      return
    }
    if (Array.isArray(value) && (field.endsWith('At') || field.endsWith('_at'))) {
      const [start, end] = value
      result = result.filter((item) => {
        const dateValue = new Date(getValue(item, field)).getTime()
        const startDate = start ? new Date(start).getTime() : null
        const endDate = end ? new Date(end).getTime() : null
        if (startDate && dateValue < startDate) {
          return false
        }
        if (endDate && dateValue > endDate) {
          return false
        }
        return true
      })
      return
    }
    if (Array.isArray(value)) {
      result = result.filter((item) => value.includes(getValue(item, field)))
      return
    }
    if (typeof value === 'string') {
      result = result.filter((item) =>
        String(getValue(item, field)).toLowerCase().includes(value.toLowerCase())
      )
    }
  })
  return result
}

const applySort = <T extends Record<string, any>>(
  data: T[],
  field: string | null,
  order: 'asc' | 'desc'
) => {
  if (!field) {
    return data
  }
  const direction = order === 'desc' ? -1 : 1
  return [...data].sort((a, b) => {
    const aValue = getValue(a, field)
    const bValue = getValue(b, field)
    if (aValue === bValue) {
      return 0
    }
    return aValue > bValue ? direction : -direction
  })
}

const paginate = <T>(data: T[], offset: number, limit: number) => {
  const start = Math.max(0, offset)
  const size = Math.max(1, limit)
  return data.slice(start, start + size)
}

const resolvePagination = (parsed: URL) => {
  const offsetParam = parsed.searchParams.get('offset')
  const limitParam = parsed.searchParams.get('limit')
  if (offsetParam !== null || limitParam !== null) {
    const offset = Number(offsetParam ?? 0)
    const limit = Number(limitParam ?? 10)
    return {
      offset: Number.isFinite(offset) ? Math.max(0, offset) : 0,
      limit: Number.isFinite(limit) ? Math.max(1, limit) : 10
    }
  }
  const page = Number(parsed.searchParams.get('page') || 1)
  const size = Number(parsed.searchParams.get('size') || 10)
  const normalizedPage = Number.isFinite(page) ? Math.max(1, page) : 1
  const normalizedSize = Number.isFinite(size) ? Math.max(1, size) : 10
  return {
    offset: (normalizedPage - 1) * normalizedSize,
    limit: normalizedSize
  }
}

const resolveSort = (parsed: URL) => {
  const field =
    parsed.searchParams.get('sort_by') ||
    parsed.searchParams.get('sortBy') ||
    parsed.searchParams.get('sortField')
  const rawOrder =
    parsed.searchParams.get('sort_order') ||
    parsed.searchParams.get('sortOrder') ||
    ''
  const normalizedOrder = rawOrder.toLowerCase()
  if (normalizedOrder === 'desc' || normalizedOrder === '-1') {
    return { field, order: 'desc' as const }
  }
  if (normalizedOrder === 'asc' || normalizedOrder === '1') {
    return { field, order: 'asc' as const }
  }
  return { field, order: 'asc' as const }
}

const listCatalog = (data: any[], parsed: URL) => {
  const { offset, limit } = resolvePagination(parsed)
  const { field, order } = resolveSort(parsed)
  const global = parsed.searchParams.get('global') || ''
  const filters = parseFilters(parsed.searchParams.get('filters'))
  const active = data.filter((item) => !item.deletedAt)
  let result = applyFilters(active, global, filters)
  result = applySort(result, field, order)
  const total = result.length
  const pageData = paginate(result, offset, limit)
  return jsonResponse({ data: pageData, meta: { total } })
}

const isPlainObject = (value: any) =>
  value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)

const mergeDeep = (target: Record<string, any>, source: Record<string, any>) => {
  Object.entries(source).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      if (!isPlainObject(target[key])) {
        target[key] = {}
      }
      mergeDeep(target[key], value)
      return
    }
    target[key] = value
  })
}

const mapDirection = (item: any) => ({
  id: item.id,
  year: resolveNamedRef(item.id_year ?? null, item.year ? String(item.year) : null),
  base: resolveNamedRef(
    item.id_baza ?? null,
    item.id_baza === null || item.id_baza === undefined ? null : `Base ${item.id_baza}`
  ),
  doctor: resolveNamedRef(item.sandoctor_id ?? null, doctorMap.get(item.sandoctor_id) ?? null),
  object: resolveNamedRef(
    item.resobject_id ?? null,
    objectMap.get(item.resobject_id)?.name ?? `Объект ${item.resobject_id ?? ''}`.trim()
  ),
  status: resolveNamedRef(item.status_id ?? null, statusMap.get(item.status_id) ?? null),
  isSimpleStatus: item.simple_status ?? false,
  isUrgent: item.urgent ?? false,
  sampledAt: toIso(item.time_otbor),
  receivedAt: toIso(item.time_in),
  completedAt: toIso(item.time_out),
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapSample = (item: any) => ({
  id: item.id,
  month: resolveNamedRef(item.id_month ?? null, item.month ? String(item.month) : null),
  year: item.year ?? null,
  direction: resolveNamedRef(item.napr_id ?? null, directionMap.get(item.napr_id) ?? null),
  sampleType: resolveNamedRef(item.obr_type_id ?? null, sampleTypeMap.get(item.obr_type_id) ?? null),
  name: item.name ?? null,
  alternateName: item.alt_name ?? null,
  mass: item.mass ?? null,
  targetDescription: item.target ?? null,
  comment: item.comment ?? null,
  section: item.section ?? null,
  delivery: item.postavka ?? null,
  nomenclatureCode: item.nomencl_cod ?? null,
  batchCode: item.part_cod ?? null,
  supplier: item.postavshik ?? null,
  isUrgent: item.urgent ?? false,
  receivedAt: toIso(item.time_in),
  completedAt: toIso(item.time_out),
  status: resolveNamedRef(item.status_id ?? null, statusMap.get(item.status_id) ?? null),
  isSimpleStatus: item.simple_status ?? false,
  protocol: resolveNamedRef(item.protocol_id ?? null, protocolMap.get(item.protocol_id) ?? null),
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapSampleTarget = (item: any) => ({
  id: item.id,
  sample: resolveNamedRef(item.obr_id ?? null, sampleMap.get(item.obr_id) ?? null),
  target: resolveNamedRef(item.target_id ?? null, targetMap.get(item.target_id) ?? null),
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapSampleType = (item: any) => ({
  id: item.id,
  name: item.name,
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapIndicator = (item: any) => ({
  id: item.id,
  sampleType: resolveNamedRef(item.obr_type_id ?? null, sampleTypeMap.get(item.obr_type_id) ?? null),
  department: resolveDepartmentRef(item.podr_id ?? null),
  name: item.name,
  unit: item.edizm ?? null,
  normText: item.norm ?? null,
  normValue: item.norm_value ?? null,
  defaultText: item.default_text ?? null,
  comment: item.comment ?? null,
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapProtocol = (item: any) => ({
  id: item.id,
  year: resolveNamedRef(item.id_year ?? null, item.year ? String(item.year) : null),
  conclusion: resolveNamedRef(item.zakl_id ?? null, conclusionMap.get(item.zakl_id) ?? null),
  protocolType: resolveNamedRef(item.protocol_type_id ?? null, protocolTypeMap.get(item.protocol_type_id) ?? null),
  sequenceNumber: item.ex_num ?? null,
  isSimpleStatus: item.simple_status ?? false,
  fileName: item.file_name ?? null,
  fileExportName: item.file_vyp_name ?? null,
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapProtocolType = (item: any) => ({
  id: item.id,
  name: item.name,
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapResult = (item: any) => ({
  id: item.id,
  sample: resolveNamedRef(item.obr_id ?? null, sampleMap.get(item.obr_id) ?? null),
  department: resolveDepartmentRef(item.podr_id ?? null),
  status: resolveNamedRef(item.status_id ?? null, statusMap.get(item.status_id) ?? null),
  isSimpleStatus: item.simple_status ?? false,
  comment: item.comment ?? null,
  recommendation: item.recommend ?? null,
  receivedAt: toIso(item.time_in),
  completedAt: toIso(item.time_out),
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapConclusion = (item: any) => ({
  id: item.id,
  name: item.name,
  text: item.text ?? null,
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapDoctor = (item: any) => ({
  id: item.id,
  name: item.name,
  fullName: item.name_full ?? null,
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapResearchGoal = (item: any) => ({
  id: item.id,
  name: item.name,
  comment: item.comment ?? null,
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapTest = (item: any) => ({
  id: item.id,
  result: resolveNamedRef(item.result_id ?? null, resultMap.get(item.result_id) ?? null),
  indicator: resolveNamedRef(item.pok_id ?? null, indicatorMap.get(item.pok_id) ?? null),
  isActive: item.active ?? false,
  value: item.value ?? null,
  comment: item.comment ?? null,
  norm: item.norm ?? null,
  status: resolveNamedRef(item.status_id ?? null, statusMap.get(item.status_id) ?? null),
  createdBy: resolveUserRef(item.user_id ?? null),
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapStatus = (item: any) => ({
  id: item.id,
  name: item.name,
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const mapUserType = (item: any) => ({
  id: item.id,
  name: item.name,
  description: item.user_rights ?? '',
  createdAt: toIso(item.created),
  updatedAt: toIso(item.modified),
  deletedAt: deletedAtFromFlag(item.deleted, item.modified || item.created)
})

const catalogSeeds: Record<string, any[]> = {
  '/directions': naprsData.map(mapDirection),
  '/samples': obrsData.map(mapSample),
  '/sample-targets': obrTargetsData.map(mapSampleTarget),
  '/sample-types': obrTypesData.map(mapSampleType),
  '/branches': branches,
  '/labs': labs,
  '/indicators': poksData.map(mapIndicator),
  '/protocols': protocolsData.map(mapProtocol),
  '/protocol-types': protocolTypesData.map(mapProtocolType),
  '/results': resultsData.map(mapResult),
  '/conclusions': zaklsData.map(mapConclusion),
  '/doctors': sandoctorsData.map(mapDoctor),
  '/research-goals': targetsData.map(mapResearchGoal),
  '/tests': testsData.map(mapTest),
  '/statuses': statusesData.map(mapStatus),
  '/user-types': userTypesData.map(mapUserType)
}

db.catalogs = storageGet<Record<string, any[]>>('mock_catalogs_v3', catalogSeeds)
Object.entries(catalogSeeds).forEach(([key, seed]) => {
  if (!db.catalogs[key]) {
    db.catalogs[key] = seed
  }
})

const ensureMinCatalogs = (min: number) => {
  let changed = false
  Object.keys(catalogSeeds).forEach((key) => {
    const current = db.catalogs[key] || []
    const expanded = ensureMinRecords(current, min)
    if (expanded.length !== current.length) {
      db.catalogs[key] = expanded
      changed = true
    }
  })
  if (changed) {
    persistDb()
  }
}

const ensureDirectionNumbers = () => {
  const directions = db.catalogs['/directions'] || []
  const grouped = new Map<string, any[]>()
  directions.forEach((item) => {
    const yearValue = item.year?.name ?? item.year?.id ?? item.year ?? 'unknown'
    const key = yearValue === null || yearValue === undefined ? 'unknown' : String(yearValue)
    const bucket = grouped.get(key)
    if (bucket) {
      bucket.push(item)
      return
    }
    grouped.set(key, [item])
  })
  grouped.forEach((items) => {
    items.sort((a, b) => {
      const aTime = a.sampledAt ? new Date(a.sampledAt).getTime() : Number.POSITIVE_INFINITY
      const bTime = b.sampledAt ? new Date(b.sampledAt).getTime() : Number.POSITIVE_INFINITY
      if (aTime !== bTime) {
        return aTime - bTime
      }
      return (a.id ?? 0) - (b.id ?? 0)
    })
    items.forEach((item, index) => {
      item.number = index + 1
    })
  })
}

ensureMinCatalogs(50)
ensureDirectionNumbers()

const resolveRolePermissions = (name: string, index: number): Permission[] => {
  const lower = name.toLowerCase()
  if (lower.includes('админист')) {
    return adminCrudResources.flatMap(crudPermissions)
  }
  if (lower.includes('наблюд')) {
    return viewPermissions(adminCrudResources)
  }
  if (lower.includes('секрет')) {
    return [
      ...viewPermissions(['dashboard', 'directions', 'samples', 'protocols', 'results']),
      ...['directions', 'samples', 'protocols'].flatMap((resource) =>
        (['create', 'edit'] as Action[]).map((action) => ({ resource, action }))
      )
    ]
  }
  if (lower.includes('лаборат')) {
    return [
      ...viewPermissions(['dashboard', 'samples', 'tests', 'results', 'indicators']),
      ...['samples', 'tests', 'results'].flatMap((resource) =>
        (['create', 'edit'] as Action[]).map((action) => ({ resource, action }))
      )
    ]
  }
  if (lower.includes('руковод')) {
    return viewPermissions(adminCrudResources)
  }
  if (index % 3 === 0) {
    return viewPermissions(['dashboard', 'directions', 'samples', 'results'])
  }
  return viewPermissions(['dashboard'])
}

const ensureRolePermissions = () => {
  const roles = db.catalogs['/user-types'] || []
  let changed = false
  roles.forEach((role: any, index: number) => {
    if (!db.rolePermissions[role.id]) {
      db.rolePermissions[role.id] = resolveRolePermissions(role.name || '', index)
      changed = true
    }
  })
  if (changed) {
    persistDb()
  }
}

ensureRolePermissions()

const catalogMap: Record<string, { resource: Resource }> = {
  '/directions': { resource: 'directions' },
  '/samples': { resource: 'samples' },
  '/sample-targets': { resource: 'sample-targets' },
  '/sample-types': { resource: 'sample-types' },
  '/branches': { resource: 'branches' },
  '/labs': { resource: 'labs' },
  '/indicators': { resource: 'indicators' },
  '/protocols': { resource: 'protocols' },
  '/protocol-types': { resource: 'protocol-types' },
  '/results': { resource: 'results' },
  '/conclusions': { resource: 'conclusions' },
  '/doctors': { resource: 'doctors' },
  '/research-goals': { resource: 'research-goals' },
  '/tests': { resource: 'tests' },
  '/statuses': { resource: 'statuses' },
  '/user-types': { resource: 'user-types' }
}

const pathAliases: Record<string, string> = {
  '/roles': '/user-types',
  '/sample_targets': '/sample-targets',
  '/sample_types': '/sample-types',
  '/protocol_types': '/protocol-types',
  '/research_goals': '/research-goals'
}

const normalizePath = (path: string) => {
  for (const [from, to] of Object.entries(pathAliases)) {
    if (path === from || path.startsWith(`${from}/`)) {
      return `${to}${path.slice(from.length)}`
    }
  }
  return path
}

export const mockFetch = async (url: string, init: RequestInit) => {
  const parsed = new URL(url, 'http://localhost')
  const path = normalizePath(parsed.pathname)
  const method = (init.method || 'GET').toUpperCase()
  const isFormData = typeof FormData !== 'undefined' && init.body instanceof FormData
  const body = init.body && !isFormData ? JSON.parse(init.body as string) : null
  await wait(500)

  if (path === '/auth/login' && method === 'POST') {
    const login = body?.login
    const password = body?.password
    const user = db.users.find((item) => item.login === login)
    if (!user || credentials[login] !== password) {
      return errorResponse(422, 'Invalid credentials', 'INVALID_CREDENTIALS')
    }
    db.sessionUserId = user.id
    persistDb()
    return jsonResponse({ user, permissions: computeEffectivePermissions(user) })
  }

  if (path === '/auth/logout' && method === 'POST') {
    db.sessionUserId = null
    persistDb()
    return jsonResponse({ ok: true })
  }

  if (path === '/auth/me' && method === 'GET') {
    const auth = requireAuth()
    if (!auth.ok) {
      return auth.response
    }
    return jsonResponse({ user: auth.user, permissions: computeEffectivePermissions(auth.user) })
  }

  if (path === '/directions/import' && method === 'POST') {
    const auth = requireAuth()
    if (!auth.ok) {
      return auth.response
    }
    const permission = requirePermission(auth.user, 'directions', 'create')
    if (!permission.ok) {
      return permission.response
    }
    return jsonResponse({ ok: true })
  }

  if (path === '/directions/protocol' && method === 'POST') {
    const auth = requireAuth()
    if (!auth.ok) {
      return auth.response
    }
    const permission = requirePermission(auth.user, 'directions', 'view')
    if (!permission.ok) {
      return permission.response
    }
    const ids = Array.isArray(body?.ids) ? body.ids : []
    if (!ids.length) {
      return errorResponse(422, 'No directions selected', 'EMPTY_SELECTION')
    }
    return jsonResponse({ ok: true })
  }

  if (path === '/samples/protocol' && method === 'POST') {
    const auth = requireAuth()
    if (!auth.ok) {
      return auth.response
    }
    const permission = requirePermission(auth.user, 'samples', 'view')
    if (!permission.ok) {
      return permission.response
    }
    const ids = Array.isArray(body?.ids) ? body.ids : []
    if (!ids.length) {
      return errorResponse(422, 'No samples selected', 'EMPTY_SELECTION')
    }
    return jsonResponse({ ok: true })
  }

  if (path.startsWith('/dashboard/quick-actions')) {
    const auth = requireAuth()
    if (!auth.ok) {
      return auth.response
    }
    const userId = auth.user.id
    if (!db.quickActions[userId]) {
      db.quickActions[userId] = []
      persistDb()
    }
    if (path === '/dashboard/quick-actions' && method === 'GET') {
      const actions = db.quickActions[userId] || []
      return jsonResponse({ data: actions, meta: { total: actions.length } })
    }
    if (path === '/dashboard/quick-actions' && method === 'POST') {
      const actions = db.quickActions[userId] || []
      const nextId = actions.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1
      const record = {
        id: nextId,
        label: body?.label || `Action ${nextId}`,
        resource: body?.resource,
        action: body?.action,
        to: body?.to,
        icon: body?.icon || 'pi pi-bolt',
        createdAt: nowIso(),
        updatedAt: nowIso()
      }
      actions.unshift(record)
      db.quickActions[userId] = actions
      persistDb()
      return jsonResponse({ data: record })
    }
    const quickActionMatch = path.match(/^\/dashboard\/quick-actions\/(\d+)$/)
    if (quickActionMatch) {
      const actionId = Number(quickActionMatch[1])
      const actions = db.quickActions[userId] || []
      const target = actions.find((item) => item.id === actionId)
      if (!target) {
        return errorResponse(404, 'Not found')
      }
      if (method === 'PUT') {
        if (body?.label !== undefined) {
          target.label = body.label
        }
        if (body?.resource !== undefined) {
          target.resource = body.resource
        }
        if (body?.action !== undefined) {
          target.action = body.action
        }
        if (body?.to !== undefined) {
          target.to = body.to
        }
        if (body?.icon !== undefined) {
          target.icon = body.icon
        }
        target.updatedAt = nowIso()
        persistDb()
        return jsonResponse({ data: target })
      }
      if (method === 'DELETE') {
        db.quickActions[userId] = actions.filter((item) => item.id !== actionId)
        persistDb()
        return jsonResponse({ ok: true })
      }
    }
  }

  const catalogEntityMatch = path.match(/^\/([a-z-]+)\/(\d+)$/)
  const rolePermissionsMatch = path.match(/^\/user-types\/(\d+)\/permissions$/)
  if (rolePermissionsMatch) {
    const auth = requireAuth()
    if (!auth.ok) {
      return auth.response
    }
    const permission = requirePermission(auth.user, 'user-types', 'edit')
    if (!permission.ok) {
      return permission.response
    }
    const roleId = Number(rolePermissionsMatch[1])
    if (method === 'GET') {
      return jsonResponse({ data: { permissions: db.rolePermissions[roleId] || [] } })
    }
    if (method === 'PUT') {
      db.rolePermissions[roleId] = Array.isArray(body?.permissions) ? body.permissions : []
      persistDb()
      return jsonResponse({ ok: true })
    }
  }

  const catalogBase = catalogEntityMatch ? `/${catalogEntityMatch[1]}` : path
  const catalog = catalogMap[catalogBase]
  if (catalog) {
    const auth = requireAuth()
    if (!auth.ok) {
      return auth.response
    }
    const catalogData = db.catalogs[catalogBase] || []
    if (catalogBase === '/directions') {
      ensureDirectionNumbers()
    }
    if (method === 'GET' && path === catalogBase) {
      const permission = requirePermission(auth.user, catalog.resource, 'view')
      if (!permission.ok) {
        return permission.response
      }
      if (catalogBase === '/user-types') {
        const withSummaries = catalogData.map((item) => ({
          ...item,
          permissionsSummary: summarizePermissions(db.rolePermissions[item.id] || [])
        }))
        return listCatalog(withSummaries, parsed)
      }
      return listCatalog(catalogData, parsed)
    }
    if (method === 'POST' && path === catalogBase) {
      const permission = requirePermission(auth.user, catalog.resource, 'create')
      if (!permission.ok) {
        return permission.response
      }
      const nextId = catalogData.reduce((max, item) => Math.max(max, item.id), 0) + 1
      const record: Record<string, any> = {
        id: nextId,
        createdAt: nowIso(),
        updatedAt: nowIso(),
        deletedAt: null
      }
      if (body) {
        mergeDeep(record, body)
      }
      if (!record.createdBy) {
        record.createdBy = resolveUserRef(auth.user.id)
      }
      catalogData.unshift(record)
      db.catalogs[catalogBase] = catalogData
      if (catalogBase === '/user-types') {
        db.rolePermissions[record.id] = []
      }
      persistDb()
      return jsonResponse({ data: record })
    }
    if (catalogEntityMatch && (method === 'PUT' || method === 'PATCH')) {
      const permission = requirePermission(auth.user, catalog.resource, 'edit')
      if (!permission.ok) {
        return permission.response
      }
      const entityId = Number(catalogEntityMatch[2])
      const record = catalogData.find((item) => item.id === entityId)
      if (!record) {
        return errorResponse(404, 'Not found')
      }
      if (body) {
        mergeDeep(record, body)
      }
      record.updatedAt = nowIso()
      persistDb()
      return jsonResponse({ data: record })
    }
    if (catalogEntityMatch && method === 'DELETE') {
      const permission = requirePermission(auth.user, catalog.resource, 'delete')
      if (!permission.ok) {
        return permission.response
      }
      const entityId = Number(catalogEntityMatch[2])
      const record = catalogData.find((item) => item.id === entityId)
      if (!record) {
        return errorResponse(404, 'Not found')
      }
      record.deletedAt = nowIso()
      record.updatedAt = nowIso()
      if (catalogBase === '/user-types') {
        delete db.rolePermissions[entityId]
      }
      persistDb()
      return jsonResponse({ ok: true })
    }
  }

  if (path.startsWith('/objects')) {
    const auth = requireAuth()
    if (!auth.ok) {
      return auth.response
    }
    if (method === 'GET' && path === '/objects') {
      const permission = requirePermission(auth.user, 'objects', 'view')
      if (!permission.ok) {
        return permission.response
      }
      const { offset, limit } = resolvePagination(parsed)
      const { field, order } = resolveSort(parsed)
      const global = parsed.searchParams.get('global') || ''
      const filters = parseFilters(parsed.searchParams.get('filters'))
      const active = db.objects.filter((item) => !item.deleted_at).map(mapObjectRead)
      let result = applyFilters(active, global, filters)
      result = applySort(result, field, order)
      const total = result.length
      const data = paginate(result, offset, limit)
      return jsonResponse({ data, meta: { total } })
    }

    if (method === 'POST' && path === '/objects') {
      const permission = requirePermission(auth.user, 'objects', 'create')
      if (!permission.ok) {
        return permission.response
      }
      const nextId = db.objects.reduce((max, item) => Math.max(max, item.id), 0) + 1
      const entity: ObjectRecord = {
        id: nextId,
        branch_id: body.branch_id ?? null,
        code: body.code,
        name: body.name,
        full_name: body.full_name ?? null,
        address: body.address ?? null,
        created_at: nowIso(),
        updated_at: nowIso(),
        deleted_at: null
      }
      db.objects.unshift(entity)
      persistDb()
      return jsonResponse({ data: mapObjectRead(entity) })
    }

    const entityIdMatch = path.match(/\/objects\/(\d+)/)
    if (entityIdMatch) {
      const entityId = Number(entityIdMatch[1])
      const entity = db.objects.find((item) => item.id === entityId)
      if (!entity) {
        return errorResponse(404, 'Not found')
      }
      if (method === 'PUT' || method === 'PATCH') {
        const permission = requirePermission(auth.user, 'objects', 'edit')
        if (!permission.ok) {
          return permission.response
        }
        if (body.updated_at && body.updated_at !== entity.updated_at) {
          return errorResponse(409, 'Stale data', 'STALE_DATA')
        }
        if ('branch_id' in body) {
          entity.branch_id = body.branch_id
        }
        if ('code' in body) {
          entity.code = body.code
        }
        if ('name' in body) {
          entity.name = body.name
        }
        if ('full_name' in body) {
          entity.full_name = body.full_name
        }
        if ('address' in body) {
          entity.address = body.address
        }
        entity.updated_at = nowIso()
        persistDb()
        return jsonResponse({ data: mapObjectRead(entity) })
      }
      if (method === 'DELETE') {
        const permission = requirePermission(auth.user, 'objects', 'delete')
        if (!permission.ok) {
          return permission.response
        }
        entity.deleted_at = nowIso()
        entity.updated_at = nowIso()
        persistDb()
        return jsonResponse({ ok: true })
      }
    }
  }

  if (path.startsWith('/admin/users') || path.startsWith('/users')) {
    const auth = requireAuth()
    if (!auth.ok) {
      return auth.response
    }
    if ((path === '/admin/users' || path === '/users') && method === 'GET') {
      ensureSeedOverrides()
      const permission = requirePermission(auth.user, 'users', 'view')
      if (!permission.ok) {
        return permission.response
      }
      const { offset, limit } = resolvePagination(parsed)
      const { field, order } = resolveSort(parsed)
      const global = parsed.searchParams.get('global') || ''
      const filters = parseFilters(parsed.searchParams.get('filters'))
      const active = db.users.filter((item) => !item.deletedAt)
      let result = applyFilters(active, global, filters)
      result = applySort(result, field, order)
      const total = result.length
      const data = paginate(result, offset, limit).map(withOverridesCount)
      return jsonResponse({ data, meta: { total } })
    }

    if ((path === '/admin/users' || path === '/users') && method === 'POST') {
      const permission = requirePermission(auth.user, 'users', 'create')
      if (!permission.ok) {
        return permission.response
      }
      const nextId = db.users.reduce((max, item) => Math.max(max, item.id), 0) + 1
      const login = body.login
      const user: UserRecord = {
        id: nextId,
        login,
        email: `${login}@example.com`,
        fullName: body.fullName,
        role: body.role,
        status: body.status,
        department: resolveDepartmentRef(body.departmentId ?? null),
        createdAt: nowIso(),
        updatedAt: nowIso(),
        deletedAt: null
      }
      db.users.unshift(user)
      if (!db.quickActions[user.id]) {
        db.quickActions[user.id] = defaultQuickActionsForRole(user.role).map((item, index) => ({
          id: index + 1,
          ...item,
          createdAt: nowIso(),
          updatedAt: nowIso()
        }))
      }
      persistDb()
      return jsonResponse({ data: withOverridesCount(user) })
    }

    const permissionsMatch = path.match(/\/(?:admin\/)?users\/(\d+)\/permissions/)
    if (permissionsMatch) {
      const userId = Number(permissionsMatch[1])
      const targetUser = db.users.find((item) => item.id === userId)
      if (!targetUser) {
        return errorResponse(404, 'Not found')
      }
      if (method === 'GET') {
        const permission = requirePermission(auth.user, 'users', 'edit')
        if (!permission.ok) {
          return permission.response
        }
        return jsonResponse({
          data: {
            rolePermissions: rolePermissions[targetUser.role] || [],
            overrides: db.overrides[targetUser.id] || []
          }
        })
      }
      if (method === 'PUT' || method === 'PATCH') {
        const permission = requirePermission(auth.user, 'users', 'edit')
        if (!permission.ok) {
          return permission.response
        }
        db.overrides[targetUser.id] = body.overrides || []
        persistDb()
        return jsonResponse({ ok: true })
      }
    }

    const userIdMatch = path.match(/\/(?:admin\/)?users\/(\d+)/)
    if (userIdMatch) {
      const userId = Number(userIdMatch[1])
      const user = db.users.find((item) => item.id === userId)
      if (!user) {
        return errorResponse(404, 'Not found')
      }
      if (method === 'PUT') {
        const permission = requirePermission(auth.user, 'users', 'edit')
        if (!permission.ok) {
          return permission.response
        }
        user.login = body.login ?? user.login
        user.email = body.login ? `${body.login}@example.com` : user.email
        user.fullName = body.fullName ?? user.fullName
        user.role = body.role ?? user.role
        user.status = body.status ?? user.status
        user.department = resolveDepartmentRef(body.departmentId ?? user.department.id)
        user.updatedAt = nowIso()
        persistDb()
        return jsonResponse({ data: withOverridesCount(user) })
      }
      if (method === 'DELETE') {
        const permission = requirePermission(auth.user, 'users', 'delete')
        if (!permission.ok) {
          return permission.response
        }
        user.deletedAt = nowIso()
        user.updatedAt = nowIso()
        persistDb()
        return jsonResponse({ ok: true })
      }
    }
  }

  return errorResponse(404, 'Not found')
}
