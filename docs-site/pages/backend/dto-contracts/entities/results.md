---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `results`

## Контекст

- ORM-сущность: `Result`
- Базовый ресурс API: `/api/v1/results`

## CRUD операции

1. `POST /api/v1/results`
2. `GET /api/v1/results/{id}`
3. `GET /api/v1/results`
4. `PATCH /api/v1/results/{id}`
5. `DELETE /api/v1/results/{id}`

## Create DTO

Модель: `ResultCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `comment` | `str | None` | `no` |
| `recommendation` | `str | None` | `no` |
| `is_done` | `bool` | `yes` |
| `lab_id` | `UUID | None` | `no` |
| `sample_id` | `UUID` | `yes` |
| `status_id` | `UUID | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |

## Read DTO

Модель: `ResultReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `comment` | `str | None` | `no` |
| `recommendation` | `str | None` | `no` |
| `is_done` | `bool` | `yes` |
| `lab_id` | `UUID | None` | `no` |
| `sample_id` | `UUID` | `yes` |
| `status_id` | `UUID | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `lab` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `sample` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `ResultListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `comment` | `str | None` | `no` |
| `recommendation` | `str | None` | `no` |
| `is_done` | `bool` | `yes` |
| `lab_id` | `UUID | None` | `no` |
| `sample_id` | `UUID` | `yes` |
| `status_id` | `UUID | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `lab` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `sample` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `ResultUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `comment` | `str | None` | `no` |
| `recommendation` | `str | None` | `no` |
| `is_done` | `bool | None` | `no` |
| `lab_id` | `UUID | None` | `no` |
| `sample_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |

## Delete DTO

Модель: `ResultDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `ResultReadEnvelopeDTO`
2. List: `ResultListEnvelopeDTO`
3. Create: `ResultCreateEnvelopeDTO`
4. Update: `ResultUpdateEnvelopeDTO`
5. Delete: `ResultDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `lab`
- `sample`
- `status`

Пример запроса:

- `GET /api/v1/results?include=lab,sample`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
