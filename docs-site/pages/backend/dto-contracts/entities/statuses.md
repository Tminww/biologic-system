---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `statuses`

## Контекст

- ORM-сущность: `Status`
- Базовый ресурс API: `/api/v1/statuses`

## CRUD операции

1. `POST /api/v1/statuses`
2. `GET /api/v1/statuses/{id}`
3. `GET /api/v1/statuses`
4. `PATCH /api/v1/statuses/{id}`
5. `DELETE /api/v1/statuses/{id}`

## Create DTO

Модель: `StatusCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str` | `yes` |

## Read DTO

Модель: `StatusReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str | None` | `no` |
| `name` | `str` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## ListRead DTO

Модель: `StatusListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str | None` | `no` |
| `name` | `str` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## Update DTO

Модель: `StatusUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |

## Delete DTO

Модель: `StatusDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `StatusReadEnvelopeDTO`
2. List: `StatusListEnvelopeDTO`
3. Create: `StatusCreateEnvelopeDTO`
4. Update: `StatusUpdateEnvelopeDTO`
5. Delete: `StatusDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `include` не поддерживается для этой сущности

Пример запроса:

- `GET /api/v1/statuses`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
