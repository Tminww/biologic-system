---
icon: lucide/folders
tags:
  - Frontend
  - Architecture
  - frontend-new
---

# frontend-new: module-first migration rules

Последнее обновление: **25 марта 2026**.

## Решения

1. `frontend-new` больше не использует file-based routing и `vue-router/auto-routes`.
2. Router описывается явно в `src/app/router.ts`.
3. Целевая структура проекта строится вокруг `src/app`, `src/modules`, `src/shared`.
4. `dashboard` является отдельным модулем и служит пилотным срезом миграции.
5. Миграция выполняется поэтапно: legacy-экраны допускаются временно, но подключаются через явный router.

## Целевая структура

```text
src/
  app/
    main.ts
    router.ts
    layouts/
    components/
    composables/
  modules/
    auth/
      pages/
      components/
      api/
      composables/
      store/
    dashboard/
      pages/
      components/
      api/
      composables/
      store/
  shared/
    composables/
    i18n/
    ui/
    utils/
    types/
```

## Правила зависимостей

:::warning
Новые зависимости между модулями запрещены по умолчанию.
:::

- `app` может импортировать `modules` и `shared`
- `modules/*` могут импортировать только `shared`
- `modules/*` не импортируют другие `modules/*` напрямую без отдельного архитектурного решения
- `shared` не должен импортировать код из `app` и `modules`

## Правила размещения кода

- `app/*` содержит только composition root приложения: router, layouts, shell-компоненты, глобальные composables
- `modules/<name>/pages/*` содержит route-level экраны модуля
- `modules/<name>/components/*` содержит UI, который знает предметную область модуля
- `modules/<name>/api/*` содержит внешние запросы и адаптеры к API
- `modules/<name>/store/*` создаётся только если состояние действительно модульное и разделяется между несколькими экранами
- `shared/*` хранит только код без доменной семантики

## Правила для router

- Все маршруты описываются вручную в `src/app/router.ts`
- Layout задаётся через nested routes, а не через auto-generated meta/layout binding
- Корневой маршрут `/` может использоваться только как redirect или alias к каноническому маршруту
- При появлении нового модуля сначала добавляется его route record, затем страница

## Правила миграции

1. Сначала создаётся новый модульный каталог.
2. Затем router переключается на новый entrypoint.
3. После этого legacy-импорты заменяются на `@/app`, `@/modules`, `@/shared`.
4. Только после стабилизации сборки удаляются старые файлы и временные re-export wrappers.

## Что уже перенесено

- явный router в `src/app/router.ts`
- layout-слой в `src/app/layouts`
- shell-composables в `src/app/composables`
- shared i18n и locale composable
- модуль `dashboard`
- модульный `auth` entrypoint для `/login`

## Что ещё остаётся legacy

- `customers`
- `inbox`
- `settings`
- часть общих типов и утилит, доступных через временные re-export файлы
