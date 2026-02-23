---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `user_roles`

## Контекст

- ORM-сущность: `UserRole`
- Базовый ресурс API: `/api/v1/user_roles`

## CRUD операции

1. `POST /api/v1/user_roles`
2. `GET /api/v1/user_roles/{id}`
3. `GET /api/v1/user_roles`
4. `PATCH /api/v1/user_roles/{id}`
5. `DELETE /api/v1/user_roles/{id}`

## Create DTO

Модель: `UserRoleCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `user_id` | `UUID` | `yes` |
| `role_id` | `UUID` | `yes` |

## Read DTO

Модель: `UserRoleReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `user_id` | `UUID` | `yes` |
| `role_id` | `UUID` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `user` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `role` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `UserRoleListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `user_id` | `UUID` | `yes` |
| `role_id` | `UUID` | `yes` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `user` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `role` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `UserRoleUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `user_id` | `UUID | None` | `no` |
| `role_id` | `UUID | None` | `no` |

## Delete DTO

Модель: `UserRoleDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `UserRoleReadEnvelopeDTO`
2. List: `UserRoleListEnvelopeDTO`
3. Create: `UserRoleCreateEnvelopeDTO`
4. Update: `UserRoleUpdateEnvelopeDTO`
5. Delete: `UserRoleDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `user`
- `role`

Пример запроса:

- `GET /api/v1/user_roles?include=user,role`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
