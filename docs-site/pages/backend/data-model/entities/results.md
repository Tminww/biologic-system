---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `results` — результаты

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор результата.
- `comment (text, NULL)` — Произвольный комментарий к результату.
- `recommendation (text, NULL)` — Рекомендации по итогам исследования.
- `is_done (boolean, NOT NULL, DEFAULT false)` — Признак завершения работы с результатом.
- `lab_id (uuid, NULL)` — Лаборатория, выполнившая исследование.
- `sample_id (uuid, NOT NULL)` — Проба, по которой получен результат.
- `status_id (uuid, NULL)` — Текущий статус результата.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `received_at (timestamptz, NULL)` — Дата и время поступления пробы в лабораторию.
- `completed_at (timestamptz, NULL)` — Дата и время завершения исследования.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

