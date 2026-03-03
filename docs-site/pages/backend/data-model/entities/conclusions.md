---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `conclusions` — заключения

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор заключения.
- `code (text, NOT NULL)` — Код заключения.
- `name (text, NOT NULL)` — Наименование заключения.
- `text_singular (text, NOT NULL)` — Текст для единственного числа.
- `text_plural (text, NOT NULL)` — Текст для множественного числа.
- `comment (text, NULL)` — Произвольный комментарий к заключению.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.
