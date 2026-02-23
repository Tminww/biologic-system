---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `users`

## Контекст

- ORM-сущность: `User`
- Базовый ресурс API: `/api/v1/users`

## CRUD операции

1. `POST /api/v1/users`
2. `GET /api/v1/users/{id}`
3. `GET /api/v1/users`
4. `PATCH /api/v1/users/{id}`
5. `DELETE /api/v1/users/{id}`

## Create DTO

Модель: `UserCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `username` | `str` | `yes` |
| `password_hash` | `str` | `yes` |
| `code` | `str | None` | `no` |
| `first_name` | `str | None` | `no` |
| `last_name` | `str | None` | `no` |
| `patronymic` | `str | None` | `no` |
| `is_registrar` | `bool | None` | `no` |
| `is_lab_head` | `bool | None` | `no` |
| `is_branch_head` | `bool | None` | `no` |
| `role_id` | `UUID` | `yes` |
| `lab_id` | `UUID | None` | `no` |

## Read DTO

Модель: `UserReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `username` | `str` | `yes` |
| `code` | `str | None` | `no` |
| `first_name` | `str | None` | `no` |
| `last_name` | `str | None` | `no` |
| `patronymic` | `str | None` | `no` |
| `is_registrar` | `bool | None` | `no` |
| `is_lab_head` | `bool | None` | `no` |
| `is_branch_head` | `bool | None` | `no` |
| `role_id` | `UUID` | `yes` |
| `lab_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `role` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `lab` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `UserListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `username` | `str` | `yes` |
| `code` | `str | None` | `no` |
| `first_name` | `str | None` | `no` |
| `last_name` | `str | None` | `no` |
| `patronymic` | `str | None` | `no` |
| `is_registrar` | `bool | None` | `no` |
| `is_lab_head` | `bool | None` | `no` |
| `is_branch_head` | `bool | None` | `no` |
| `role_id` | `UUID` | `yes` |
| `lab_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `role` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `lab` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `UserUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `username` | `str | None` | `no` |
| `password_hash` | `str | None` | `no` |
| `code` | `str | None` | `no` |
| `first_name` | `str | None` | `no` |
| `last_name` | `str | None` | `no` |
| `patronymic` | `str | None` | `no` |
| `is_registrar` | `bool | None` | `no` |
| `is_lab_head` | `bool | None` | `no` |
| `is_branch_head` | `bool | None` | `no` |
| `role_id` | `UUID | None` | `no` |
| `lab_id` | `UUID | None` | `no` |

## Delete DTO

Модель: `UserDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `UserReadEnvelopeDTO`
2. List: `UserListEnvelopeDTO`
3. Create: `UserCreateEnvelopeDTO`
4. Update: `UserUpdateEnvelopeDTO`
5. Delete: `UserDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `role`
- `lab`

Пример запроса:

- `GET /api/v1/users?include=role,lab`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
