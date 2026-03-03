---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `user_scopes` — области видимости пользователя

## Поля

- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор привязки.
- `user_id (uuid, NOT NULL)` — Пользователь, для которого задана область.
- `scope_id (uuid, NULL)` — Область доступа. `NULL` означает «вся область» для роли с ограниченным scope.

## Ограничения

1. `UNIQUE (user_id, scope_id)`.
2. Рекомендуется дополнительный partial unique индекс: `UNIQUE (user_id) WHERE scope_id IS NULL`.

## Примечания

`scope_id` используется как полиморфная ссылка на `branches.id`, `labs.id` или `objects.id`
в зависимости от `roles.scope_type` пользователя.

