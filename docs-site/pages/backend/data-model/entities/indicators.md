---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `indicators` — показатели

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор показателя.
- `name (text, NOT NULL)` — Наименование показателя.
- `unit (text, NULL)` — Единица измерения.
- `norm_text (text, NULL)` — Норма в текстовом виде (например: не более 0,5).
- `norm_value (text, NULL)` — Норма в числовом виде для сравнения.
- `default_text (text, NULL)` — Значение по умолчанию при создании испытания.
- `comment (text, NULL)` — Произвольный комментарий.
- `research_goal_id (uuid, NULL)` — Цель исследования, к которой относится показатель.
- `sample_type_id (uuid, NULL)` — Тип пробы, для которого применяется показатель.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.
