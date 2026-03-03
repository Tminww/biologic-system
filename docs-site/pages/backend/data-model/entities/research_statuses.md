---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `research_statuses` — статусы исследований

## Поля

- `id (uuid, DEFAULT uuidv7())` — Идентификатор.
- `code (text, NULL)` — Технический код статуса.
- `name (text, NOT NULL)` — Наименование статуса.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Время создания.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Время обновления.
- `deleted_at (timestamptz, NULL)` — Мягкое удаление.
