---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `change_log`

## Контекст

- ORM-сущность: `ChangeLog`
- Базовый ресурс API: `/api/v1/change_log`

## CRUD операции

1. `POST /api/v1/change_log`
2. `GET /api/v1/change_log/{id}`
3. `GET /api/v1/change_log`
4. `PATCH /api/v1/change_log/{id}`
5. `DELETE /api/v1/change_log/{id}`

## Create DTO

Модель: `ChangeLogCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `branch_id` | `UUID | None` | `no` |
| `entity_type` | `str | None` | `no` |
| `entity_id` | `UUID | None` | `no` |
| `action` | `str | None` | `no` |
| `actor_id` | `UUID | None` | `no` |
| `actor_name` | `str | None` | `no` |
| `snapshot` | `dict[str, Any] | None` | `no` |
| `diff` | `dict[str, Any] | None` | `no` |

## Read DTO

Модель: `ChangeLogReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `branch_id` | `UUID | None` | `no` |
| `entity_type` | `str | None` | `no` |
| `entity_id` | `UUID | None` | `no` |
| `action` | `str | None` | `no` |
| `actor_id` | `UUID | None` | `no` |
| `actor_name` | `str | None` | `no` |
| `snapshot` | `dict[str, Any] | None` | `no` |
| `diff` | `dict[str, Any] | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `branch` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `entity` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `actor` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `ChangeLogListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `branch_id` | `UUID | None` | `no` |
| `entity_type` | `str | None` | `no` |
| `entity_id` | `UUID | None` | `no` |
| `action` | `str | None` | `no` |
| `actor_id` | `UUID | None` | `no` |
| `actor_name` | `str | None` | `no` |
| `snapshot` | `dict[str, Any] | None` | `no` |
| `diff` | `dict[str, Any] | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `branch` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `entity` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `actor` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `ChangeLogUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `branch_id` | `UUID | None` | `no` |
| `entity_type` | `str | None` | `no` |
| `entity_id` | `UUID | None` | `no` |
| `action` | `str | None` | `no` |
| `actor_id` | `UUID | None` | `no` |
| `actor_name` | `str | None` | `no` |
| `snapshot` | `dict[str, Any] | None` | `no` |
| `diff` | `dict[str, Any] | None` | `no` |

## Delete DTO

Модель: `ChangeLogDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `ChangeLogReadEnvelopeDTO`
2. List: `ChangeLogListEnvelopeDTO`
3. Create: `ChangeLogCreateEnvelopeDTO`
4. Update: `ChangeLogUpdateEnvelopeDTO`
5. Delete: `ChangeLogDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `branch`
- `entity`
- `actor`

Пример запроса:

- `GET /api/v1/change_log?include=branch,entity`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
