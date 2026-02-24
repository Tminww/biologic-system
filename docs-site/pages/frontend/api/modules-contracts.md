# Контракты модулей frontend (`src/modules/**/*.api.ts`)

Документ фиксирует актуальные frontend-контракты и сопоставление с backend-сущностями.

## Источник истины

- Frontend API-обертки: `src/modules/**/*.api.ts`
- Базовый API-клиент: `src/shared/api/client.ts`
- Базовые envelope-типы: `src/shared/types/api.ts`

Если backend DTO описаны в отдельном репозитории, используйте этот документ как контракт интеграции на стороне frontend.

## Базовые правила интеграции

- Для live-режима используйте `VITE_API_BASE_URL` и `VITE_API_PREFIX` (обычно `/api/v1`).
- Frontend вызывает относительные пути (`/directions`, `/sample_types`, `/users`).
- Контракт списка для CRUD-модулей:

```ts
interface ReadListMeta {
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

interface ReadListResponse<T> {
  items: T[]
  meta: ReadListMeta
}
```

## Матрица соответствия frontend <-> backend

Колонка `Backend DTO` описывает backend-документы/сущности и может ссылаться на внешний репозиторий backend.

| Frontend модуль | Файл | Backend DTO | Frontend путь | Backend путь |
| --- | --- | --- | --- | --- |
| Objects | `src/modules/entities/entities.api.ts` | `entities/objects.md` | `/objects` | `/api/v1/objects` |
| Admin users | `src/modules/admin/admin.api.ts` | `users`, `roles`, `role_permissions`, `user_permission_overrides` | `/users*` | `/api/v1/users` + permission endpoints |
| Directions | `src/modules/directions/directions.api.ts` | `entities/directions.md` | `/directions` | `/api/v1/directions` |
| Samples | `src/modules/samples/samples.api.ts` | `entities/samples.md` | `/samples` | `/api/v1/samples` |
| Protocols | `src/modules/protocols/protocols.api.ts` | `entities/protocols.md` | `/protocols` | `/api/v1/protocols` |
| Results | `src/modules/results/results.api.ts` | `entities/results.md` | `/results` | `/api/v1/results` |
| Conclusions | `src/modules/conclusions/conclusions.api.ts` | `entities/conclusions.md`, `entities/conclusion_statuses.md` | `/conclusions` | `/api/v1/conclusions` |
| Tests | `src/modules/tests/tests.api.ts` | `entities/tests.md` | `/tests` | `/api/v1/tests` |
| Doctors | `src/modules/doctors/doctors.api.ts` | `entities/doctors.md` | `/doctors` | `/api/v1/doctors` |
| Departments | `src/modules/departments/departments.api.ts` | `entities/branches.md` | `/branches` | `/api/v1/branches` |
| Labs | `src/modules/labs/labs.api.ts` | `entities/labs.md` | `/labs` | `/api/v1/labs` |
| Research goals | `src/modules/research-goals/research-goals.api.ts` | `entities/research_goals.md` | `/research_goals` | `/api/v1/research_goals` |
| Sample types | `src/modules/sample-types/sample-types.api.ts` | `entities/sample_types.md` | `/sample_types` | `/api/v1/sample_types` |
| Sample targets | `src/modules/sample-targets/sample-targets.api.ts` | `entities/sample_targets.md` | `/sample_targets` | `/api/v1/sample_targets` |
| Indicators | `src/modules/indicators/indicators.api.ts` | `entities/indicators.md` | `/indicators` | `/api/v1/indicators` |
| Protocol types | `src/modules/protocol-types/protocol-types.api.ts` | `entities/protocol_types.md` | `/protocol_types` | `/api/v1/protocol_types` |
| Statuses | `src/modules/statuses/statuses.api.ts` | `entities/statuses.md` | `/statuses` | `/api/v1/statuses` |
| User types | `src/modules/user-types/user-types.api.ts` | `entities/roles.md`, `entities/role_permissions.md` | `/roles*` | `/api/v1/roles` + role permission endpoints |
| Auth | `src/modules/auth/auth.api.ts` | `users`, `roles`, `role_permissions` | `/auth/*` | сервисный auth endpoint |
| Dashboard quick actions | `src/modules/dashboard/dashboard.api.ts` | не документирован в `entities` | `/dashboard/quick-actions` | сервисный endpoint |

## DTO спецификация frontend

