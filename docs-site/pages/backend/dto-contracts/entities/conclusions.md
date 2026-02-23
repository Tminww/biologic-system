---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `conclusions`

## Контекст

- ORM-сущность: `Conclusion`
- Базовый ресурс API: `/api/v1/conclusions`

## CRUD операции

1. `POST /api/v1/conclusions`
2. `GET /api/v1/conclusions/{id}`
3. `GET /api/v1/conclusions`
4. `PATCH /api/v1/conclusions/{id}`
5. `DELETE /api/v1/conclusions/{id}`

## Create DTO

Модель: `ConclusionCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `comment` | `str | None` | `no` |
| `conclusion_status_id` | `UUID` | `yes` |

## Read DTO

Модель: `ConclusionReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `comment` | `str | None` | `no` |
| `conclusion_status_id` | `UUID` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `conclusion_status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `ConclusionListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `comment` | `str | None` | `no` |
| `conclusion_status_id` | `UUID` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `conclusion_status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `ConclusionUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `comment` | `str | None` | `no` |
| `conclusion_status_id` | `UUID | None` | `no` |

## Delete DTO

Модель: `ConclusionDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `ConclusionReadEnvelopeDTO`
2. List: `ConclusionListEnvelopeDTO`
3. Create: `ConclusionCreateEnvelopeDTO`
4. Update: `ConclusionUpdateEnvelopeDTO`
5. Delete: `ConclusionDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `conclusion_status`

Пример запроса:

- `GET /api/v1/conclusions?include=conclusion_status`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
