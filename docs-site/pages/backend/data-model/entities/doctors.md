---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `doctors` — врачи

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор врача.
- `first_name (text, NOT NULL)` — Имя.
- `last_name (text, NULL)` — Фамилия.
- `patronymic (text, NULL)` — Отчество.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

