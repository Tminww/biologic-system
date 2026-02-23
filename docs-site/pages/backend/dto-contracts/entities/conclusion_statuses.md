---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `conclusion_statuses`

## Контекст

- ORM-сущность: `ConclusionStatus`
- Базовый ресурс API: `/api/v1/conclusion_statuses`

## CRUD операции

1. `POST /api/v1/conclusion_statuses`
2. `GET /api/v1/conclusion_statuses/{id}`
3. `GET /api/v1/conclusion_statuses`
4. `PATCH /api/v1/conclusion_statuses/{id}`
5. `DELETE /api/v1/conclusion_statuses/{id}`

## Create DTO

Модель: `ConclusionStatusCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |

## Read DTO

Модель: `ConclusionStatusReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## ListRead DTO

Модель: `ConclusionStatusListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## Update DTO

Модель: `ConclusionStatusUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |

## Delete DTO

Модель: `ConclusionStatusDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `ConclusionStatusReadEnvelopeDTO`
2. List: `ConclusionStatusListEnvelopeDTO`
3. Create: `ConclusionStatusCreateEnvelopeDTO`
4. Update: `ConclusionStatusUpdateEnvelopeDTO`
5. Delete: `ConclusionStatusDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `include` не поддерживается для этой сущности

Пример запроса:

- `GET /api/v1/conclusion_statuses`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
