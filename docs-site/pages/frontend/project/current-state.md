# Актуальное состояние проекта

Последняя сверка структуры и документации: **23 февраля 2026**.

## Что уже реализовано

- SPA на Vue 3 + Vite + TypeScript + Pinia + Vue Router
- PrimeVue 4 (Aura), PrimeIcons, централизованные `Toast` и `ConfirmDialog`
- JWT cookie auth (`/auth/login`, `/auth/me`, `/auth/refresh`, `/auth/logout`)
- RBAC с эффективными правами и user overrides
- Единый CRUD-пайплайн:
  - `BaseTable` + `useServerTable`
  - `BaseDialog` + `useCrudDialog`
  - `useOptimistic` + `useConfirmDelete`
  - `useDialogHash` + `useTableHash`
- Frontend без локального mock API, весь трафик идет в backend

## Карта основных маршрутов

Public:

- `/login`

Protected:

- `/dashboard`
- `/objects` (алиасы: `/entities`, `/resobjects`)
- `/admin/users` (алиас: `/users-registry`)
- Рабочие модули: `/directions`, `/samples`, `/protocols`, `/results`, `/conclusions`, `/tests`
- Каталоги: `/doctors`, `/departments`, `/labs`, `/research-goals`, `/sample-targets`, `/sample-types`, `/indicators`, `/protocol-types`, `/statuses`, `/user-types`

## Поведение доступа

- Sidebar всегда показывает все разделы
- Недоступные действия и пункты не скрываются, а блокируются (`disabled`) и помечаются lock-иконкой
- Router guard дополнительно валидирует доступ на каждую навигацию
- API-уровень:
  - `401` -> `logoutLocal()` и переход на `/login`
  - `403` -> toast `Недостаточно прав`

## API transport

- `VITE_API_BASE_URL=https://...`
- `VITE_API_PREFIX=/api/v1`
- `credentials: 'include'`
- Для demo auth backend поддерживает `APP_AUTH_MODE=mock`

## Основные reusable-компоненты

- `src/shared/components/BaseTable.vue`
- `src/shared/components/BaseDialog.vue`
- `src/shared/components/RowActions.vue`
- `src/shared/components/ConfirmDelete.ts`

## Основные reusable-composables

- `src/shared/composables/useServerTable.ts`
- `src/shared/composables/useCrudDialog.ts`
- `src/shared/composables/useOptimistic.ts`
- `src/shared/composables/usePermission.ts`
- `src/shared/composables/useToast.ts`
- `src/shared/composables/useDialogHash.ts`
- `src/shared/composables/useTableHash.ts`

## Текущее качество и проверки

- `npm run build` проходит
- E2E тесты покрывают auth, навигацию, permissions, objects, dialog actions, overrides badge
- Для запуска E2E требуется доступ среды выполнения к `127.0.0.1:4173`

## Рекомендованные ближайшие улучшения

- добавить smoke e2e для всех каталогов
- добавить e2e сценарий конфликта `409 STALE_DATA`
- сократить размер production bundle через code splitting
- добавить changelog для фиксации изменений контрактов API
