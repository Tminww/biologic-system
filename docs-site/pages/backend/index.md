---
icon: lucide/book-open-text
tags:
  - Overview
  - Specification
---

# Спецификация проекта

Этот раздел является источником правил для реализации backend на `FastAPI + PostgreSQL`.

## Цели этапа

1. Зафиксировать архитектуру и стандарты до начала активной разработки.
2. Определить единый CRUD-контракт для всех сущностей.
3. Согласовать формат ошибок, аутентификацию, фильтрацию и пагинацию.
4. Подготовить базу для локализации документации (RU/EN).

## Ключевые решения

- Архитектура: модульный монолит, слой API -> Services -> Repositories.
- БД: `PostgreSQL 15`, `SQLAlchemy 2.x`, `asyncpg`, `Alembic`.
- Идентификаторы: только `UUID v7` для PK и FK.
- Удаление: мягкое (`deleted_at`), выборки по умолчанию исключают удаленные записи.
- API versioning: `/api/v1`.
- Ошибки: `RFC 9457` (`application/problem+json`).
- Пагинация: `offset/limit` + meta (`total`, `offset`, `limit`).
- Фильтры: query-параметры, включая интервалы `field_from`/`field_to`.

## Навигация

- Архитектурные правила: `architecture.md`
- Правила документации: `documentation-rules.md`
- Контракт API: `api-guidelines.md`
- Правила кода: `coding-standards.md`
- Стратегия тестирования: `testing-strategy.md`
- Генерация тестовых данных: `seeding.md`
- Каталог ORM SQL и анализ планов: `repository-query-catalog.md`
- Архив performance-отчётов: `reports/index.md`
- Операционные инструкции: `runbook.md`
- Архитектурные решения: `adr/`
