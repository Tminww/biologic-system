---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `tests`

## Контекст

- ORM-сущность: `Test`
- Базовый ресурс API: `/api/v1/tests`

## CRUD операции

1. `POST /api/v1/tests`
2. `GET /api/v1/tests/{id}`
3. `GET /api/v1/tests`
4. `PATCH /api/v1/tests/{id}`
5. `DELETE /api/v1/tests/{id}`

## Create DTO

Модель: `TestCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `value` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `norm` | `str | None` | `no` |
| `is_active` | `bool` | `yes` |
| `result_id` | `UUID` | `yes` |
| `indicator_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |

## Read DTO

Модель: `TestReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `value` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `norm` | `str | None` | `no` |
| `is_active` | `bool` | `yes` |
| `result_id` | `UUID` | `yes` |
| `indicator_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `result` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `indicator` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `TestListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `value` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `norm` | `str | None` | `no` |
| `is_active` | `bool` | `yes` |
| `result_id` | `UUID` | `yes` |
| `indicator_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `result` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `indicator` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `TestUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `value` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `norm` | `str | None` | `no` |
| `is_active` | `bool | None` | `no` |
| `result_id` | `UUID | None` | `no` |
| `indicator_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |

## Delete DTO

Модель: `TestDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `TestReadEnvelopeDTO`
2. List: `TestListEnvelopeDTO`
3. Create: `TestCreateEnvelopeDTO`
4. Update: `TestUpdateEnvelopeDTO`
5. Delete: `TestDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `result`
- `indicator`
- `status`

Пример запроса:

- `GET /api/v1/tests?include=result,indicator`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
