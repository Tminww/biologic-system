---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `directions`

## Контекст

- ORM-сущность: `Direction`
- Базовый ресурс API: `/api/v1/directions`

## CRUD операции

1. `POST /api/v1/directions`
2. `GET /api/v1/directions/{id}`
3. `GET /api/v1/directions`
4. `PATCH /api/v1/directions/{id}`
5. `DELETE /api/v1/directions/{id}`

## Create DTO

Модель: `DirectionCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `year_no` | `int` | `yes` |
| `base_no` | `int | None` | `no` |
| `is_done` | `bool` | `yes` |
| `is_urgent` | `bool` | `yes` |
| `doctor_id` | `UUID | None` | `no` |
| `object_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `sampled_at` | `datetime | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |

## Read DTO

Модель: `DirectionReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `year_no` | `int` | `yes` |
| `base_no` | `int | None` | `no` |
| `is_done` | `bool` | `yes` |
| `is_urgent` | `bool` | `yes` |
| `doctor_id` | `UUID | None` | `no` |
| `object_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `sampled_at` | `datetime | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `doctor` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `object` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `DirectionListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `year_no` | `int` | `yes` |
| `base_no` | `int | None` | `no` |
| `is_done` | `bool` | `yes` |
| `is_urgent` | `bool` | `yes` |
| `doctor_id` | `UUID | None` | `no` |
| `object_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `sampled_at` | `datetime | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `doctor` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `object` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `DirectionUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `year_no` | `int | None` | `no` |
| `base_no` | `int | None` | `no` |
| `is_done` | `bool | None` | `no` |
| `is_urgent` | `bool | None` | `no` |
| `doctor_id` | `UUID | None` | `no` |
| `object_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `sampled_at` | `datetime | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |

## Delete DTO

Модель: `DirectionDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `DirectionReadEnvelopeDTO`
2. List: `DirectionListEnvelopeDTO`
3. Create: `DirectionCreateEnvelopeDTO`
4. Update: `DirectionUpdateEnvelopeDTO`
5. Delete: `DirectionDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `doctor`
- `object`
- `status`

Пример запроса:

- `GET /api/v1/directions?include=doctor,object`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
