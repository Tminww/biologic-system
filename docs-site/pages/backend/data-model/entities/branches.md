---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `branches` — филиалы

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор филиала.
- `code (text, NULL)` — Краткий код филиала.
- `name (text, NULL)` — Наименование филиала.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

