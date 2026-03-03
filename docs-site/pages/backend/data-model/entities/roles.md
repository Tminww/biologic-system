---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `roles` — роли

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор роли.
- `key (text, NOT NULL)` — Техническое обозначение роли.
- `name (text, NOT NULL)` — Отображаемое наименование роли.
- `scope_type (enum, NOT NULL)` — Тип области видимости роли: `global`, `own_branch`, `own_lab`, `own_objects`.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.

## Канонические значения `key`

1. `admin`
2. `branch_chief`
3. `lab_chief`
4. `registrar`
5. `lab_doctor`
6. `laborant`
7. `sanitary_inspector`

:::note
Бизнес-описание ролей, терминология и процессы работы по ролям зафиксированы в
`backend/user-guide/roles-and-permissions.md`.
:::
