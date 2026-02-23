---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `roles` — роли

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор роли.
- `key (text, NOT NULL)` — Техническое обозначение роли (например: `admin`, `lab_operator`).
- `name (text, NOT NULL)` — Отображаемое наименование роли.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.

