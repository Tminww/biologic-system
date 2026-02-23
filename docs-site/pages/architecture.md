# Архитектура системы (каноническая)

## 1. Контекст системы

Biologic System состоит из двух контуров:

1. `Backend`: модульный монолит на `FastAPI + PostgreSQL`.
2. `Frontend`: SPA на `Vue 3 + TypeScript`.

Интеграция выполняется по HTTP с базовым префиксом API: `/api/v1`.

## 2. Backend архитектура

Слои backend:

1. `API layer` (`app/api`) — HTTP endpoints и DI.
2. `Service layer` (`app/services`) — бизнес-логика.
3. `Repository layer` (`app/repositories`) — запросы к БД.
4. `Model layer` (`app/models`) — ORM сущности.
5. `Schema layer` (`app/schemas`) — DTO и envelope-контракты.

Правило зависимостей: верхний слой зависит только от нижнего. Обратные зависимости запрещены.

## 3. Frontend архитектура

Слои frontend:

1. `app` — bootstrap, hooks, router.
2. `layouts` — `AuthLayout`, `MainLayout`.
3. `modules` — бизнес-фичи и страницы.
4. `shared` — переиспользуемые API/utils/types/components.
5. `styles` — тема и глобальные стили.

Базовый CRUD-пайплайн: `useServerTable` -> `BaseTable` -> `useCrudDialog` -> `BaseDialog` (+ `useOptimistic`).

## 4. Интеграционный слой

### 4.1 Транспорт и auth

1. `credentials: 'include'` обязателен для всех защищённых запросов.
2. JWT (access/refresh) передаются в `HttpOnly` cookies.
3. Базовый auth-flow: `POST /auth/login` -> `GET /auth/me` -> `POST /auth/refresh` -> `POST /auth/logout`.

### 4.2 Контракты ответа

1. List: `{ items, meta }`
2. Read one: `{ data, meta }`
3. Create/Update/Delete: `{ data, meta }`

`meta` содержит технические поля трассировки (`timestamp`, `request_id`, `version`) и include/pagination поля для read/list.

### 4.3 Ошибки

Единый формат ошибок: `application/problem+json` (RFC 9457).

Обязательные поля:

1. `type`
2. `title`
3. `status`
4. `detail`
5. `instance`

### 4.4 Идентификаторы и время

1. Канонический тип ID в API: `UUID`.
2. Transport naming: `snake_case`.
3. Время: ISO 8601 UTC (`timestamptz` semantics).
4. Soft delete: `deleted_at`.

## 5. RBAC

Проверка доступа выполняется на трёх уровнях:

1. Router meta (`resource`, `action`).
2. UI (`v-permission`, disabled-state).
3. Backend authorization (источник истины).

UI не является границей безопасности; финальная авторизация всегда на backend.

## 6. Где смотреть детали

- Backend архитектура: `docs/backend/architecture.md`
- Backend ADR: `docs/backend/adr/index.md`
- Frontend архитектура: `docs/frontend/architecture/overview.md`
- Frontend auth/RBAC: `docs/frontend/architecture/auth-and-permissions.md`
- Канонический межсервисный контракт: `docs/integration-contract.md`
