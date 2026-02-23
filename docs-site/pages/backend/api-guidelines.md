---
icon: lucide/shield-check
tags:
  - API
  - Guidelines
---

# API Guidelines

## Базовые правила

1. Базовый префикс API: `/api/v1`.
2. Формат данных: `application/json`.
3. Аутентификация: `JWT` (access + refresh) в `HttpOnly` cookies.
4. Авторизация v1: `role-based`.

## JWT Cookie Contract (v1 baseline)

1. Cookie names:
   - `access_token`
   - `refresh_token`
2. Token TTL:
   - access token: `15 minutes`
   - refresh token: `30 days`
3. Security flags:
   - `HttpOnly`: `true` for both cookies
   - `Secure`: `true` in production, `false` in local development
   - `SameSite`: `lax` by default
4. Refresh flow:
   - refresh token rotates on each refresh request
   - old refresh token becomes invalid after successful rotation

## Auth Endpoints (v1)

Базовый префикс: `/api/v1/auth`.

### `POST /api/v1/auth/login`

Вход по `username/password`.

Request:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response body:

```json
{
  "data": {
    "user": {
      "id": "uuid",
      "username": "admin",
      "role_id": "uuid",
      "role_key": "admin",
      "role_name": "Administrator",
      "first_name": "System",
      "last_name": "Administrator",
      "patronymic": null
    },
    "access_expires_at": "2026-02-23T13:00:00Z",
    "refresh_expires_at": "2026-03-25T13:00:00Z"
  },
  "meta": {
    "operation": "login",
    "version": "v1"
  }
}
```

Cookie side effects:

1. Устанавливает `access_token` и `refresh_token` (`HttpOnly`).
2. `max_age` соответствует TTL токена.
3. Для `Secure` используется средовая настройка (`true` в prod, `false` локально).

### `GET /api/v1/auth/me`

Возвращает текущего пользователя по `access_token` cookie.

Response body:

```json
{
  "data": {
    "user": {
      "id": "uuid",
      "username": "admin",
      "role_id": "uuid",
      "role_key": "admin",
      "role_name": "Administrator",
      "first_name": "System",
      "last_name": "Administrator",
      "patronymic": null
    },
    "access_expires_at": "2026-02-23T13:00:00Z",
    "refresh_expires_at": "2026-03-25T13:00:00Z"
  },
  "meta": {
    "operation": "me",
    "version": "v1"
  }
}
```

### `POST /api/v1/auth/refresh`

Обновляет пару токенов по `refresh_token` cookie.

Cookie side effects:

1. Ротирует `refresh_token` (старый refresh становится невалидным).
2. Выпускает новый `access_token`.
3. Возвращает обновленные `access_expires_at` и `refresh_expires_at` в body.

### `POST /api/v1/auth/logout`

Выход пользователя.

Cookie side effects:

1. Удаляет `access_token` cookie.
2. Удаляет `refresh_token` cookie.
3. Инвалидирует текущую refresh-сессию на сервере.

### Ошибки auth endpoints

Все ошибки возвращаются как `application/problem+json`.

Типовые статусы:

1. `401` — invalid credentials / missing or invalid token.
2. `404` — пользователь или роль не найдены.

### Password Hashing

Для `users.password_hash` используется библиотека `bcrypt`.

1. Хранится только bcrypt-хэш, не plaintext.
2. Сравнение пароля выполняется через `bcrypt.checkpw`.

## CRUD Endpoints

Для каждой сущности доступны:

1. `POST /{resource}`
2. `GET /{resource}/{id}`
3. `GET /{resource}`
4. `PATCH /{resource}/{id}`
5. `DELETE /{resource}/{id}` (soft delete)

`restore` endpoint на v1 не вводится.

## DTO Contract Envelope

Для CRUD-контрактов применяется единый DTO-подход:

1. На каждую сущность определены `Create/Read/ListRead/Update/Delete` DTO.
2. Read и List ответы возвращаются через универсальные envelope с `meta`.
3. Для create/update/delete также допускается и рекомендуется передавать `meta`.
4. В `read/list_read` всегда возвращаются поля `*_id`.
5. Раскрытые объекты связей возвращаются только по `include=`.
6. Для невалидного include API возвращает `422 problem+json` и поле `allowed_includes`.

Детальная спецификация: `docs/dto-contracts.md`.

## Include Contract

1. `include` поддерживается на `GET /{resource}` и `GET /{resource}/{id}`.
2. Допустимые include публикуются в OpenAPI как whitelist (enum).
3. Без `include` возвращаются только `*_id`.
4. С `include` возвращаются `*_id` + раскрытые объекты (`id`, `name`, `code`).

Пример ошибки include:

```json
{
  "type": "https://api.example.local/problems/invalid-include",
  "title": "Validation failed",
  "status": 422,
  "detail": "Unsupported include: foo",
  "instance": "/api/v1/samples",
  "allowed_includes": ["status", "sample_type", "direction"]
}
```

## Пагинация

Query-параметры:

- `offset`: default `0`
- `limit`: default `15`
- `max_limit`: `500`

Ответ листинга:

```json
{
  "items": [],
  "meta": {
    "total": 0,
    "offset": 0,
    "limit": 15
  }
}
```

## Фильтрация

Передача фильтров идет только query-параметрами.

Поддерживается:

1. Фильтр по полю: `?status_id=<uuid>`
2. Интервал по полю даты/времени: `?received_at_from=...&received_at_to=...`
3. Совмещение фильтров: условия объединяются по `AND`

Правило именования интервалов: только `{field}_from` и `{field}_to`.

## Сортировка

- Разрешена сортировка только по одной колонке.
- Контракт:
  - `sort_by=<field>`
  - `sort_order=asc|desc`
- Сервис обязан валидировать `sort_by` по белому списку.

## Soft Delete

- `DELETE` устанавливает `deleted_at` в текущее timestamp.
- Все обычные выборки фильтруют записи с `deleted_at IS NULL`.
- Поддержка включения удаленных (`include_deleted`) на v1 не требуется.

## Error Contract (RFC 9457)

Все ошибки отдаются как `application/problem+json`.

Обязательные поля:

- `type`
- `title`
- `status`
- `detail`
- `instance`

Пример:

```json
{
  "type": "https://api.example.local/problems/validation-error",
  "title": "Validation failed",
  "status": 422,
  "detail": "One or more query parameters are invalid.",
  "instance": "/api/v1/samples",
  "errors": {
    "received_at_from": ["Invalid datetime format"]
  }
}
```
