---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `change_log` — журнал изменений

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор записи журнала.
- `branch_id (uuid, NULL)` — Филиал, в контексте которого произошло изменение.
- `entity_type (text, NULL)` — Название таблицы изменённой сущности.
- `entity_id (uuid, NULL)` — Идентификатор изменённой строки; без FK — запись живёт дольше сущности.
- `action (text, NULL)` — Тип действия: `CREATE`, `UPDATE`, `DELETE`, `RESTORE`.
- `actor_id (uuid, NULL)` — Идентификатор пользователя; без FK — пользователь может быть удалён.
- `actor_name (text, NULL)` — Снимок имени пользователя на момент действия.
- `snapshot (jsonb, NULL)` — Полный снимок записи на момент действия.
- `diff (jsonb, NULL)` — Изменённые поля: `{ поле: [было, стало] }`.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время события.

