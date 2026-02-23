# Модуль ролей (`/user-types`)

## Назначение

Управление ролями и базовыми правами ролей.

Основные файлы:

- `src/modules/user-types/UserTypesPage.vue`
- `src/modules/user-types/RoleDialog.vue`
- `src/modules/user-types/RolePermissionsTab.vue`
- `src/modules/user-types/RolePermissionMatrix.vue`
- `src/modules/user-types/user-types.api.ts`

## Ключевая логика

- В таблице отображается `permissionsSummary` (view/create/edit/delete)
- При открытии роли подгружаются `GET /user-types/:id/permissions`
- При сохранении роли отправляются:
  - данные роли
  - permissions роли

## Матрица прав роли

В отличие от пользовательских overrides, роль работает бинарно:

- `allow`
- `deny`

`deny` означает отсутствие permission в массиве роли.

## API

- `GET /user-types`
- `POST /user-types`
- `PUT /user-types/:id`
- `DELETE /user-types/:id`
- `GET /user-types/:id/permissions`
- `PUT /user-types/:id/permissions`

## Связь с пользовательскими overrides

Фактические права пользователя формируются как:

1. Базовые права роли
2. Переопределения пользователя (имеют приоритет)

Это правило подтверждается в mock-реализации `computeEffectivePermissions()`.
