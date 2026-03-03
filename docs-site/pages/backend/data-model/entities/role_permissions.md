---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `role_permissions` — права ролей

## Поля

- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор назначения разрешения роли.
- `role_id (uuid, NOT NULL)` — Роль, которой назначено разрешение.
- `permission_id (uuid, NOT NULL)` — Разрешение из таблицы `permissions`.

## Ограничения

1. `UNIQUE (role_id, permission_id)`.
