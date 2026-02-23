---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `objects` — объекты-источники направлений

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор объекта.
- `branch_id (uuid, NULL)` — Филиал, к которому относится объект.
- `code (text, NOT NULL)` — Краткий код объекта.
- `name (text, NOT NULL)` — Краткое наименование объекта.
- `full_name (text, NULL)` — Полное наименование объекта.
- `address (text, NULL)` — Адрес объекта.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

