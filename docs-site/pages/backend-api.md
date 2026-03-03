---
icon: lucide/server
tags:
  - Backend
  - API
---

# Канонический backend API

## 1. Базовый контракт

1. Prefix: `/api/v1`
2. Content-Type: `application/json`
3. Auth transport: `HttpOnly` cookies + `credentials: 'include'`
4. Ошибки: `application/problem+json` (RFC 9457)

## 2. CRUD-ресурсы

Канонический CRUD-паттерн:

1. `POST /api/v1/{resource}`
2. `GET /api/v1/{resource}/{id}`
3. `GET /api/v1/{resource}`
4. `PATCH /api/v1/{resource}/{id}`
5. `DELETE /api/v1/{resource}/{id}`

Список ресурсов:

- `branches`
- `change_log`
- `conclusions`
- `direction_statuses`
- `directions`
- `doctors`
- `indicators`
- `labs`
- `objects`
- `permissions`
- `protocol_types`
- `protocols`
- `research`
- `research_goals`
- `research_statuses`
- `role_permissions`
- `roles`
- `sample_statuses`
- `sample_types`
- `samples`
- `test_statuses`
- `tests`
- `user_scopes`
- `users`

## 3. Команды исследований

| Method | Path | Инициатор | Эффект |
| --- | --- | --- | --- |
| POST | `/api/v1/research/{id}/confirm` | НЛ / Доктор | Статус `draft` → `ordered` |
| POST | `/api/v1/research/{id}/start` | Доктор | Статус `ordered` → `in_progress` |
| POST | `/api/v1/research/{id}/reject` | НЛ / Доктор / Регистратор | Статус → `rejected` |

## 4. Матрица frontend route → backend resource

| Frontend route | Backend resource |
| --- | --- |
| `/objects` | `/api/v1/objects` |
| `/directions` | `/api/v1/directions` |
| `/samples` | `/api/v1/samples` |
| `/research` | `/api/v1/research` |
| `/tests` | `/api/v1/tests` |
| `/conclusions` | `/api/v1/conclusions` |
| `/protocols` | `/api/v1/protocols` |
| `/doctors` | `/api/v1/doctors` |
| `/departments` | `/api/v1/branches` |
| `/labs` | `/api/v1/labs` |
| `/research-goals` | `/api/v1/research_goals` |
| `/sample-types` | `/api/v1/sample_types` |
| `/indicators` | `/api/v1/indicators` |
