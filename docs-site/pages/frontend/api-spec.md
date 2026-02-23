# API Spec (Yii2)

## Conventions

- All timestamps are ISO 8601 in UTC.
- Soft delete is represented by `deletedAt` (null means active).
- Reference fields are returned as `{ "id": number|null, "name": string|null }`. Requests use `...Id`.
- Sorting/filtering by nested refs uses dot path, e.g. `status.name`.
- List responses: `{ "items": [ReadDTO], "meta": { "timestamp", "request_id", "version", "total", "offset", "limit", "includes_request", "includes_applied", "includes_allowed" } }`.
- Create responses: `{ "data": ReadDTO, "meta": { "timestamp", "request_id", "version", "operation" } }`.
- Update responses: `{ "data": ReadDTO, "meta": { "timestamp", "request_id", "version", "operation" } }`.
- Single read responses: `{ "data": ReadDTO, "meta": { "timestamp", "request_id", "version", "includes", "includes_requested", "includes_applied", "includes_allowed" } }`.

Envelope reference:

```ts
interface OperationMeta {
  timestamp: string
  request_id: string
  version: string
  operation: string
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
```

## Field Mapping (legacy -> new)

### Auth user (session)
- `username` -> `login` — уникальный логин
- `email` -> `email` — рабочая почта пользователя
- `name` -> `fullName` — отображаемое ФИО
- `role` -> `role` — роль/набор прав
- `status` -> `status` — состояние учетной записи
- `department_id` + `department_name` -> `department` — ссылка на подразделение `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Objects (merged objects + resobjects)
- `name` -> `name` — короткое название объекта
- `name_full` -> `fullName` — полное название объекта
- `adress` -> `address` — адрес объекта
- `status` -> `status` — статус объекта
- `category` -> `category` — категория/тип объекта
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Directions
- `id_year` + `year` -> `year` — ссылка на год `{ id, name }`
- `id_baza` -> `base` — ссылка на базу/участок `{ id, name }`
- `sandoctor_id` -> `doctor` — ответственный врач `{ id, name }`
- `resobject_id` -> `object` — объект исследования `{ id, name }`
- `simple_status` -> `isSimpleStatus` — признак упрощенного статуса
- `urgent` -> `isUrgent` — признак срочности
- `status_id` -> `status` — статус направления `{ id, name }`
- `time_otbor` -> `sampledAt` — время отбора
- `time_in` -> `receivedAt` — время поступления
- `time_out` -> `completedAt` — время завершения
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Samples
- `id_month` + `month` -> `month` — месяц `{ id, name }`
- `napr_id` -> `direction` — ссылка на направление `{ id, name }`
- `obr_type_id` -> `sampleType` — тип образца `{ id, name }`
- `alt_name` -> `alternateName` — альтернативное название
- `target` -> `targetDescription` — описание цели/точки отбора
- `postavka` -> `delivery` — поставка/партия
- `nomencl_cod` -> `nomenclatureCode` — код номенклатуры
- `part_cod` -> `batchCode` — код партии
- `postavshik` -> `supplier` — поставщик
- `urgent` -> `isUrgent` — признак срочности
- `status_id` -> `status` — статус образца `{ id, name }`
- `simple_status` -> `isSimpleStatus` — признак упрощенного статуса
- `protocol_id` -> `protocol` — связанный протокол `{ id, name }`
- `time_in` -> `receivedAt` — время поступления
- `time_out` -> `completedAt` — время завершения
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Sample targets
- `obr_id` -> `sample` — ссылка на образец `{ id, name }`
- `target_id` -> `target` — ссылка на цель `{ id, name }`
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Sample types
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Departments
- `podr_cod` -> `code` — код подразделения
- `name_full` -> `fullName` — полное название
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Indicators
- `obr_type_id` -> `sampleType` — тип образца `{ id, name }`
- `podr_id` -> `department` — подразделение `{ id, name }`
- `edizm` -> `unit` — единица измерения
- `norm` -> `normText` — текстовая норма
- `norm_value` -> `normValue` — значение нормы
- `default_text` -> `defaultText` — шаблон текста результата
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Protocols
- `id_year` + `year` -> `year` — ссылка на год `{ id, name }`
- `zakl_id` -> `conclusion` — ссылка на заключение `{ id, name }`
- `protocol_type_id` -> `protocolType` — тип протокола `{ id, name }`
- `ex_num` -> `sequenceNumber` — порядковый номер
- `simple_status` -> `isSimpleStatus` — признак упрощенного статуса
- `file_vyp_name` -> `fileExportName` — имя экспортного файла
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Protocol types
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Results
- `obr_id` -> `sample` — ссылка на образец `{ id, name }`
- `podr_id` -> `department` — подразделение `{ id, name }`
- `status_id` -> `status` — статус результата `{ id, name }`
- `simple_status` -> `isSimpleStatus` — признак упрощенного статуса
- `recommend` -> `recommendation` — рекомендации
- `time_in` -> `receivedAt` — время поступления
- `time_out` -> `completedAt` — время завершения
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Conclusions
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Doctors
- `name_full` -> `fullName` — полное имя врача
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Research goals
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Tests
- `result_id` -> `result` — ссылка на результат `{ id, name }`
- `pok_id` -> `indicator` — ссылка на показатель `{ id, name }`
- `active` -> `isActive` — признак активности
- `status_id` -> `status` — статус теста `{ id, name }`
- `user_id` -> `createdBy` — кто создал запись `{ id, name }`
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Statuses
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### User types
- `user_rights` -> `description` — описание прав/назначения
- `created` -> `createdAt` — дата создания
- `modified` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления

### Admin users (merged users + users-registry)
- `username` -> `login` — уникальный логин пользователя
- `email` -> `email` — рабочая почта, формируется из логина
- `full_name` -> `fullName` — отображаемое ФИО
- `user_type_id` -> `role` — роль/набор прав
- `reg`/`center`/`lab` -> removed — не отдавать в API списка
- `podr_id` + `department_name` -> `department` — подразделение `{ id, name }`
- `created_at` -> `createdAt` — дата создания
- `updated_at` -> `updatedAt` — дата обновления
- `deleted` -> `deletedAt` — дата мягкого удаления
- `password`/`password_hash`/`auth_key` -> removed — чувствительные поля

## Data Model Layers

### Database entities (tables)
- `users` — id, login, email, password_hash, role_id, status, department_id, created_at, updated_at, deleted_at
- `roles` — id, key, name, created_at, updated_at
- `role_permissions` — role_id, resource, action
- `user_permission_overrides` — user_id, resource, action, allowed, created_at, updated_at
- `departments` — id, code, name, full_name, created_at, updated_at, deleted_at
- `objects` — id, name, full_name, address, status, category, created_at, updated_at, deleted_at
- `directions` — id, year_id, base_id, doctor_id, object_id, status_id, is_simple_status, is_urgent, sampled_at, received_at, completed_at, created_by_id, created_at, updated_at, deleted_at
- `samples` — id, month_id, year, direction_id, sample_type_id, name, alternate_name, target_description, status_id, is_simple_status, is_urgent, received_at, completed_at, created_by_id, created_at, updated_at, deleted_at
- `sample_targets` — id, sample_id, target_id, created_by_id, created_at, updated_at, deleted_at
- `sample_types` — id, name, created_by_id, created_at, updated_at, deleted_at
- `indicators` — id, sample_type_id, department_id, name, unit, norm_text, norm_value, default_text, comment, created_by_id, created_at, updated_at, deleted_at
- `protocols` — id, year_id, conclusion_id, protocol_type_id, sequence_number, is_simple_status, file_name, file_export_name, created_by_id, created_at, updated_at, deleted_at
- `protocol_types` — id, name, created_by_id, created_at, updated_at, deleted_at
- `results` — id, sample_id, department_id, status_id, is_simple_status, comment, recommendation, received_at, completed_at, created_by_id, created_at, updated_at, deleted_at
- `conclusions` — id, name, text, created_by_id, created_at, updated_at, deleted_at
- `doctors` — id, name, full_name, created_by_id, created_at, updated_at, deleted_at
- `research_goals` — id, name, comment, created_by_id, created_at, updated_at, deleted_at
- `tests` — id, result_id, indicator_id, status_id, is_active, value, comment, norm, created_by_id, created_at, updated_at, deleted_at
- `statuses` — id, name, created_at, updated_at, deleted_at
- `user_types` — id, name, description, created_at, updated_at, deleted_at

### API entities (views)
- `AuthUser` — `users` + `departments`, без `password_hash`, с `department` `{ id, name }`
- `AdminUser` — `users` + `departments` + вычисляемый `overridesCount`, с `department` `{ id, name }`
- `Object` — `objects` (или DB view, объединяющий бывшие objects/resobjects)
- `Direction` — `directions`
- `Sample` — `samples`
- `SampleTarget` — `sample_targets`
- `SampleType` — `sample_types`
- `Department` — `departments`
- `Indicator` — `indicators`
- `Protocol` — `protocols`
- `ProtocolType` — `protocol_types`
- `Result` — `results`
- `Conclusion` — `conclusions`
- `Doctor` — `doctors`
- `ResearchGoal` — `research_goals`
- `Test` — `tests`
- `Status` — `statuses`
- `UserType` — `user_types`

### Frontend entities (UI/local)
- `TableFilters` — локальное состояние фильтров таблицы
- `TablePreset` — сохраненные пресеты фильтров (localStorage)
- `CrudDialogState` — режимы create/edit/view и выбранная строка
- `UserFormDraft` — черновик пользователя (в create включает `password`, в edit может быть пустым)
- `PermissionMatrixState` — состояние матрицы разрешений (роль + overrides)

### API entity to DB tables
- `/auth/login`, `/auth/me` -> `users`, `roles`, `role_permissions`, `user_permission_overrides`, `departments`
- `/objects` -> `objects`
- `/directions` -> `directions`
- `/samples` -> `samples`
- `/sample_targets` -> `sample_targets`
- `/sample_types` -> `sample_types`
- `/branches` -> `branches`
- `/indicators` -> `indicators`
- `/protocols` -> `protocols`
- `/protocol_types` -> `protocol_types`
- `/results` -> `results`
- `/conclusions` -> `conclusions`
- `/doctors` -> `doctors`
- `/research_goals` -> `research_goals`
- `/tests` -> `tests`
- `/statuses` -> `statuses`
- `/roles` -> `roles`
- `/users` -> `users`, `departments`, `user_permission_overrides`
- `/users/{id}/permissions` -> `role_permissions`, `user_permission_overrides`, `roles`

## Auth

### POST /auth/login
Request:
```json
{ "username": "admin", "password": "admin123" }
```
Response:
```json
{
  "user": {
    "id": 1,
    "login": "admin",
    "email": "admin@example.com",
    "fullName": "Admin User",
    "role": "admin",
    "status": "active",
    "department": { "id": 3, "name": "Хим." },
    "deletedAt": null
  },
  "permissions": [{ "resource": "objects", "action": "view" }]
}
```

### GET /auth/me
Response:
```json
{
  "user": {
    "id": 1,
    "login": "admin",
    "email": "admin@example.com",
    "fullName": "Admin User",
    "role": "admin",
    "status": "active",
    "department": { "id": 3, "name": "Хим." },
    "deletedAt": null
  },
  "permissions": [{ "resource": "objects", "action": "view" }]
}
```

### POST /auth/logout
Response:
```json
{ "ok": true }
```

## Dashboard

### GET /dashboard/quick-actions
Response:
```json
{
  "items": [
    {
      "id": 1,
      "label": "Создать объект",
      "resource": "objects",
      "action": "create",
      "to": "/objects#create",
      "icon": "pi pi-cog",
      "createdAt": "2024-06-01T10:00:00Z",
      "updatedAt": "2024-06-01T10:00:00Z"
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```
Notes:
- `to` can include hashes like `#create`, `#filters`, or `#filters=My%20Preset` to open dialogs or the filters panel on load.

### POST /dashboard/quick-actions
Request:
```json
{
  "label": "Создать объект",
  "resource": "objects",
  "action": "create",
  "to": "/objects#create",
  "icon": "pi pi-cog"
}
```
Response:
```json
{
  "data": {
    "id": 12,
    "label": "Создать объект",
    "resource": "objects",
    "action": "create",
    "to": "/objects#create",
    "icon": "pi pi-cog",
    "createdAt": "2024-06-01T10:00:00Z",
    "updatedAt": "2024-06-01T10:00:00Z"
  },
  "meta": {
    "timestamp": "2024-06-01T10:00:01Z",
    "request_id": "req_dashboard_create_001",
    "version": "v1",
    "operation": "create"
  }
}
```

### PUT `/dashboard/quick-actions/{id}`
Request:
```json
{
  "label": "Создать объект",
  "resource": "objects",
  "action": "create",
  "to": "/objects#create",
  "icon": "pi pi-cog"
}
```
Response:
```json
{
  "data": {
    "id": 12,
    "label": "Создать объект",
    "resource": "objects",
    "action": "create",
    "to": "/objects#create",
    "icon": "pi pi-cog",
    "createdAt": "2024-06-01T10:00:00Z",
    "updatedAt": "2024-06-01T10:00:00Z"
  },
  "meta": {
    "timestamp": "2024-06-01T10:01:01Z",
    "request_id": "req_dashboard_update_001",
    "version": "v1",
    "operation": "update"
  }
}
```

### DELETE `/dashboard/quick-actions/{id}`
Response:
```json
{ "ok": true }
```

## Objects (combined objects + resobjects)

### GET /objects
Query params:
- offset (0-based)
- limit
- sort_by
- sort_order (`asc` | `desc`)
- global (optional)
- filters (JSON string, optional, если endpoint поддерживает)

Example:
```
/objects?offset=0&limit=10&sort_by=updated_at&sort_order=desc&global=cell&filters={"status":["active"],"updated_at":["2024-01-01","2024-02-01"]}
```

Response:
```json
{
  "items": [
    {
      "id": 1,
      "name": "Объект 1",
      "fullName": "Объект 1 (полное)",
      "status": "active",
      "category": "Bio",
      "address": "ул. Ленина, 1",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-02T00:00:00Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 42,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### POST /objects
Request:
```json
{ "name": "Объект A", "fullName": "Объект A (полное)", "status": "active", "category": "Bio", "address": "ул. Ленина, 1" }
```
Response:
```json
{
  "data": {
    "id": 99,
    "name": "Объект A",
    "fullName": "Объект A (полное)",
    "status": "active",
    "category": "Bio",
    "address": "ул. Ленина, 1",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "deletedAt": null
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:01Z",
    "request_id": "req_objects_create_001",
    "version": "v1",
    "operation": "create"
  }
}
```

### PATCH `/objects/{id}`
Request:
```json
{
  "name": "Объект A",
  "fullName": "Объект A (полное)",
  "status": "archived",
  "category": "Bio",
  "address": "ул. Ленина, 1",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```
Response:
```json
{
  "data": {
    "id": 99,
    "name": "Объект A",
    "fullName": "Объект A (полное)",
    "status": "archived",
    "category": "Bio",
    "address": "ул. Ленина, 1",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-02-01T00:00:00Z",
    "deletedAt": null
  },
  "meta": {
    "timestamp": "2024-02-01T00:00:01Z",
    "request_id": "req_objects_update_001",
    "version": "v1",
    "operation": "update"
  }
}
```

### GET `/objects/{id}`
Query params:
- include (optional, comma separated)

Response:
```json
{
  "data": {
    "id": 99,
    "name": "Объект A",
    "fullName": "Объект A (полное)",
    "status": "archived",
    "category": "Bio",
    "address": "ул. Ленина, 1",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-02-01T00:00:00Z",
    "deletedAt": null
  },
  "meta": {
    "timestamp": "2024-02-01T00:00:02Z",
    "request_id": "req_objects_read_001",
    "version": "v1",
    "includes": [
      "status"
    ],
    "includes_requested": [
      "status",
      "owner"
    ],
    "includes_applied": [
      "status"
    ],
    "includes_allowed": [
      "status",
      "category",
      "owner"
    ]
  }
}
```

### DELETE `/objects/{id}`
Response:
```json
{ "ok": true }
```

## Directory Lists

All list endpoints accept the same query params as `/objects`.

### GET /directions
Response:
```json
{
  "items": [
    {
      "id": 1,
      "year": { "id": 1, "name": "2021" },
      "base": { "id": null, "name": null },
      "doctor": { "id": 4, "name": "Специалист 4" },
      "object": { "id": 4, "name": "Объект 4" },
      "isSimpleStatus": false,
      "isUrgent": false,
      "status": { "id": 3, "name": "В работе" },
      "sampledAt": "2021-03-10T16:57:00Z",
      "receivedAt": "2021-03-10T16:57:00Z",
      "completedAt": null,
      "createdBy": { "id": 33, "name": "User 33" },
      "createdAt": "2021-03-10T16:57:24Z",
      "updatedAt": "2021-03-11T12:24:00Z",
      "deletedAt": "2021-03-12T10:00:00Z"
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /samples
Response:
```json
{
  "items": [
    {
      "id": 1,
      "month": { "id": 1, "name": "3" },
      "year": 2021,
      "direction": { "id": 2, "name": "Направление 2" },
      "sampleType": { "id": 6, "name": "Тип 6" },
      "name": "Смыв № 1 (часы наручные)",
      "alternateName": "",
      "mass": "",
      "targetDescription": "бак,т/б",
      "comment": "Рубежной Акт № 213Д",
      "section": null,
      "delivery": null,
      "nomenclatureCode": null,
      "batchCode": null,
      "supplier": null,
      "isUrgent": true,
      "receivedAt": "2021-03-03T11:51:00Z",
      "completedAt": "2021-03-15T15:30:00Z",
      "status": { "id": 1, "name": "Принят" },
      "isSimpleStatus": true,
      "protocol": { "id": null, "name": null },
      "createdBy": { "id": 33, "name": "User 33" },
      "createdAt": "2021-03-11T11:54:11Z",
      "updatedAt": "2021-05-06T11:12:55Z",
      "deletedAt": "2021-05-07T12:00:00Z"
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /sample_targets
Response:
```json
{
  "items": [
    {
      "id": 1,
      "sample": { "id": 1, "name": "Образец 1" },
      "target": { "id": 2, "name": "Цель 2" },
      "createdBy": { "id": 33, "name": "User 33" },
      "createdAt": "2021-03-11T11:54:11Z",
      "updatedAt": "2021-03-11T11:54:11Z",
      "deletedAt": "2021-03-12T10:00:00Z"
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /sample_types
Response:
```json
{
  "items": [
    {
      "id": 1,
      "name": "продукты",
      "createdBy": { "id": 13, "name": "User 13" },
      "createdAt": null,
      "updatedAt": null,
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /departments
Response:
```json
{
  "items": [
    {
      "id": 3,
      "name": "Хим.",
      "code": "Х",
      "fullName": "3 отд.",
      "createdAt": null,
      "updatedAt": "2020-02-18T13:21:04Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /indicators
Response:
```json
{
  "items": [
    {
      "id": 2,
      "sampleType": { "id": 1, "name": "Тип 1" },
      "department": { "id": 4, "name": "Отдел 4" },
      "name": "Патогенные микроорганизмы (сальмонелла, листерия)",
      "unit": "",
      "normText": "Отсутствие в 25 гр.",
      "normValue": "не обнаружено",
      "defaultText": null,
      "comment": "",
      "createdBy": { "id": null, "name": null },
      "createdAt": "2020-09-24T15:32:21Z",
      "updatedAt": "2021-01-25T15:26:50Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /protocols
Response:
```json
{
  "items": [
    {
      "id": 1,
      "year": { "id": 1, "name": "2021" },
      "conclusion": { "id": 1, "name": "Заключение 1" },
      "protocolType": { "id": 1, "name": "Общий" },
      "sequenceNumber": 1,
      "isSimpleStatus": false,
      "fileName": null,
      "fileExportName": null,
      "createdBy": { "id": 33, "name": "User 33" },
      "createdAt": "2021-03-15T16:07:10Z",
      "updatedAt": "2021-03-15T16:11:08Z",
      "deletedAt": "2021-03-16T10:00:00Z"
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /protocol_types
Response:
```json
{
  "items": [
    {
      "id": 1,
      "name": "Общий",
      "createdBy": { "id": 13, "name": "User 13" },
      "createdAt": null,
      "updatedAt": null,
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /results
Response:
```json
{
  "items": [
    {
      "id": 1,
      "sample": { "id": 1, "name": "Образец 1" },
      "department": { "id": 4, "name": "Отдел 4" },
      "status": { "id": 1, "name": "Принят" },
      "isSimpleStatus": true,
      "comment": "",
      "recommendation": "",
      "receivedAt": "2021-03-03T11:51:00Z",
      "completedAt": "2021-03-15T15:30:00Z",
      "createdBy": { "id": 33, "name": "User 33" },
      "createdAt": "2021-03-11T11:54:11Z",
      "updatedAt": "2021-03-15T15:40:33Z",
      "deletedAt": "2021-03-16T10:00:00Z"
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /conclusions
Response:
```json
{
  "items": [
    {
      "id": 1,
      "name": "продукты",
      "text": "При проведении лабораторных исследований установлено, что вышеуказанные образцы СООТВЕТСТВУЮТ требованиям действующей нормативной документации.",
      "createdBy": { "id": null, "name": null },
      "createdAt": "2011-11-10T00:25:28Z",
      "updatedAt": "2021-01-27T17:26:17Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /doctors
Response:
```json
{
  "items": [
    {
      "id": 4,
      "name": "1",
      "fullName": "1",
      "createdBy": { "id": 13, "name": "User 13" },
      "createdAt": "2011-11-09T15:03:49Z",
      "updatedAt": "2023-08-31T13:10:00Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /research_goals
Response:
```json
{
  "items": [
    {
      "id": 1,
      "name": "полн. ан.",
      "comment": "",
      "createdBy": { "id": null, "name": null },
      "createdAt": "2021-01-21T16:39:44Z",
      "updatedAt": "2021-01-21T16:44:29Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /tests
Response:
```json
{
  "items": [
    {
      "id": 1,
      "result": { "id": 20, "name": "Результат 20" },
      "indicator": { "id": 76, "name": "Показатель 76" },
      "isActive": true,
      "value": "",
      "comment": "",
      "norm": "",
      "status": { "id": 1, "name": "Соответствует" },
      "createdBy": { "id": null, "name": null },
      "createdAt": "2021-03-12T13:58:49Z",
      "updatedAt": "2021-03-12T13:59:45Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /statuses
Response:
```json
{
  "items": [
    {
      "id": 1,
      "name": "соответствует",
      "createdAt": "2011-04-11T16:58:55Z",
      "updatedAt": "2011-04-11T16:58:55Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /user-types
Response:
```json
{
  "items": [
    {
      "id": 2,
      "name": "администратор",
      "description": "администрирование системы",
      "permissionsSummary": {
        "view": 14,
        "create": 12,
        "edit": 12,
        "delete": 10
      },
      "createdAt": "2011-04-06T13:25:52Z",
      "updatedAt": "2011-04-06T13:25:52Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### GET /user-types/{id}/permissions
Response:
```json
{
  "data": {
    "permissions": [
      { "resource": "dashboard", "action": "view" },
      { "resource": "objects", "action": "edit" }
    ]
  },
  "meta": {
    "timestamp": "2024-06-01T10:02:00Z",
    "request_id": "req_user_types_permissions_read_001",
    "version": "v1",
    "includes": [],
    "includes_requested": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### PUT /user-types/{id}/permissions
Request:
```json
{
  "permissions": [
    { "resource": "dashboard", "action": "view" },
    { "resource": "objects", "action": "edit" }
  ]
}
```

## Users

### GET /users
Same query params and response shape as /objects.
Each user includes `overridesCount` to show how many permission overrides exist.

Response:
```json
{
  "items": [
    {
      "id": 13,
      "login": "grin",
      "email": "grin@example.com",
      "fullName": "Ivanov",
      "role": "admin",
      "status": "active",
      "department": { "id": 3, "name": "Хим." },
      "overridesCount": 2,
      "createdAt": "2020-09-18T11:31:24Z",
      "updatedAt": "2023-07-25T08:49:57Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "timestamp": "2024-06-01T10:00:00Z",
    "request_id": "req_list_example_001",
    "version": "v1",
    "total": 1,
    "offset": 0,
    "limit": 10,
    "includes_request": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### POST /users
Request:
```json
{
  "login": "newuser",
  "password": "secret123",
  "fullName": "New User",
  "role": "viewer",
  "status": "active",
  "departmentId": 3
}
```
Response:
```json
{
  "data": {
    "id": 101,
    "login": "newuser",
    "email": "newuser@example.com",
    "fullName": "New User",
    "role": "viewer",
    "status": "active",
    "department": { "id": 3, "name": "Хим." },
    "overridesCount": 0,
    "createdAt": "2024-06-01T10:00:00Z",
    "updatedAt": "2024-06-01T10:00:00Z",
    "deletedAt": null
  },
  "meta": {
    "timestamp": "2024-06-01T10:00:01Z",
    "request_id": "req_admin_users_create_001",
    "version": "v1",
    "operation": "create"
  }
}
```

### PATCH `/users/{id}`
Request:
```json
{ "fullName": "Updated User", "role": "manager", "status": "inactive", "departmentId": 3 }
```
Response:
```json
{
  "data": {
    "id": 101,
    "login": "newuser",
    "email": "newuser@example.com",
    "fullName": "Updated User",
    "role": "manager",
    "status": "inactive",
    "department": { "id": 3, "name": "Хим." },
    "overridesCount": 0,
    "createdAt": "2024-06-01T10:00:00Z",
    "updatedAt": "2024-06-01T10:05:00Z",
    "deletedAt": null
  },
  "meta": {
    "timestamp": "2024-06-01T10:05:01Z",
    "request_id": "req_admin_users_update_001",
    "version": "v1",
    "operation": "update"
  }
}
```

### DELETE `/users/{id}`
Response:
```json
{ "ok": true }
```

### GET /users/{id}/permissions
Response:
```json
{
  "data": {
    "rolePermissions": [{ "resource": "objects", "action": "view" }],
    "overrides": [{ "resource": "objects", "action": "delete", "allowed": false }]
  },
  "meta": {
    "timestamp": "2024-06-01T10:06:00Z",
    "request_id": "req_admin_users_permissions_read_001",
    "version": "v1",
    "includes": [],
    "includes_requested": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### PUT /users/{id}/permissions
Request:
```json
{ "overrides": [{ "resource": "objects", "action": "delete", "allowed": false }] }
```

## Errors
- 401 UNAUTHORIZED
- 403 FORBIDDEN
- 409 STALE_DATA
- 422 VALIDATION_ERROR
