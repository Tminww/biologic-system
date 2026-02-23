---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `doctors`

## Контекст

- ORM-сущность: `Doctor`
- Базовый ресурс API: `/api/v1/doctors`

## CRUD операции

1. `POST /api/v1/doctors`
2. `GET /api/v1/doctors/{id}`
3. `GET /api/v1/doctors`
4. `PATCH /api/v1/doctors/{id}`
5. `DELETE /api/v1/doctors/{id}`

## Create DTO

Модель: `DoctorCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `first_name` | `str` | `yes` |
| `last_name` | `str | None` | `no` |
| `patronymic` | `str | None` | `no` |

## Read DTO

Модель: `DoctorReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `first_name` | `str` | `yes` |
| `last_name` | `str | None` | `no` |
| `patronymic` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## ListRead DTO

Модель: `DoctorListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `first_name` | `str` | `yes` |
| `last_name` | `str | None` | `no` |
| `patronymic` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## Update DTO

Модель: `DoctorUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `first_name` | `str | None` | `no` |
| `last_name` | `str | None` | `no` |
| `patronymic` | `str | None` | `no` |

## Delete DTO

Модель: `DoctorDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `DoctorReadEnvelopeDTO`
2. List: `DoctorListEnvelopeDTO`
3. Create: `DoctorCreateEnvelopeDTO`
4. Update: `DoctorUpdateEnvelopeDTO`
5. Delete: `DoctorDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `include` не поддерживается для этой сущности

Пример запроса:

- `GET /api/v1/doctors`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
