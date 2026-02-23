---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `role_permissions` — права ролей

## Поля


- `role_id (uuid, NOT NULL, PK part)` — Роль, которой назначено разрешение.
- `resource (text, NOT NULL, PK part)` — Ресурс (сущность или раздел), к которому применяется разрешение.
- `action (text, NOT NULL, PK part)` — Действие над ресурсом (например: `read`, `create`, `update`, `delete`).
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

