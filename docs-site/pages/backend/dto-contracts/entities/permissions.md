---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `permissions`

## Контекст

- ORM-сущность: `Permission`
- Базовый ресурс API: `/api/v1/permissions`

## CRUD операции

1. `POST /api/v1/permissions`
2. `GET /api/v1/permissions/{id}`
3. `GET /api/v1/permissions`
4. `PATCH /api/v1/permissions/{id}`
5. `DELETE /api/v1/permissions/{id}`

## Create DTO

Модель: `PermissionCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `resource` | `str` | `yes` |
| `action` | `str` | `yes` |

## Read DTO

Модель: `PermissionReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `resource` | `str` | `yes` |
| `action` | `str` | `yes` |

## ListRead DTO

Модель: `PermissionListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `resource` | `str` | `yes` |
| `action` | `str` | `yes` |

## Update DTO

Модель: `PermissionUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `resource` | `str | None` | `no` |
| `action` | `str | None` | `no` |

## Delete DTO

Модель: `PermissionDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `PermissionReadEnvelopeDTO`
2. List: `PermissionListEnvelopeDTO`
3. Create: `PermissionCreateEnvelopeDTO`
4. Update: `PermissionUpdateEnvelopeDTO`
5. Delete: `PermissionDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `include` не поддерживается для этой сущности

