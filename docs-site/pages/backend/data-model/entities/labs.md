---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `labs` — лаборатории

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор лаборатории.
- `branch_id (uuid, NULL)` — Филиал, к которому относится лаборатория.
- `code (text, NOT NULL)` — Краткий код лаборатории.
- `name (text, NOT NULL)` — Краткое наименование лаборатории.
- `full_name (text, NULL)` — Полное наименование лаборатории.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

