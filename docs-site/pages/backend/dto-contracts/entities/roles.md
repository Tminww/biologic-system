---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `roles`

## Контекст

- ORM-сущность: `Role`
- Базовый ресурс API: `/api/v1/roles`

## CRUD операции

1. `POST /api/v1/roles`
2. `GET /api/v1/roles/{id}`
3. `GET /api/v1/roles`
4. `PATCH /api/v1/roles/{id}`
5. `DELETE /api/v1/roles/{id}`

## Create DTO

Модель: `RoleCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `key` | `str` | `yes` |
| `name` | `str` | `yes` |

## Read DTO

Модель: `RoleReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `key` | `str` | `yes` |
| `name` | `str` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## ListRead DTO

Модель: `RoleListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `key` | `str` | `yes` |
| `name` | `str` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## Update DTO

Модель: `RoleUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `key` | `str | None` | `no` |
| `name` | `str | None` | `no` |

## Delete DTO

Модель: `RoleDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `RoleReadEnvelopeDTO`
2. List: `RoleListEnvelopeDTO`
3. Create: `RoleCreateEnvelopeDTO`
4. Update: `RoleUpdateEnvelopeDTO`
5. Delete: `RoleDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `include` не поддерживается для этой сущности

Пример запроса:

- `GET /api/v1/roles`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
