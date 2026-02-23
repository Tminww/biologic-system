# Auth и RBAC

## Сессионная авторизация

Auth слой основан на backend-сессии.

Endpoints:

- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`

Клиент всегда отправляет `credentials: 'include'` (см. `src/shared/api/client.ts`).

## Auth store

`src/modules/auth/auth.store.ts`

State:

- `user: AuthUser | null`
- `permissions: Permission[]`
- `loading: boolean`
- `initialized: boolean`

Actions:

- `login(login, password)`
- `logout()`
- `restoreSession()`
- `setSession(user, permissions)`
- `clearSession()`
- `logoutLocal()`
- `can(resource, action)`

Effective permissions приходят от backend (или mock) уже с учетом роли и overrides.

## Модель прав

Типы описаны в `src/shared/types/permissions.ts`:

- `Resource`: `dashboard`, `directions`, `samples`, `users`, `objects` и др.
- `Action`: `view | create | edit | delete`
- `Permission`: `{ resource, action }`
- `PermissionOverride`: `{ resource, action, allowed }`

## UI-политика доступа

Проект использует правило: не скрывать функциональность, а явно блокировать.

Примеры:

- Sidebar: пункт отображается, но disabled + lock
- Кнопки: `v-permission="['users','delete']"`
- Row actions: иконки меняются на lock при отсутствии прав

`v-permission` реализован в `src/shared/ui/permission.directive.ts`.

## Централизованная обработка 401/403

В `src/app/main.ts` через `setApiHooks`:

- `401`: `auth.logoutLocal()` + редирект на `/login`
- `403`: toast `Недостаточно прав`

## Права в админке

### Пользователи (`/admin/users`)

- Редактирование пользователя
- Просмотр и изменение персональных overrides
- При изменении текущего пользователя выполняется `auth.restoreSession()`

### Роли (`/user-types`)

- Роль хранит базовые permissions
- Пользователь может иметь overrides поверх роли
- В mock и в целевом backend overrides имеют приоритет над ролью
