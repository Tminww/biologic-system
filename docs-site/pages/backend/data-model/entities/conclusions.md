---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `conclusions` — заключения

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор заключения.
- `comment (text, NULL)` — Произвольный комментарий к заключению.
- `conclusion_status_id (uuid, NOT NULL)` — Статус заключения.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

