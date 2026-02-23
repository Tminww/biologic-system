---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `protocol_types` — типы протоколов

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор типа протокола.
- `code (text, NULL)` — Техническое обозначение типа протокола.
- `name (text, NOT NULL)` — Наименование типа протокола.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

