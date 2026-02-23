---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `protocols`

## Контекст

- ORM-сущность: `Protocol`
- Базовый ресурс API: `/api/v1/protocols`

## CRUD операции

1. `POST /api/v1/protocols`
2. `GET /api/v1/protocols/{id}`
3. `GET /api/v1/protocols`
4. `PATCH /api/v1/protocols/{id}`
5. `DELETE /api/v1/protocols/{id}`

## Create DTO

Модель: `ProtocolCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `year_no` | `int` | `yes` |
| `copies` | `int | None` | `no` |
| `is_signed` | `bool` | `yes` |
| `protocol_copy_name` | `str | None` | `no` |
| `excerpt_copy_name` | `str | None` | `no` |
| `conclusion_id` | `UUID | None` | `no` |
| `protocol_type_id` | `UUID | None` | `no` |
| `issued_at` | `datetime | None` | `no` |

## Read DTO

Модель: `ProtocolReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `year_no` | `int` | `yes` |
| `copies` | `int | None` | `no` |
| `is_signed` | `bool` | `yes` |
| `protocol_copy_name` | `str | None` | `no` |
| `excerpt_copy_name` | `str | None` | `no` |
| `conclusion_id` | `UUID | None` | `no` |
| `protocol_type_id` | `UUID | None` | `no` |
| `issued_at` | `datetime | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `conclusion` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `protocol_type` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `ProtocolListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `year_no` | `int` | `yes` |
| `copies` | `int | None` | `no` |
| `is_signed` | `bool` | `yes` |
| `protocol_copy_name` | `str | None` | `no` |
| `excerpt_copy_name` | `str | None` | `no` |
| `conclusion_id` | `UUID | None` | `no` |
| `protocol_type_id` | `UUID | None` | `no` |
| `issued_at` | `datetime | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `conclusion` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `protocol_type` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `ProtocolUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `year_no` | `int | None` | `no` |
| `copies` | `int | None` | `no` |
| `is_signed` | `bool | None` | `no` |
| `protocol_copy_name` | `str | None` | `no` |
| `excerpt_copy_name` | `str | None` | `no` |
| `conclusion_id` | `UUID | None` | `no` |
| `protocol_type_id` | `UUID | None` | `no` |
| `issued_at` | `datetime | None` | `no` |

## Delete DTO

Модель: `ProtocolDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `ProtocolReadEnvelopeDTO`
2. List: `ProtocolListEnvelopeDTO`
3. Create: `ProtocolCreateEnvelopeDTO`
4. Update: `ProtocolUpdateEnvelopeDTO`
5. Delete: `ProtocolDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `conclusion`
- `protocol_type`

Пример запроса:

- `GET /api/v1/protocols?include=conclusion,protocol_type`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
