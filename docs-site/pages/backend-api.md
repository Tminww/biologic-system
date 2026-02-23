# Канонический backend API

## 1. Базовый контракт

1. Prefix: `/api/v1`
2. Content-Type: `application/json`
3. Auth transport: `HttpOnly` cookies + `credentials: 'include'`
4. Ошибки: `application/problem+json` (RFC 9457)

## 2. Auth endpoints

| Method | Path | Назначение |
| --- | --- | --- |
| POST | `/api/v1/auth/login` | Логин по `username/password`, установка cookie |
| GET | `/api/v1/auth/me` | Текущий пользователь + permissions |
| POST | `/api/v1/auth/refresh` | Ротация refresh и выдача нового access |
| POST | `/api/v1/auth/logout` | Выход + очистка cookie |

Канон transport-поля логина: `username`.

## 3. CRUD паттерн

Для каждой сущности из `docs/database-entities.md` используется единый набор:

1. `POST /api/v1/{resource}`
2. `GET /api/v1/{resource}/{id}`
3. `GET /api/v1/{resource}`
4. `PATCH /api/v1/{resource}/{id}`
5. `DELETE /api/v1/{resource}/{id}` (soft delete)

`PUT` считается legacy и не является каноническим методом обновления.

### Полный список CRUD-ресурсов

| Resource |
| --- |
| `branches` |
| `change_log` |
| `conclusion_statuses` |
| `conclusions` |
| `directions` |
| `doctors` |
| `indicators` |
| `labs` |
| `objects` |
| `protocol_types` |
| `protocols` |
| `research_goals` |
| `results` |
| `role_permissions` |
| `roles` |
| `sample_targets` |
| `sample_types` |
| `samples` |
| `statuses` |
| `tests` |
| `user_roles` |
| `users` |

## 4. Envelope и meta

### List

```json
{
  "items": [],
  "meta": {
    "timestamp": "2026-02-23T13:00:00Z",
    "request_id": "req-123",
    "version": "v1",
    "total": 0,
    "offset": 0,
    "limit": 15,
    "includes_requested": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### Read one

```json
{
  "data": {},
  "meta": {
    "timestamp": "2026-02-23T13:00:00Z",
    "request_id": "req-123",
    "version": "v1",
    "includes": [],
    "includes_requested": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

Канонический ключ: `includes_requested`.

## 5. Query contract

1. Pagination: `offset`, `limit`
2. Sorting: `sort_by`, `sort_order=asc|desc`
3. Range filters: `{field}_from`, `{field}_to`
4. Include: `include=<relation1,relation2>` (только whitelist из OpenAPI)

## 6. Коды ошибок

1. `401` — неаутентифицированный запрос / невалидные креды.
2. `403` — недостаточно прав.
3. `404` — сущность не найдена.
4. `409` — конфликт версий (`STALE_DATA`).
5. `422` — валидация payload/query/include.

## 7. Матрица соответствия frontend route -> backend resource

| Frontend route | Backend resource |
| --- | --- |
| `/objects` | `/api/v1/objects` |
| `/directions` | `/api/v1/directions` |
| `/samples` | `/api/v1/samples` |
| `/results` | `/api/v1/results` |
| `/tests` | `/api/v1/tests` |
| `/conclusions` | `/api/v1/conclusions` |
| `/protocols` | `/api/v1/protocols` |
| `/doctors` | `/api/v1/doctors` |
| `/departments` | `/api/v1/branches` |
| `/labs` | `/api/v1/labs` |
| `/research-goals` | `/api/v1/research_goals` |
| `/sample-targets` | `/api/v1/sample_targets` |
| `/sample-types` | `/api/v1/sample_types` |
| `/indicators` | `/api/v1/indicators` |
| `/protocol-types` | `/api/v1/protocol_types` |
| `/statuses` | `/api/v1/statuses` |
| `/user-types` | `/api/v1/roles` |
| `/admin/users` | `/api/v1/users` |

## 8. Подробные источники

- `docs/backend/api-guidelines.md`
- `docs/backend/dto-contracts.md`
- `docs/backend/dto-contracts/entities/index.md`
- `docs/frontend/api/modules-contracts.md`
