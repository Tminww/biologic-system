---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `objects`

## Контекст

- ORM-сущность: `Object`
- Базовый ресурс API: `/api/v1/objects`

## CRUD операции

1. `POST /api/v1/objects`
2. `GET /api/v1/objects/{id}`
3. `GET /api/v1/objects`
4. `PATCH /api/v1/objects/{id}`
5. `DELETE /api/v1/objects/{id}`

## Create DTO

Модель: `ObjectCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `branch_id` | `UUID | None` | `no` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `full_name` | `str | None` | `no` |
| `address` | `str | None` | `no` |

## Read DTO

Модель: `ObjectReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `branch_id` | `UUID | None` | `no` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `full_name` | `str | None` | `no` |
| `address` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `branch` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `ObjectListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `branch_id` | `UUID | None` | `no` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `full_name` | `str | None` | `no` |
| `address` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `branch` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `ObjectUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `branch_id` | `UUID | None` | `no` |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |
| `full_name` | `str | None` | `no` |
| `address` | `str | None` | `no` |

## Delete DTO

Модель: `ObjectDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `ObjectReadEnvelopeDTO`
2. List: `ObjectListEnvelopeDTO`
3. Create: `ObjectCreateEnvelopeDTO`
4. Update: `ObjectUpdateEnvelopeDTO`
5. Delete: `ObjectDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `branch`

Пример запроса:

- `GET /api/v1/objects?include=branch`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
