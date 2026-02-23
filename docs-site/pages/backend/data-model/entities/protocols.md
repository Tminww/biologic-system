---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `protocols` — протоколы

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор протокола.
- `year_no (int, NOT NULL)` — Порядковый номер протокола в текущем году.
- `copies (smallint, NULL)` — Количество экземпляров протокола.
- `is_signed (boolean, NOT NULL, DEFAULT false)` — Признак подписания протокола.
- `protocol_copy_name (text, NULL)` — Имя файла копии протокола.
- `excerpt_copy_name (text, NULL)` — Имя файла копии выписки из протокола.
- `conclusion_id (uuid, NULL)` — Заключение, привязанное к протоколу.
- `protocol_type_id (uuid, NULL)` — Тип протокола.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `issued_at (timestamptz, NULL)` — Дата и время выпуска протокола (бизнес поле).
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