`ReadListDTO` = тип элемента внутри `ReadListResponse<T>.items`.

### Response envelope для Create, Update, ReadOne и ReadList

- Формат ответа для create/update-операций, `GET /resource/{id}` и list-операций:

```ts
interface OperationMeta {
  timestamp: string
  request_id: string
  version: string
  operation: string
}

interface CreateResponse<TReadDTO> {
  data: TReadDTO
  meta: OperationMeta
}

interface UpdateResponse<TReadDTO> {
  data: TReadDTO
  meta: OperationMeta
}

interface ReadMeta {
  timestamp: string
  request_id: string
  version: string
  includes: string[]
  includes_requested: string[]
  includes_applied: string[]
  includes_allowed: string[]
}

interface ReadResponse<TReadDTO> {
  data: TReadDTO
  meta: ReadMeta
}

interface ReadListMeta {
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

interface ReadListResponse<TReadDTO> {
  items: TReadDTO[]
  meta: ReadListMeta
}
```

- Пример:

```json
{
  "data": {
    "id": 123,
    "name": "Entity A",
    "updatedAt": "2026-02-20T12:00:00Z"
  },
  "meta": {
    "timestamp": "2026-02-20T12:00:00Z",
    "request_id": "req_7f3a2d9c",
    "version": "v1",
    "operation": "create"
  }
}
```

- Пример `ReadResponse` для одиночного `GET /resource/{id}`:

```json
{
  "data": {
    "id": 123,
    "name": "Entity A",
    "updatedAt": "2026-02-20T12:10:00Z"
  },
  "meta": {
    "timestamp": "2026-02-20T12:10:00Z",
    "request_id": "req_3d29f8ab",
    "version": "v1",
    "includes": [
      "status"
    ],
    "includes_requested": [
      "status",
      "author"
    ],
    "includes_applied": [
      "status"
    ],
    "includes_allowed": [
      "status",
      "category",
      "author"
    ]
  }
}
```

- Пример `ReadListResponse`:

```json
{
  "items": [
    {
      "id": 123,
      "name": "Entity A",
      "updatedAt": "2026-02-20T12:10:00Z"
    }
  ],
  "meta": {
    "timestamp": "2026-02-20T12:10:00Z",
    "request_id": "req_aa01bc02",
    "version": "v1",
    "total": 245,
    "offset": 0,
    "limit": 25,
    "includes_request": [
      "status"
    ],
    "includes_applied": [
      "status"
    ],
    "includes_allowed": [
      "status",
      "author"
    ]
  }
}
```

- Пример `UpdateResponse`:

```json
{
  "data": {
    "id": 123,
    "name": "Entity A (updated)",
    "updatedAt": "2026-02-20T12:10:00Z"
  },
  "meta": {
    "timestamp": "2026-02-20T12:10:00Z",
    "request_id": "req_0f2c9a1b",
    "version": "v1",
    "operation": "update"
  }
}
```

### Objects (`src/modules/entities/entities.api.ts`)

- `CreateDTO` (`CreateEntityDto`):
  - `name: string`
  - `fullName: string`
  - `status: string`
  - `category: string`
  - `address: string`
- `UpdateDTO` (`UpdateEntityDto`):
  - `name?: string`
  - `fullName?: string`
  - `status?: string`
  - `category?: string`
  - `address?: string`
  - `updatedAt?: string`
- `ReadDTO` (`EntityRecord`):
  - `id: number`
  - `name: string`
  - `fullName: string`
  - `status: string`
  - `category: string`
  - `address: string`
  - `createdAt: string`
  - `updatedAt: string`
  - `deletedAt: string | null`
- `ReadListDTO`: `EntityRecord`

### Admin users (`src/modules/admin/admin.api.ts`)

- `CreateDTO` (`CreateUserDto`):
  - `login: string`
  - `password: string`
  - `fullName: string`
  - `role: string`
  - `status: string`
  - `departmentId: number | null`
- `UpdateDTO` (`UpdateUserDto`):
  - `login?: string`
  - `fullName?: string`
  - `role?: string`
  - `status?: string`
  - `departmentId?: number | null`
  - `password?: string`
- `ReadDTO` (`UserRecord`):
  - `id: number`
  - `login: string`
  - `email: string`
  - `fullName: string`
  - `role: string`
  - `status: string`
  - `department: NamedRef`
  - `createdAt: string`
  - `updatedAt: string`
  - `deletedAt: string | null`
  - `overridesCount: number`
