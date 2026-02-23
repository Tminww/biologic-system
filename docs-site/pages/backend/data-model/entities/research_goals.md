---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `research_goals` — цели исследований

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор цели исследования.
- `code (text, NOT NULL)` — Краткий код цели исследования.
- `name (text, NOT NULL)` — Наименование цели исследования.
- `comment (text, NULL)` — Произвольный комментарий.
- `lab_id (uuid, NULL)` — Лаборатория, к которой относится цель исследования.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

