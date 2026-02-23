# OpenAPI 3.1 (FastAPI)

Frontend интегрируется с backend-контрактом FastAPI в формате OpenAPI 3.1.

Базовые настройки:

```yaml
openapi: 3.1.0
info:
  title: Biologic System Backend API
  version: 0.1.0
servers:
  - url: http://localhost:8080
```

Базовый префикс API:

- `/api/v1`

## Формат list-запросов

Для каталогов и списков frontend должен отправлять:

- `offset` (>= 0)
- `limit` (1..500)
- `sort_by` (string, например `created_at`)
- `sort_order` (`asc` | `desc`)
- `include` (опционально)
- `filters` (JSON string, только если endpoint поддерживает расширенную фильтрацию)

Пример:

```bash
curl "http://localhost:8080/api/v1/directions?offset=0&limit=15&sort_by=created_at&sort_order=desc"
```

## Auth endpoints

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

`/auth/login` ожидает payload:

```json
{ "username": "admin", "password": "admin123" }
```

## CRUD endpoints, используемые фронтендом

- `/api/v1/directions`
- `/api/v1/samples`
- `/api/v1/sample_targets`
- `/api/v1/sample_types`
- `/api/v1/objects`
- `/api/v1/statuses`
- `/api/v1/doctors`
- `/api/v1/labs`
- `/api/v1/indicators`
- `/api/v1/protocols`
- `/api/v1/protocol_types`
- `/api/v1/results`
- `/api/v1/conclusions`
- `/api/v1/conclusion_statuses`
- `/api/v1/research_goals`
- `/api/v1/tests`
- `/api/v1/users`
- `/api/v1/roles`
- `/api/v1/role_permissions`
- `/api/v1/user_roles`

Для update операций backend использует `PATCH`.

## Ограничение текущего backend-контракта

В актуальном OpenAPI backend нет endpoint'а `GET/PUT /api/v1/users/{id}/permissions`.

- frontend-модуль матрицы override-прав использует этот endpoint как расширение
- если backend его не реализует, вкладка индивидуальных overrides должна считаться недоступной

## Важные правила совместимости

- `sort_order` отправляется только как `asc` или `desc`
- ключи query/body в live-режиме автоматически конвертируются в `snake_case` в `src/shared/api/client.ts`
- в URL обязательно используется префикс `/api/v1`
- если backend не поддерживает `filters/global`, оставляйте `VITE_API_SUPPORTS_FILTERS=false`
