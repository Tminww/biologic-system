---
icon: lucide/server
tags:
  - Backend
  - API
---

# Канонический backend API

## 1. Базовый контракт

1. Prefix: `/api/v1`
2. Content-Type: `application/json`
3. Auth transport: `HttpOnly` cookies + `credentials: 'include'`
4. Ошибки: `application/problem+json` (RFC 9457)

---

## 2. Auth endpoints

| Method | Path | Назначение |
| --- | --- | --- |
| POST | `/api/v1/auth/login` | Логин по `username/password`, установка cookie |
| GET | `/api/v1/auth/me` | Текущий пользователь + permissions |
| POST | `/api/v1/auth/refresh` | Ротация refresh и выдача нового access |
| POST | `/api/v1/auth/logout` | Выход + очистка cookie |

Канон transport-поля логина: `username`.

---

## 3. Принципы выбора между CRUD и Command

Система использует два паттерна. Критерий выбора:

> Если операция имеет имя, порождает побочные эффекты или затрагивает несколько сущностей одновременно — это **команда**. Если операция — просто сохранение данных без бизнес-логики — это **CRUD**.

| Признак | CRUD | Command |
| --- | --- | --- |
| Только сохранение данных | ✅ | — |
| Смена статуса | — | ✅ |
| Каскадные эффекты на другие сущности | — | ✅ |
| Вычисляемые поля на сервере | — | ✅ |
| Уведомления как побочный эффект | — | ✅ |

---

## 4. CRUD паттерн

Для справочников и сущностей без бизнес-логики используется единый набор:

1. `POST /api/v1/{resource}`
2. `GET /api/v1/{resource}/{id}`
3. `GET /api/v1/{resource}`
4. `PATCH /api/v1/{resource}/{id}`
5. `DELETE /api/v1/{resource}/{id}` (soft delete)

`PUT` считается legacy и не является каноническим методом обновления.

### Полный список CRUD-ресурсов

| Resource |
| --- |
| `branches` |
| `change_log` |
| `conclusion_statuses` |
| `conclusions` |
| `directions` |
| `doctors` |
| `indicators` |
| `labs` |
| `objects` |
| `protocol_types` |
| `protocols` |
| `permissions` |
| `research_goals` |
| `results` |
| `role_permissions` |
| `roles` |
| `sample_targets` |
| `sample_types` |
| `samples` |
| `statuses` |
| `tests` |
| `user_scopes` |
| `users` |

:::warning
`/api/v1/user_roles` удалён из backend-контракта. Используется только `users.role_id` + `user_scopes`.
:::

:::note
Смена статуса через `PATCH /samples/:id` или `PATCH /tests/:id` **не допускается**. Для переходов статусов используются команды (см. раздел 5).
:::

---

## 5. Command паттерн

Команды описывают бизнес-операции с побочными эффектами. Все команды используют `POST` на именованный sub-resource.

### Формат

```
POST /api/v1/{resource}/{id}/{command}
```

Тело запроса содержит только данные, необходимые для выполнения команды. Ответ возвращает обновлённую сущность в стандартном envelope `{ "data": {} }`.

### Команды направлений

| Method | Path | Инициатор | Эффект |
| --- | --- | --- | --- |
| POST | `/api/v1/directions/{id}/import` | Регистратор | Создаёт направление из файла, статус → `draft` |
| POST | `/api/v1/directions/{id}/register` | Регистратор | Проставлены типы образцов и лаборатории, статус → `registered` |

### Команды образцов

| Method | Path | Инициатор | Эффект |
| --- | --- | --- | --- |
| POST | `/api/v1/samples/{id}/register` | Регистратор | Проставляет `received_at`, вычисляет `deadline`, статус → `registered` |
| POST | `/api/v1/samples/{id}/reject` | Регистратор / Доктор | Статус → `rejected`; все исследования → `cancelled` с `cancellation_reason = sample_rejected` |
| POST | `/api/v1/samples/{id}/close` | Начальник лаборатории | Устанавливает `verdict`, статус → `completed`; уведомление НФ если вердикт отрицательный |

### Команды исследований (`results`)

| Method | Path | Инициатор | Эффект |
| --- | --- | --- | --- |
| POST | `/api/v1/results/{id}/confirm` | НЛ / Доктор | Статус `draft` → `ordered` |
| POST | `/api/v1/results/{id}/start` | Доктор | Статус `ordered` → `in_progress` |
| POST | `/api/v1/results/{id}/reject` | НЛ / Доктор / Регистратор | Статус → `rejected` (терминальный) |

### Команды испытаний (`tests`)

