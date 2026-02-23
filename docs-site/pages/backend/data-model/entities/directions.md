---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `directions` — направления

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор направления.
- `year_no (int, NOT NULL)` — Порядковый номер направления в текущем году.
- `base_no (int, NULL)` — Номер основания (сопроводительного документа).
- `is_done (boolean, NOT NULL, DEFAULT false)` — Признак завершения работы с направлением.
- `is_urgent (boolean, NOT NULL, DEFAULT false)` — Признак срочности.
- `doctor_id (uuid, NULL)` — Врач, выписавший направление.
- `object_id (uuid, NULL)` — Объект, от которого поступило направление.
- `status_id (uuid, NULL)` — Текущий статус направления.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `sampled_at (timestamptz, NULL)` — Дата и время отбора образцов.
- `received_at (timestamptz, NULL)` — Дата и время поступления направления в лабораторию.
- `completed_at (timestamptz, NULL)` — Дата и время завершения всех исследований по направлению.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

