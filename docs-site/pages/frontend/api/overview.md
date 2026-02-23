# API контракт и интеграция

## API client

Файл: `src/shared/api/client.ts`

Функции:

- строит URL с query params
- в `live` режиме может автоматически конвертировать ключи запроса в `snake_case`
- отправляет запросы с `credentials: 'include'`
- поддерживает JSON и `FormData`
- нормализует ошибки в `ApiError`
- вызывает hooks на `401` и `403`

Для list endpoint'ов frontend отправляет query в формате FastAPI:

- `offset`, `limit`
- `sort_by`, `sort_order` (`asc` | `desc`)
- `global` (если включена расширенная фильтрация)
- `filters` (JSON string, если включена расширенная фильтрация)

Для пагинации в UI общее количество записей берется из `meta.total` list-ответа:

- `useServerTable` сохраняет `response.meta.total` в `total`
- `BaseTable` передает `total` в PrimeVue `DataTable.totalRecords` и `Paginator.totalRecords`

Формат ошибки:

```ts
interface ApiError {
  status: number
  code?: string
  message: string
}
```

## Базовые контракты

Файл: `src/shared/types/api.ts`

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

interface OperationMeta {
  timestamp: string
  request_id: string
  version: string
  operation: string
}

interface CreateResponse<T> {
  data: T
  meta: OperationMeta
}

interface UpdateResponse<T> {
  data: T
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

interface ReadResponse<T> {
  data: T
  meta: ReadMeta
}

interface NamedRef {
  id: number | null
  name: string | null
}
```

Пример ответа `Create`:

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

Пример ответа `ReadList`:

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

Пример ответа одиночного `GET /resource/{id}`:

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

Пример ответа `Update`:

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

## Session-based auth

Auth endpoints:

- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`

Frontend не хранит токен и опирается на backend session cookie.

## Полная backend спецификация

Развернутая спецификация по всем endpoint'ам и маппингам:

- [docs/api-spec.md](../api-spec.md)
- [OpenAPI 3.1 (FastAPI)](./openapi-fastapi.md)
- [Контракты модулей `src/modules/**/*.api.ts`](./modules-contracts.md)
- [Актуальное состояние проекта](../project/current-state.md)

В этом репозитории источником истины для frontend являются:

- `src/modules/**/*.api.ts` (фактические DTO и пути запросов)
- `src/shared/types/api.ts` (envelope-контракты)
- `src/shared/api/client.ts` (нормализация совместимых форматов ответа)

Если backend DTO ведутся в отдельном репозитории, в этой документации фиксируется только согласованный frontend-контракт интеграции.

Включает:

- field mapping legacy -> новый контракт
- список таблиц и API сущностей
- примеры payload/response
- коды ошибок (`401`, `403`, `409`, `422`)

## Ресурсы и права

Resource/action права определены в `src/shared/types/permissions.ts`.

Роуты и API должны быть согласованы по `resource`:

- route meta (`resource`, `action`)
- UI directive `v-permission`
- backend проверка permission

## Рекомендации к live backend

- Держать shape list-ответов неизменным (`items + meta{total,offset,limit,...}`)
- Всегда возвращать ISO даты
- Для optimistic update возвращать поле версии записи в формате текущего модуля (`updatedAt` или `updated_at`)
- Для конфликтов отдавать `409` + `code: STALE_DATA`
- Для валидации отдавать `422`