| Method | Path | Инициатор | Эффект |
| --- | --- | --- | --- |
| POST | `/api/v1/tests/{id}/start` | Доктор / НЛ | Статус `queued` → `in_progress` |
| POST | `/api/v1/tests/{id}/complete` | Доктор / НЛ | Вносит результат, статус → `completed`; если все испытания завершены — исследование → `completed`; если все исследования завершены — образец → `analyzed` |
| POST | `/api/v1/tests/{id}/requeue` | Доктор / НЛ | Статус `in_progress` → `queued` |
| POST | `/api/v1/tests/{id}/reject` | Доктор / НЛ / Система | Статус → `rejected` (терминальный) |

### Автоматические переходы (инициатор: Система)

Следующие переходы статусов система выполняет сама как каскадный эффект команд выше. Отдельных endpoint-ов для них нет.

| Триггер | Автоматический эффект |
| --- | --- |
| Хотя бы один образец → `in_progress` | Направление → `in_progress` |
| Хотя бы один образец закрыт, но не все | Направление → `partially_completed` |
| Все образцы закрыты | Направление → `completed` |
| Все испытания завершены | Исследование → `completed` |
| Все исследования завершены | Образец → `analyzed` |
| Назначены новые испытания | Исследование `completed` → `in_progress` |

---

## 6. Dashboard quick actions

| Method | Path | Назначение |
| --- | --- | --- |
| GET | `/api/v1/dashboard/quick-actions` | Список быстрых действий для текущей роли |
| POST | `/api/v1/dashboard/quick-actions` | Создать быстрое действие для роли |
| PUT | `/api/v1/dashboard/quick-actions/{id}` | Изменить быстрое действие для роли |
| DELETE | `/api/v1/dashboard/quick-actions/{id}` | Удалить быстрое действие для роли |

:::note
Quick actions в mock-режиме хранятся in-memory на backend и привязаны к `role_key`, а не к `user_id`.
:::

:::tip
Для текущего mock-этапа отдельная таблица БД не нужна. Таблица нужна только когда появится требование персистентного администрирования quick actions ролей в live-режиме (с аудитом и миграциями).
:::

---

## 7. Envelope и meta

### List

```json
{
  "items": [],
  "meta": {
    "timestamp": "2026-02-23T13:00:00Z",
    "request_id": "req-123",
    "version": "v1",
    "total": 0,
    "offset": 0,
    "limit": 15,
    "includes_requested": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

### Read one / Command response

```json
{
  "data": {},
  "meta": {
    "timestamp": "2026-02-23T13:00:00Z",
    "request_id": "req-123",
    "version": "v1",
    "includes": [],
    "includes_requested": [],
    "includes_applied": [],
    "includes_allowed": []
  }
}
```

Канонический ключ: `includes_requested`.

---

## 8. Query contract

1. Pagination: `offset`, `limit`
2. Sorting: `sort_by`, `sort_order=asc|desc`
3. Range filters: `{field}_from`, `{field}_to`
4. Include: `include=<relation1,relation2>` (только whitelist из OpenAPI)

---

## 9. Коды ошибок

| Код | Значение |
| --- | --- |
| `401` | Неаутентифицированный запрос / невалидные креды |
| `403` | Недостаточно прав |
| `404` | Сущность не найдена |
| `409` | Конфликт версий (`STALE_DATA`) или недопустимый переход статуса (`INVALID_TRANSITION`) |
| `422` | Валидация payload / query / include |

:::note
Попытка выполнить команду при недопустимом текущем статусе возвращает `409` с кодом `INVALID_TRANSITION`, а не `422`.
:::

---

## 10. Матрица соответствия frontend route → backend resource

| Frontend route | Backend resource |
| --- | --- |
| `/objects` | `/api/v1/objects` |
| `/directions` | `/api/v1/directions` |
| `/samples` | `/api/v1/samples` |
| `/results` | `/api/v1/results` |
| `/tests` | `/api/v1/tests` |
| `/conclusions` | `/api/v1/conclusions` |
| `/protocols` | `/api/v1/protocols` |
| `/doctors` | `/api/v1/doctors` |
| `/departments` | `/api/v1/branches` |
| `/labs` | `/api/v1/labs` |
| `/research-goals` | `/api/v1/research_goals` |
| `/sample-targets` | `/api/v1/sample_targets` |
| `/sample-types` | `/api/v1/sample_types` |
| `/indicators` | `/api/v1/indicators` |
| `/protocol-types` | `/api/v1/protocol_types` |
| `/statuses` | `/api/v1/statuses` |
| `/user-types` | `/api/v1/roles` |
| `/permissions` | `/api/v1/permissions` |
| `/user-scopes` | `/api/v1/user_scopes` |
| `/admin/users` | `/api/v1/users` |

---

## 11. Подробные источники

- `docs/backend/api-guidelines.md`
- `docs/backend/dto-contracts.md`
- `docs/backend/dto-contracts/entities/index.md`
- `docs/frontend/api/modules-contracts.md`
