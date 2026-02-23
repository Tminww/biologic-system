---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `branches`

## Контекст

- ORM-сущность: `Branch`
- Базовый ресурс API: `/api/v1/branches`

## CRUD операции

1. `POST /api/v1/branches`
2. `GET /api/v1/branches/{id}`
3. `GET /api/v1/branches`
4. `PATCH /api/v1/branches/{id}`
5. `DELETE /api/v1/branches/{id}`

## Create DTO

Модель: `BranchCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |

## Read DTO

Модель: `BranchReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## ListRead DTO

Модель: `BranchListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |

## Update DTO

Модель: `BranchUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |

## Delete DTO

Модель: `BranchDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `BranchReadEnvelopeDTO`
2. List: `BranchListEnvelopeDTO`
3. Create: `BranchCreateEnvelopeDTO`
4. Update: `BranchUpdateEnvelopeDTO`
5. Delete: `BranchDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `include` не поддерживается для этой сущности

Пример запроса:

- `GET /api/v1/branches`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
