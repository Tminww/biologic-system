# Как добавить новый CRUD модуль

## Цель

Добавить новый модуль по текущему архитектурному стандарту проекта без дублирования логики.

## Шаг 1. Создать API слой

Файл: `src/modules/<module>/<module>.api.ts`

Минимальный набор:

- `list<Resource>(params)`
- `create<Resource>(payload)`
- `update<Resource>(id, payload)`
- `delete<Resource>(id)`

Использовать `apiRequest` из `src/shared/api/client.ts`.

## Шаг 2. Создать страницу модуля

Файл: `src/modules/<module>/<Module>Page.vue`

Стандартные элементы:

- `useServerTable` с `presetKey`
- `BaseTable` с `v-model:filters`
- `RowActions` с `resource`
- `useCrudDialog`
- `useOptimistic`
- `useConfirmDelete`
- `useDialogHash` и `useTableHash`

## Шаг 3. Создать диалог

Файл: `src/modules/<module>/<Module>Dialog.vue`

Использовать `BaseDialog`.

Если форма типовая, можно использовать `CatalogDialog`.

## Шаг 4. Добавить маршрут

Файл: `src/app/router.ts`

Добавить route c `meta`:

- `requiresAuth: true`
- `resource: '<resource>'`
- `action: 'view'`

## Шаг 5. Добавить пункт в sidebar

Файл: `src/layouts/MainLayout.vue`

Добавить nav item с тем же `resource`/`action`.

Важно: пункт не скрывать, а disabled при отсутствии прав.

## Шаг 6. Обновить права и i18n

- `src/shared/types/permissions.ts`: добавить новый `Resource`
- `src/shared/i18n/messages.ts`: добавить `resource.<name>` и связанные тексты
- при необходимости добавить роль/override поведение в backend/mock

## Шаг 7. Синхронизировать backend контракт

- добавить/обновить endpoint'ы на backend по канону `/api/v1`
- синхронизировать `resource/action` для RBAC в `/auth/me`
- при необходимости добавить backend mock-данные, но не фронтовые моки

## Шаг 8. Добавить документацию и тесты

- создать страницу в `docs/modules/`
- добавить smoke e2e тест на загрузку и базовые действия
