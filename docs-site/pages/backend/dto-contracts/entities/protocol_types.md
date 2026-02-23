---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `protocol_types`

## Контекст

- ORM-сущность: `ProtocolType`
- Базовый ресурс API: `/api/v1/protocol_types`

## CRUD операции

1. `POST /api/v1/protocol_types`
2. `GET /api/v1/protocol_types/{id}`
3. `GET /api/v1/protocol_types`
4. `PATCH /api/v1/protocol_types/{id}`
5. `DELETE /api/v1/protocol_types/{id}`

## Create DTO

Модель: `ProtocolTypeCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str` | `yes` |

## Read DTO

Модель: `ProtocolTypeReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str | None` | `no` |
| `name` | `str` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## ListRead DTO

Модель: `ProtocolTypeListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str | None` | `no` |
| `name` | `str` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## Update DTO

Модель: `ProtocolTypeUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |

## Delete DTO

Модель: `ProtocolTypeDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `ProtocolTypeReadEnvelopeDTO`
2. List: `ProtocolTypeListEnvelopeDTO`
3. Create: `ProtocolTypeCreateEnvelopeDTO`
4. Update: `ProtocolTypeUpdateEnvelopeDTO`
5. Delete: `ProtocolTypeDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `include` не поддерживается для этой сущности

Пример запроса:

- `GET /api/v1/protocol_types`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
