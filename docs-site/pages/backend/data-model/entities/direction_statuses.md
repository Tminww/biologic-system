---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `direction_statuses` — статусы направлений

## Поля

- `id (uuid, DEFAULT uuidv7())` — Идентификатор.
- `code (text, NULL)` — Технический код статуса.
- `name (text, NOT NULL)` — Наименование статуса.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Время создания.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Время обновления.
- `deleted_at (timestamptz, NULL)` — Мягкое удаление.

## Нормативные коды

| code | name | Комментарий |
| --- | --- | --- |
| `draft` | Черновик | Направление создано вручную или импортировано без типов образцов и назначенных лабораторий. |
| `registered` | Зарегистрировано | Проставлены типы образцов и назначены лаборатории. Переход выполняет регистратор. |
| `in_progress` | В работе | Автоматически: хотя бы один образец перешёл в статус «На исследовании». |
| `partially_completed` | Частично выполнено | Автоматически: хотя бы один образец закрыт, но не все. |
| `completed` | Выполнено | Автоматически: все образцы закрыты. |

## Допустимые переходы

| Из | В | Инициатор |
| --- | --- | --- |
| — | `draft` | Система (импорт без типов) / Регистратор (вручную). |
| `draft` | `registered` | Регистратор (проставлены типы образцов и назначены лаборатории). |
| `registered` | `in_progress` | Система (хотя бы один образец перешёл в `in_progress`). |
| `in_progress` | `partially_completed` | Система (хотя бы один образец закрыт). |
| `partially_completed` | `in_progress` | Система (назначены новые исследования). |
| `partially_completed` | `completed` | Система (все образцы закрыты). |
| `in_progress` | `completed` | Система (все образцы закрыты). |
