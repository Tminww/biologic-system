---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `statuses` — статусы процесса

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор статуса.
- `code (text, NULL)` — Техническое обозначение статуса (например: `in_progress`, `done`).
- `name (text, NOT NULL)` — Отображаемое наименование статуса.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

