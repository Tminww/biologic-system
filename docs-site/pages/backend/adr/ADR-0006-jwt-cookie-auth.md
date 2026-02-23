---
icon: lucide/key-round
tags:
  - ADR
  - Security
---

# ADR-0006: JWT-аутентификация через HttpOnly cookies

- Status: Accepted
- Date: 2026-02-23

## Context

Для frontend нужен базовый production-like login flow без хранения токенов в `localStorage`.
Также требуется:

1. Поддержка `login/me/refresh/logout`.
2. Короткоживущий access token и длинный refresh token.
3. Ротация refresh token с инвалидированием предыдущего значения.
4. Совместимость с текущей моделью пользователей и ролей.

## Decision

1. Использовать JWT (`HS256`) для access и refresh токенов.
2. Хранить оба токена только в `HttpOnly` cookies:
   - `access_token`
   - `refresh_token`
3. TTL:
   - access: 15 минут
   - refresh: 30 дней
4. Для refresh rotation использовать поле `users.refresh_token_version`:
   - при выдаче refresh токен содержит claim версии;
   - при `refresh` версия увеличивается;
   - старый refresh токен становится невалидным.
5. Для `logout` удалять cookies и инвалидировать refresh-сессию (через инкремент версии).
6. `auth/me` возвращает текущего пользователя и роль (`role_id`, `role_key`, `role_name`) для frontend.
7. Для хранения паролей используется `bcrypt` (`hashpw`/`checkpw`).

## Consequences

Плюсы:

1. Снижен риск XSS-эксфильтрации токенов (нет `localStorage`/`sessionStorage` хранения).
2. Стандартизованная ротация refresh токена с серверной проверкой.
3. Простой контракт для frontend: cookies + `auth/me`.

Минусы:

1. Нужна серверная state-точка (`refresh_token_version`) в БД.
2. Инкремент версии при logout/re-login может инвалидировать другие refresh-сессии пользователя.
3. Для cross-site сценариев потребуются отдельные настройки `SameSite=None` + `Secure=true`.

## Alternatives Considered

1. Bearer токены в `Authorization` header и хранение в frontend storage.
2. Stateful refresh sessions в отдельной таблице (`refresh_tokens`).
3. Server-side сессии без JWT.
