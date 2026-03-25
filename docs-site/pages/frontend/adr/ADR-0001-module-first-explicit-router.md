---
icon: lucide/file-text
tags:
  - Frontend
  - ADR
  - frontend-new
---

# ADR-0001: module-first structure with explicit router for frontend-new

## Status

Accepted, 25 March 2026.

## Context

`frontend-new` начиналcя как небольшой page-centric SPA. По мере роста логика одного домена стала расползаться между `src/pages`, `src/components` и `src/composables`. Дополнительно routing строился через `vue-router/auto-routes`, что упрощало старт, но затрудняло контролируемую модульную миграцию.

## Decision

1. Отказаться от `vue-router/auto-routes`.
2. Ввести явный router в `src/app/router.ts`.
3. Принять целевую структуру `app/modules/shared`.
4. Переносить экраны по доменам, начиная с `dashboard`.
5. На время миграции разрешить legacy-страницы, если они подключены только через явный router.

## Consequences

### Positive

- структура модуля становится локальной и предсказуемой
- проще переносить домен целиком вместе со страницей, компонентами и API
- проще контролировать границы зависимостей
- router перестаёт быть скрытой магией build-time plugins

### Negative

- на переходный период в кодовой базе сосуществуют новая и legacy-структуры
- миграция требует временных re-export wrappers и дисциплины по импортам
- часть автогенерации роутов теряется в пользу явной конфигурации

## Follow-up

1. Перенести `customers`, `inbox`, `settings` в `src/modules/*`.
2. Удалить legacy-entrypoints после переключения всех маршрутов.
3. Вынести оставшиеся общие типы и утилиты из legacy-папок в `shared`.
