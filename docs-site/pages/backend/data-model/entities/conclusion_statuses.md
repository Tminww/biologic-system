---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `conclusion_statuses` — статусы заключений

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор статуса заключения.
- `code (text, NULL)` — Техническое обозначение статуса (например: `draft`, `approved`).
- `name (text, NULL)` — Отображаемое наименование статуса.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

