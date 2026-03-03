---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `role_permissions`

## Контекст

- ORM-сущность: `RolePermission`
- Базовый ресурс API: `/api/v1/role_permissions`

## CRUD операции

1. `POST /api/v1/role_permissions`
2. `GET /api/v1/role_permissions/{id}`
3. `GET /api/v1/role_permissions`
4. `PATCH /api/v1/role_permissions/{id}`
5. `DELETE /api/v1/role_permissions/{id}`

## Create DTO

Модель: `RolePermissionCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `role_id` | `UUID` | `yes` |
| `permission_id` | `UUID` | `yes` |

## Read DTO

Модель: `RolePermissionReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `role_id` | `UUID` | `yes` |
| `permission_id` | `UUID` | `yes` |
| `role` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `permission` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `RolePermissionListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `role_id` | `UUID` | `yes` |
| `permission_id` | `UUID` | `yes` |
| `role` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `permission` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `RolePermissionUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `role_id` | `UUID | None` | `no` |
| `permission_id` | `UUID | None` | `no` |

## Delete DTO

Модель: `RolePermissionDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `RolePermissionReadEnvelopeDTO`
2. List: `RolePermissionListEnvelopeDTO`
3. Create: `RolePermissionCreateEnvelopeDTO`
4. Update: `RolePermissionUpdateEnvelopeDTO`
5. Delete: `RolePermissionDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `role`
- `permission`

Пример запроса:

- `GET /api/v1/role_permissions?include=role,permission`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