- `ReadListDTO`: `UserRecord`

### Directions (`src/modules/directions/directions.api.ts`)

- `CreateDTO` (`CreateDirectionDto`):
  - `year_no: number`
  - `base_no?: number | null`
  - `is_done: boolean`
  - `is_urgent: boolean`
  - `doctor_id?: UUID | null`
  - `object_id?: UUID | null`
  - `status_id?: UUID | null`
  - `sampled_at?: string | null`
  - `received_at?: string | null`
  - `completed_at?: string | null`
- `UpdateDTO` (`UpdateDirectionDto`):
  - `year_no?: number | null`
  - `base_no?: number | null`
  - `is_done?: boolean | null`
  - `is_urgent?: boolean | null`
  - `doctor_id?: UUID | null`
  - `object_id?: UUID | null`
  - `status_id?: UUID | null`
  - `sampled_at?: string | null`
  - `received_at?: string | null`
  - `completed_at?: string | null`
- `ReadDTO` (`ReadDirectionDTO`):
  - `id: UUID`
  - `year_no: number`
  - `base_no: number | null`
  - `is_done: boolean`
  - `is_urgent: boolean`
  - `doctor_id: UUID | null`
  - `object_id: UUID | null`
  - `status_id: UUID | null`
  - `sampled_at: string | null`
  - `received_at: string | null`
  - `completed_at: string | null`
  - `created_at: string`
  - `updated_at: string`
  - `doctor?: EntityRefDTO | null`
  - `object?: EntityRefDTO | null`
  - `status?: EntityRefDTO | null`
- `ReadListDTO` (`DirectionListReadDTO`):
  - `id: UUID`
  - `year_no: number`
  - `base_no: number | null`
  - `is_done: boolean`
  - `is_urgent: boolean`
  - `doctor_id: UUID | null`
  - `object_id: UUID | null`
  - `status_id: UUID | null`
  - `sampled_at: string | null`
  - `received_at: string | null`
  - `completed_at: string | null`
  - `created_at: string`
  - `updated_at: string`
  - `doctor?: EntityRefDTO | null`
  - `object?: EntityRefDTO | null`
  - `status?: EntityRefDTO | null`

### Samples (`src/modules/samples/samples.api.ts`)

- `CreateDTO` (`CreateSampleDto`):
  - `name: string | null`
  - `sampleType: NamedRef`
  - `direction: NamedRef`
  - `status: NamedRef`
  - `receivedAt: string | null`
- `UpdateDTO` (`UpdateSampleDto`):
  - `name?: string | null`
  - `sampleType?: NamedRef`
  - `direction?: NamedRef`
  - `status?: NamedRef`
  - `receivedAt?: string | null`
- `ReadDTO` (`SampleRecord`):
  - `id: number`
  - `month: NamedRef`
  - `year: number | null`
  - `direction: NamedRef`
  - `sampleType: NamedRef`
  - `name: string | null`
  - `alternateName: string | null`
  - `mass: number | null`
  - `targetDescription: string | null`
  - `comment: string | null`
  - `section: string | null`
  - `delivery: string | null`
  - `nomenclatureCode: string | null`
  - `batchCode: string | null`
  - `supplier: string | null`
  - `isUrgent: boolean`
  - `receivedAt: string | null`
  - `completedAt: string | null`
  - `status: NamedRef`
  - `isSimpleStatus: boolean`
  - `protocol: NamedRef`
  - `createdBy: NamedRef`
  - `createdAt: string | null`
  - `updatedAt: string | null`
  - `deletedAt: string | null`
- `ReadListDTO`: `SampleRecord`

### Protocols (`src/modules/protocols/protocols.api.ts`)

- `CreateDTO` (`CreateProtocolDto`):
  - `year: NamedRef`
  - `sequenceNumber: string | number | null`
  - `protocolType: NamedRef`
  - `conclusion: NamedRef`
  - `isSimpleStatus: boolean`
- `UpdateDTO` (`UpdateProtocolDto`):
  - `year?: NamedRef`
  - `sequenceNumber?: string | number | null`
  - `protocolType?: NamedRef`
  - `conclusion?: NamedRef`
  - `isSimpleStatus?: boolean`
