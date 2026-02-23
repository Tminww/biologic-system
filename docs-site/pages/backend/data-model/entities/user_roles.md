---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `user_roles` — назначения ролей пользователям

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор назначения роли.
- `user_id (uuid, NOT NULL)` — Пользователь, которому назначена роль.
- `role_id (uuid, NOT NULL)` — Назначенная роль.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

