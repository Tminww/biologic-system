---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `sample_types`

## Контекст

- ORM-сущность: `SampleType`
- Базовый ресурс API: `/api/v1/sample_types`

## CRUD операции

1. `POST /api/v1/sample_types`
2. `GET /api/v1/sample_types/{id}`
3. `GET /api/v1/sample_types`
4. `PATCH /api/v1/sample_types/{id}`
5. `DELETE /api/v1/sample_types/{id}`

## Create DTO

Модель: `SampleTypeCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |

## Read DTO

Модель: `SampleTypeReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## ListRead DTO

Модель: `SampleTypeListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## Update DTO

Модель: `SampleTypeUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |

## Delete DTO

Модель: `SampleTypeDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `SampleTypeReadEnvelopeDTO`
2. List: `SampleTypeListEnvelopeDTO`
3. Create: `SampleTypeCreateEnvelopeDTO`
4. Update: `SampleTypeUpdateEnvelopeDTO`
5. Delete: `SampleTypeDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `include` не поддерживается для этой сущности

Пример запроса:

- `GET /api/v1/sample_types`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