- `ReadDTO` (`ProtocolRecord`):
  - `id: number`
  - `year: NamedRef`
  - `conclusion: NamedRef`
  - `protocolType: NamedRef`
  - `sequenceNumber: string | number | null`
  - `isSimpleStatus: boolean`
  - `fileName: string | null`
  - `fileExportName: string | null`
  - `createdBy: NamedRef`
  - `createdAt: string | null`
  - `updatedAt: string | null`
  - `deletedAt: string | null`
- `ReadListDTO`: `ProtocolRecord`

### Results (`src/modules/results/results.api.ts`)

- `CreateDTO` (`CreateResultDto`):
  - `comment?: string | null`
  - `recommendation?: string | null`
  - `is_done: boolean`
  - `lab_id?: UUID | null`
  - `sample_id: UUID`
  - `status_id?: UUID | null`
  - `received_at?: string | null`
  - `completed_at?: string | null`
- `UpdateDTO` (`UpdateResultDto`):
  - `comment?: string | null`
  - `recommendation?: string | null`
  - `is_done?: boolean | null`
  - `lab_id?: UUID | null`
  - `sample_id?: UUID | null`
  - `status_id?: UUID | null`
  - `received_at?: string | null`
  - `completed_at?: string | null`
- `ReadDTO` (`ReadResultDTO`):
  - `id: UUID`
  - `comment: string | null`
  - `recommendation: string | null`
  - `is_done: boolean`
  - `lab_id: UUID | null`
  - `sample_id: UUID`
  - `status_id: UUID | null`
  - `received_at: string | null`
  - `completed_at: string | null`
  - `created_at: string`
  - `updated_at: string`
  - `lab?: EntityRefDTO | null`
  - `sample?: EntityRefDTO | null`
  - `status?: EntityRefDTO | null`
- `ReadListDTO` (`ResultListReadDTO`):
  - `id: UUID`
  - `comment: string | null`
  - `recommendation: string | null`
  - `is_done: boolean`
  - `lab_id: UUID | null`
  - `sample_id: UUID`
  - `status_id: UUID | null`
  - `received_at: string | null`
  - `completed_at: string | null`
  - `created_at: string`
  - `updated_at: string`
  - `lab?: EntityRefDTO | null`
  - `sample?: EntityRefDTO | null`
  - `status?: EntityRefDTO | null`

### Conclusions (`src/modules/conclusions/conclusions.api.ts`)

- `CreateDTO` (`CreateConclusionDTO`):
  - `comment?: string | null`
  - `conclusion_status_id: UUID`
- `UpdateDTO` (`UpdateConclusionDTO`):
  - `comment?: string | null`
  - `conclusion_status_id?: UUID | null`
- `ReadDTO` (`ReadConclusionDTO`):
  - `id: UUID`
  - `comment: string | null`
  - `conclusion_status_id: UUID`
  - `created_at: string`
  - `updated_at: string`
  - `conclusion_status?: ReadConclusionStatusDTO | null`
- `ReadListDTO` (`ListReadConclusionDTO`):
  - `id: UUID`
  - `comment: string | null`
  - `conclusion_status_id: UUID`
  - `created_at: string`
  - `updated_at: string`
  - `conclusion_status?: ReadConclusionStatusDTO | null`

### Tests (`src/modules/tests/tests.api.ts`)

- `CreateDTO` (`CreateTestDto`):
  - `result: NamedRef`
  - `indicator: NamedRef`
  - `value: number | null`
  - `status: NamedRef`
  - `isActive: boolean`
- `UpdateDTO` (`UpdateTestDto`):
  - `result?: NamedRef`
  - `indicator?: NamedRef`
  - `value?: number | null`
  - `status?: NamedRef`
  - `isActive?: boolean`
- `ReadDTO` (`TestRecord`):
  - `id: number`
  - `result: NamedRef`
  - `indicator: NamedRef`
  - `isActive: boolean`
  - `value: string | number | null`
  - `comment: string | null`
  - `norm: string | null`
  - `status: NamedRef`
  - `createdBy: NamedRef`
  - `createdAt: string | null`
  - `updatedAt: string | null`
  - `deletedAt: string | null`
- `ReadListDTO`: `TestRecord`

### Doctors (`src/modules/doctors/doctors.api.ts`)

- `CreateDTO` (`CreateDoctorDto`):
  - `first_name: string`
  - `last_name?: string | null`
  - `patronymic?: string | null`
