---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `change_log` — журнал изменений

`change_log` используется как единый слой аудита и как источник истории изменений по сущности.

## Поля

- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор записи журнала.
- `branch_id (uuid, NULL)` — Филиал, в контексте которого произошло изменение.
- `entity_type (text, NULL)` — Название таблицы изменённой сущности.
- `entity_id (uuid, NULL)` — Идентификатор изменённой строки; без FK — запись живёт дольше сущности.
- `action (text, NULL)` — Тип события: `CREATE`, `UPDATE`, `DELETE`, `RESTORE`, `STATUS_TRANSITION`.
- `actor_id (uuid, NULL)` — Идентификатор пользователя; без FK — пользователь может быть удалён.
- `actor_name (text, NULL)` — Снимок имени пользователя на момент действия.
- `snapshot (jsonb, NULL)` — Полный снимок записи на момент действия.
- `diff (jsonb, NULL)` — Изменённые поля: `{ поле: [было, стало] }`.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время события.

## Типы событий в `action`

Для аудита должны логироваться не только CRUD, но и бизнес-события смены статуса.

| action | Назначение |
| --- | --- |
| `CREATE` | Создание записи сущности. |
| `UPDATE` | Изменение полей сущности. |
| `DELETE` | Мягкое/жёсткое удаление. |
| `RESTORE` | Восстановление удалённой записи. |
| `STATUS_TRANSITION` | Переход статуса между кодами жизненного цикла. |

## Формат события `STATUS_TRANSITION`

`snapshot` хранит состояние сущности после перехода.  
`diff` хранит детали перехода и инициатора бизнес-операции.

```json
{
  "field": "status_id",
  "from_code": "ordered",
  "to_code": "in_progress",
  "entity_type": "research",
  "reason": "doctor_started",
  "triggered_by_role": "doctor"
}
```

:::note
Для каскадных переходов (например, брак образца и автоматическое отклонение исследований) в `diff` нужно сохранять `reason`/`cancellation_reason`, чтобы история была пригодна для расследований.
:::

## История изменений по сущности

История читается выборкой по `entity_type + entity_id` с сортировкой по `created_at`.

```sql
SELECT id, action, diff, actor_name, created_at
FROM change_log
WHERE entity_type = 'research'
  AND entity_id = :entity_id
ORDER BY created_at ASC;
```
