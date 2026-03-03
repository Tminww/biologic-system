# Структура проекта

## Актуальная структура

```text
src/
  app/
    src.vue
    main.ts
    router.ts
  layouts/
    AuthLayout.vue
    MainLayout.vue
  modules/
    admin/
    auth/
    conclusions/
    dashboard/
    departments/
    directions/
    doctors/
    entities/
    indicators/
    protocol-types/
    protocols/
    research-goals/
    results/
    sample-targets/
    sample-types/
    samples/
    statuses/
    tests/
    user-types/
  shared/
    api/
    components/
    composables/
    i18n/
    types/
    ui/
    utils/
  styles/
    theme.css
```

## Принципы по папкам

- `modules/*`: только логика конкретной предметной области
- `shared/*`: только то, что реально переиспользуется несколькими модулями
- `shared/types/*`: контракты и интерфейсы
- `shared/composables/*`: сложная повторяющаяся логика
- `shared/api/*`: единая точка взаимодействия с backend API

## Где искать основные механизмы

- Router guards: `src/app/router.ts`
- Auth store: `src/modules/auth/auth.store.ts`
- API hooks на 401/403: `src/app/main.ts`
- RBAC directive: `src/shared/ui/permission.directive.ts`
- Server-side таблицы: `src/shared/components/BaseTable.vue`, `src/shared/composables/useServerTable.ts`
- CRUD dialog state: `src/shared/composables/useCrudDialog.ts`
- Optimistic rollback: `src/shared/composables/useOptimistic.ts`

## i18n и тема

- Переводы: `src/shared/i18n/messages.ts`
- Локаль: `src/shared/i18n/i18n.ts`
- PrimeVue preset: `src/shared/ui/prime.config.ts`
- CSS переменные и layout-стили: `src/styles/theme.css`
