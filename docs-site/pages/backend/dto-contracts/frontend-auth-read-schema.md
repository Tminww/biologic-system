---
icon: lucide/layout-list
tags:
  - API
  - DTO
---

# Read-схема для фронтенда (`auth/me`)

Источник данных: `GET /api/v1/auth/me`.

Ниже приведена таблица для frontend-таблицы в формате:
`ключ колонки` -> `название для таблицы` -> `значение`.

| Ключ колонки | Название для таблицы | Значение |
| --- | --- | --- |
| `id` | `ID` | `data.user.id` |
| `username` | `Логин` | `data.user.username` |
| `role_id` | `ID роли` | `data.user.role_id` |
| `role_key` | `Роль (key)` | `data.user.role_key` |
| `role_name` | `Название роли` | `data.user.role_name` |
| `first_name` | `Имя` | `data.user.first_name` |
| `last_name` | `Фамилия` | `data.user.last_name` |
| `patronymic` | `Отчество` | `data.user.patronymic` |
| `access_expires_at` | `Access истекает` | `data.access_expires_at` |
| `refresh_expires_at` | `Refresh истекает` | `data.refresh_expires_at` |

## Текущий seed для локальной среды

После миграций для пользователя `admin/admin123` frontend получает:

| Ключ колонки | Название для таблицы | Значение |
| --- | --- | --- |
| `username` | `Логин` | `admin` |
| `role_key` | `Роль (key)` | `admin` |
| `role_name` | `Название роли` | `Administrator` |
| `first_name` | `Имя` | `System` |
| `last_name` | `Фамилия` | `Administrator` |
