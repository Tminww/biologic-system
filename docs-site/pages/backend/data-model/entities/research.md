---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `research` — исследования

## Поля

- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор исследования.
- `sample_id (uuid, NOT NULL)` — Проба, по которой выполняется исследование.
- `research_goal_id (uuid, NOT NULL)` — Цель исследования.
- `status_id (uuid, NULL)` — Статус исследования (`research_statuses`).
- `comment (text, NULL)` — Комментарий.
- `recommendation (text, NULL)` — Рекомендация.
- `received_at (timestamptz, NULL)` — Время поступления на исследование.
- `completed_at (timestamptz, NULL)` — Время завершения.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Время создания.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Время обновления.
- `deleted_at (timestamptz, NULL)` — Мягкое удаление.