- `UpdateDTO` (`UpdateDoctorDto`):
  - `first_name?: string | null`
  - `last_name?: string | null`
  - `patronymic?: string | null`
- `ReadDTO` (`ReadDoctorDTO`):
  - `id: UUID`
  - `first_name: string`
  - `last_name: string | null`
  - `patronymic: string | null`
  - `created_at: string`
  - `updated_at: string`
- `ReadListDTO` (`ListReadDoctorDTO`):
  - `id: UUID`
  - `first_name: string`
  - `last_name: string | null`
  - `patronymic: string | null`
  - `created_at: string`
  - `updated_at: string`

### Departments (`src/modules/departments/departments.api.ts`)

- `CreateDTO` (`CreateDepartmentDto`):
  - `name: string`
  - `code: string | number | null`
  - `fullName: string | null`
- `UpdateDTO` (`UpdateDepartmentDto`):
  - `name?: string`
  - `code?: string | number | null`
  - `fullName?: string | null`
- `ReadDTO` (`DepartmentRecord`):
  - `id: number`
  - `name: string`
  - `code: string | number | null`
  - `fullName: string | null`
  - `createdAt: string | null`
  - `updatedAt: string | null`
  - `deletedAt: string | null`
- `ReadListDTO`: `DepartmentRecord`

### Research goals (`src/modules/research-goals/research-goals.api.ts`)

- `CreateDTO` (`CreateResearchGoalDto`):
  - `code: string`
  - `name: string`
  - `comment?: string | null`
  - `lab_id?: UUID | null`
- `UpdateDTO` (`UpdateResearchGoalDto`):
  - `code?: string | null`
  - `name?: string | null`
  - `comment?: string | null`
  - `lab_id?: UUID | null`
- `ReadDTO` (`ReadResearchGoalDTO`):
  - `id: UUID`
  - `code: string`
  - `name: string`
  - `comment: string | null`
  - `lab_id: UUID | null`
  - `created_at: string`
  - `updated_at: string`
  - `lab?: EntityRefDTO | null`
- `ReadListDTO` (`ResearchGoalListReadDTO`):
  - `id: UUID`
  - `code: string`
  - `name: string`
  - `comment: string | null`
  - `lab_id: UUID | null`
  - `created_at: string`
  - `updated_at: string`
  - `lab?: EntityRefDTO | null`

### Sample types (`src/modules/sample-types/sample-types.api.ts`)

- `CreateDTO` (`CreateSampleTypeDto`):
  - `code: string`
  - `name: string`
- `UpdateDTO` (`UpdateSampleTypeDto`):
  - `code?: string | null`
  - `name?: string | null`
- `ReadDTO` (`ReadSampleTypeDTO`):
  - `id: UUID`
  - `code: string`
  - `name: string`
  - `created_at: string`
  - `updated_at: string`
- `ReadListDTO` (`SampleTypeListReadDTO`):
  - `id: UUID`
  - `code: string`
  - `name: string`
  - `created_at: string`
  - `updated_at: string`

### Sample targets (`src/modules/sample-targets/sample-targets.api.ts`)

- `CreateDTO` (`CreateSampleTargetDto`):
  - `sample_id: UUID`
  - `research_goal_id: UUID`
  - `status_id?: UUID | null`
- `UpdateDTO` (`UpdateSampleTargetDto`):
  - `sample_id?: UUID | null`
  - `research_goal_id?: UUID | null`
  - `status_id?: UUID | null`
- `ReadDTO` (`ReadSampleTargetDTO`):
  - `id: UUID`
  - `sample_id: UUID`
  - `research_goal_id: UUID`
  - `status_id: UUID | null`
  - `created_at: string`
  - `updated_at: string`
  - `sample?: EntityRefDTO | null`
  - `research_goal?: EntityRefDTO | null`
  - `status?: EntityRefDTO | null`
- `ReadListDTO` (`SampleTargetListReadDTO`):
  - `id: UUID`
  - `sample_id: UUID`
  - `research_goal_id: UUID`
  - `status_id: UUID | null`
  - `created_at: string`
  - `updated_at: string`
  - `sample?: EntityRefDTO | null`
  - `research_goal?: EntityRefDTO | null`
  - `status?: EntityRefDTO | null`

### Indicators (`src/modules/indicators/indicators.api.ts`)

