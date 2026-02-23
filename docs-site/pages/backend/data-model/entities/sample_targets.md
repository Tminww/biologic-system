---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `sample_targets` — цели по пробам

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор цели пробы.
- `sample_id (uuid, NOT NULL)` — Проба, для которой указана цель.
- `research_goal_id (uuid, NOT NULL)` — Цель исследования.
- `status_id (uuid, NULL)` — Статус выполнения цели.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

