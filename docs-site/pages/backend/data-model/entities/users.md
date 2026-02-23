---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `users` — пользователи

## Поля


- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор пользователя.
- `username (text, NOT NULL)` — Логин для входа в систему.
- `password_hash (text, NOT NULL)` — Хэш пароля в формате `bcrypt`.
- `refresh_token_version (integer, NOT NULL, DEFAULT 0)` — Версия refresh-сессии для JWT rotation/invalidation.
- `code (text, NULL)` — Внутреннее обозначение оператора (отображается в протоколе).
- `first_name (text, NULL)` — Имя.
- `last_name (text, NULL)` — Фамилия.
- `patronymic (text, NULL)` — Отчество.
- `is_registrar (boolean, NULL)` — Признак роли регистратора.
- `is_lab_head (boolean, NULL)` — Признак руководителя лаборатории.
- `is_branch_head (boolean, NULL)` — Признак руководителя филиала.
- `role_id (uuid, NOT NULL)` — Роль пользователя.
- `lab_id (uuid, NULL)` — Лаборатория, к которой прикреплён пользователь.
- `created_by (uuid, NULL)` — Пользователь, создавший запись.
- `updated_by (uuid, NULL)` — Пользователь, последним изменивший запись.
- `created_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время создания записи.
- `updated_at (timestamptz, NOT NULL, DEFAULT CURRENT_TIMESTAMP)` — Дата и время последнего изменения записи.
- `deleted_at (timestamptz, NULL)` — Дата и время мягкого удаления; `NULL` — запись активна.
