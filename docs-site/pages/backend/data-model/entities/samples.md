---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `samples` — пробы

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор пробы.
- `month_no (int, NULL)` — Порядковый номер пробы в текущем месяце.
- `name (text, NOT NULL)` — Наименование пробы.
- `alternate_name (text, NULL)` — Альтернативное наименование пробы.
- `mass (text, NULL)` — Масса / объём пробы.
- `target_description (text, NULL)` — Описание объекта исследования.
- `comment (text, NULL)` — Произвольный комментарий.
- `section (text, NULL)` — Участок / место отбора пробы.
- `delivery (text, NULL)` — Способ или условия доставки.
- `nomenclature_code (text, NULL)` — Номенклатурный код пробы.
- `batch_code (text, NULL)` — Код партии.
- `supplier (text, NULL)` — Поставщик.
- `is_urgent (boolean, NOT NULL, DEFAULT false)` — Признак срочности.
- `is_done (boolean, NOT NULL, DEFAULT false)` — Признак завершения работы с пробой.
- `sample_type_id (uuid, NULL)` — Тип пробы.
- `status_id (uuid, NULL)` — Текущий статус пробы.
- `direction_id (uuid, NULL)` — Направление, по которому поступила проба.
- `protocol_id (uuid, NULL)` — Протокол, в который включена проба.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `sampled_at (timestamptz, NULL)` — Дата и время сбора образца (бизнес поле).
- `received_at (timestamptz, NULL)` — Дата и время поступления пробы в лабораторию.
- `completed_at (timestamptz, NULL)` — Дата и время завершения исследования.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.

