# Модуль пользователей (`/admin/users`)

## Назначение

Управление пользователями и индивидуальными переопределениями прав.

Основные файлы:

- `src/modules/admin/UsersPage.vue`
- `src/modules/admin/UserDialog.vue`
- `src/modules/admin/PermissionsTab.vue`
- `src/modules/admin/PermissionMatrix.vue`
- `src/modules/admin/admin.api.ts`

## Таблица пользователей

Колонки:

- `id`
- `login`
- `fullName`
- `email`
- `role`
- `department.name`
- `status`
- `updatedAt`

Дополнительно отображается `overridesCount`.

## Диалог пользователя

Вкладки:

- `Детали`
- `Права`

Для create доступно поле `password`.

Вкладка `Права` показывает:

- role permissions (унаследованные)
- overrides (allow/deny/inherit)

## Матрица прав

`PermissionMatrix` группирует права по ресурсам в Accordion.

Для каждого action доступны состояния:

- inherit
- allow
- deny

`allow` и `deny` записываются в массив overrides.

## API

- `GET /users`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`
- `GET /users/:id/permissions`
- `PUT /users/:id/permissions`

Примечание: в текущем OpenAPI backend этот endpoint может отсутствовать. Тогда доступно только управление пользователем без per-user overrides.

## Синхронизация текущей сессии

Если администратор меняет пользователя, который совпадает с текущим `auth.user.id`, после сохранения вызывается `auth.restoreSession()`.
