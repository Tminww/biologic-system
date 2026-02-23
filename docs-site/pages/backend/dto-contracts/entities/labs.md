---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `labs`

## Контекст

- ORM-сущность: `Lab`
- Базовый ресурс API: `/api/v1/labs`

## CRUD операции

1. `POST /api/v1/labs`
2. `GET /api/v1/labs/{id}`
3. `GET /api/v1/labs`
4. `PATCH /api/v1/labs/{id}`
5. `DELETE /api/v1/labs/{id}`

## Create DTO

Модель: `LabCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `branch_id` | `UUID | None` | `no` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `full_name` | `str | None` | `no` |

## Read DTO

Модель: `LabReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `branch_id` | `UUID | None` | `no` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `full_name` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `branch` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `LabListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `branch_id` | `UUID | None` | `no` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `full_name` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `branch` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `LabUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `branch_id` | `UUID | None` | `no` |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |
| `full_name` | `str | None` | `no` |

## Delete DTO

Модель: `LabDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `LabReadEnvelopeDTO`
2. List: `LabListEnvelopeDTO`
3. Create: `LabCreateEnvelopeDTO`
4. Update: `LabUpdateEnvelopeDTO`
5. Delete: `LabDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `branch`

Пример запроса:

- `GET /api/v1/labs?include=branch`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
