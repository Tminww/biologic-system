---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `sample_types` — типы проб

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор типа пробы.
- `code (text, NOT NULL)` — Краткий код типа пробы.
- `name (text, NOT NULL)` — Наименование типа пробы.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

