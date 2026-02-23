# Biologic System

Корпоративное SPA на Vue 3 для внутренних лабораторных и административных процессов.

## Что это за проект

- Session-based авторизация через `/auth/login`, `/auth/me`, `/auth/logout`
- RBAC с эффективными правами и user overrides
- Единый подход к CRUD: `BaseTable` + `BaseDialog` + composables
- Серверная пагинация/сортировка/фильтрация
- Optimistic UI с rollback при ошибках
- Mock API режим для локальной разработки без backend

## Ключевые разделы документации

- [Быстрый старт](/frontend/getting-started)
- [Актуальное состояние проекта](/frontend/project/current-state)
- [Архитектура](/frontend/architecture/overview)
- [Роутинг и guards](/frontend/architecture/router-and-guards)
- [Auth и RBAC](/frontend/architecture/auth-and-permissions)
- [Модули](/frontend/modules/overview)
- [API контракт](/frontend/api/overview)
- [OpenAPI 3.1 (FastAPI)](/frontend/api/openapi-fastapi)
- [Mock server](/frontend/mock/mock-server)
- [Как добавить новый CRUD модуль](/frontend/guides/add-crud-module)

## Технологический стек

- Vue 3 + Vite + TypeScript
- Pinia
- Vue Router
- PrimeVue 4 + PrimeIcons + тема Aura
- Playwright для E2E

## Где находится код

Основная кодовая база лежит в `src/`.

Основные точки входа:

- `src/app/main.ts`
- `src/app/router.ts`
- `src/modules/*`
- `src/shared/*`

## Дополнительные материалы

- Подробная спецификация backend API: [docs/api-spec.md](./api-spec.md)