- `CreateDTO` (`CreateIndicatorDto`):
  - `name: string`
  - `unit?: string | null`
  - `norm_text?: string | null`
  - `norm_value?: string | null`
  - `default_text?: string | null`
  - `comment?: string | null`
  - `lab_id?: UUID | null`
  - `sample_type_id?: UUID | null`
- `UpdateDTO` (`UpdateIndicatorDto`):
  - `name?: string | null`
  - `unit?: string | null`
  - `norm_text?: string | null`
  - `norm_value?: string | null`
  - `default_text?: string | null`
  - `comment?: string | null`
  - `lab_id?: UUID | null`
  - `sample_type_id?: UUID | null`
- `ReadDTO` (`ReadIndicatorDTO`):
  - `id: UUID`
  - `name: string`
  - `unit: string | null`
  - `norm_text: string | null`
  - `norm_value: string | null`
  - `default_text: string | null`
  - `comment: string | null`
  - `lab_id: UUID | null`
  - `sample_type_id: UUID | null`
  - `created_at: string`
  - `updated_at: string`
  - `lab?: EntityRefDTO | null`
  - `sample_type?: EntityRefDTO | null`
- `ReadListDTO` (`IndicatorListReadDTO`):
  - `id: UUID`
  - `name: string`
  - `unit: string | null`
  - `norm_text: string | null`
  - `norm_value: string | null`
  - `default_text: string | null`
  - `comment: string | null`
  - `lab_id: UUID | null`
  - `sample_type_id: UUID | null`
  - `created_at: string`
  - `updated_at: string`
  - `lab?: EntityRefDTO | null`
  - `sample_type?: EntityRefDTO | null`

### Protocol types (`src/modules/protocol-types/protocol-types.api.ts`)

- `CreateDTO` (`CreateProtocolTypeDto`):
  - `code?: string | null`
  - `name: string`
- `UpdateDTO` (`UpdateProtocolTypeDto`):
  - `code?: string | null`
  - `name?: string | null`
- `ReadDTO` (`ReadProtocolTypeDTO`):
  - `id: UUID`
  - `code: string | null`
  - `name: string`
  - `created_at: string`
  - `updated_at: string`
- `ReadListDTO` (`ListReadProtocolTypeDTO`):
  - `id: UUID`
  - `code: string | null`
  - `name: string`
  - `created_at: string`
  - `updated_at: string`

### Statuses (`src/modules/statuses/statuses.api.ts`)

- `CreateDTO` (`CreateStatusDto`):
  - `name: string`
- `UpdateDTO` (`UpdateStatusDto`):
  - `name?: string`
- `ReadDTO` (`StatusRecord`):
  - `id: number`
  - `name: string`
  - `createdAt: string | null`
  - `updatedAt: string | null`
  - `deletedAt: string | null`
- `ReadListDTO`: `StatusRecord`

### User types (`src/modules/user-types/user-types.api.ts`)

- `CreateDTO` (`CreateUserTypeDto`):
  - `name: string`
  - `description: string`
- `UpdateDTO` (`UpdateUserTypeDto`):
  - `name?: string`
  - `description?: string`
- `ReadDTO` (`UserTypeRecord`):
  - `id: number`
  - `name: string`
  - `description: string`
  - `createdAt: string | null`
  - `updatedAt: string | null`
  - `deletedAt: string | null`
  - `permissionsSummary?: PermissionSummary`
- `ReadListDTO`: `UserTypeRecord`

## Модули без полного CRUD DTO-набора

### Auth (`src/modules/auth/auth.api.ts`)

- Использует контракты `AuthUser` и `AuthResponse`.
- `CreateDTO/UpdateDTO/ReadListDTO` в CRUD-смысле не применяются.

### Dashboard quick actions (`src/modules/dashboard/dashboard.api.ts`)

- `CreateQuickActionDto`, `UpdateQuickActionDto`, `QuickAction` есть в коде.
- Отдельных `ReadDTO/ReadListDTO` именованных в CRUD-формате нет, список возвращает `ListResponse<QuickAction>`.
- В backend mock quick-actions хранятся по роли (`role_key`), а не по пользователю.

## Важные отличия от backend entities

- Frontend update-обертки используют `PATCH` для CRUD-ресурсов.
- Для части модулей frontend уже в snake_case/UUID-формате, для части используется нормализованный camelCase-контракт.
- Для include-параметров поддерживается передача `params.include`, если endpoint это поддерживает.
