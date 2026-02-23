# Frontend: архитектура и модульная карта

## 1. Слои frontend

1. `src/app` — bootstrap, router, глобальные API hooks.
2. `src/layouts` — каркас страниц (`AuthLayout`, `MainLayout`).
3. `src/modules` — доменные фичи.
4. `src/shared` — общие composables, API client, типы и UI.
5. `src/styles` — глобальные стили и тема.

## 2. Канонический CRUD-паттерн

1. `useServerTable` для list state.
2. `BaseTable` для отображения таблиц.
3. `useCrudDialog` + `BaseDialog` для create/update.
4. `useOptimistic` для optimistic update/delete.
5. `useDialogHash`/`useTableHash` для deep-linking состояния.

## 3. Маршруты и домены

Рабочие процессы:

- `/directions`, `/samples`, `/protocols`, `/results`, `/conclusions`, `/tests`

Справочники и структура:

- `/doctors`, `/departments`, `/labs`, `/research-goals`, `/sample-targets`, `/sample-types`, `/indicators`, `/protocol-types`, `/statuses`, `/user-types`, `/objects`

Администрирование:

- `/admin/users`

## 4. Auth и доступ

1. Frontend не хранит токены в `localStorage/sessionStorage`.
2. Все защищённые запросы идут с `credentials: 'include'`.
3. `401` -> `logoutLocal()` + redirect на `/login`.
4. `403` -> пользовательское уведомление о правах.

RBAC-валидация выполняется в:

1. router guards,
2. UI permission directives,
3. backend authorization (финальный контроль).

## 5. DTO и naming policy

1. В transport API фиксируется `snake_case`.
2. UI-модели могут использовать camelCase после нормализации в API client.
3. Канонический list envelope: `{ items, meta }`.
4. Канонический include-meta ключ: `includes_requested`.

## 6. Подробные источники

- `docs/frontend/architecture/overview.md`
- `docs/frontend/architecture/router-and-guards.md`
- `docs/frontend/architecture/auth-and-permissions.md`
- `docs/frontend/modules/overview.md`
- `docs/frontend/api/overview.md`
- `docs/frontend/api/modules-contracts.md`
