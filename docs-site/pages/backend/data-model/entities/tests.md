---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `tests` — испытания

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор испытания.
- `value (text, NULL)` — Полученное значение показателя.
- `comment (text, NULL)` — Произвольный комментарий к испытанию.
- `norm (text, NULL)` — Норма, применённая при проведении испытания (снимок на момент испытания).
- `is_active (boolean, NOT NULL, DEFAULT true)` — Признак активности; `false` — испытание отменено или заменено.
- `research_id (uuid, NOT NULL)` — Исследование, к которому относится испытание.
- `indicator_id (uuid, NULL)` — Показатель, по которому проводится испытание.
- `status_id (uuid, NULL)` — Статус испытания (`test_statuses`).
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.
