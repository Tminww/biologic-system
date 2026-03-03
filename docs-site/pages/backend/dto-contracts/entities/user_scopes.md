---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `user_scopes`

## Контекст

- ORM-сущность: `UserScope`
- Базовый ресурс API: `/api/v1/user_scopes`

## CRUD операции

1. `POST /api/v1/user_scopes`
2. `GET /api/v1/user_scopes/{id}`
3. `GET /api/v1/user_scopes`
4. `PATCH /api/v1/user_scopes/{id}`
5. `DELETE /api/v1/user_scopes/{id}`

## Create DTO

Модель: `UserScopeCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `user_id` | `UUID` | `yes` |
| `scope_id` | `UUID | None` | `no` |

## Read DTO

Модель: `UserScopeReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `user_id` | `UUID` | `yes` |
| `scope_id` | `UUID | None` | `no` |
| `user` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `UserScopeListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `user_id` | `UUID` | `yes` |
| `scope_id` | `UUID | None` | `no` |
| `user` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `UserScopeUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `user_id` | `UUID | None` | `no` |
| `scope_id` | `UUID | None` | `no` |

## Delete DTO

Модель: `UserScopeDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `UserScopeReadEnvelopeDTO`
2. List: `UserScopeListEnvelopeDTO`
3. Create: `UserScopeCreateEnvelopeDTO`
4. Update: `UserScopeUpdateEnvelopeDTO`
5. Delete: `UserScopeDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `user`

Пример запроса:

- `GET /api/v1/user_scopes?include=user`

