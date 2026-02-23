---
icon: lucide/flask-conical
tags:
  - Testing
  - Quality
---

# Testing Strategy

## Цель

Обеспечить покрытие `90-100%` для всего production-кода с акцентом на стабильность CRUD, фильтрации, пагинации и контрактов ошибок.

## Слои тестов

1. Unit tests:
   - service-логика
   - утилиты фильтрации/сортировки/пагинации
2. Integration tests:
   - repositories + PostgreSQL
   - Alembic migrations (smoke)
3. API tests:
   - маршруты FastAPI
   - аутентификация и role-based доступ
   - `problem+json` ответы при ошибках

## Приоритетные сценарии

1. Полный CRUD для каждой сущности.
2. Корректная работа `offset/limit` и `meta.total`.
3. Интервальные фильтры `{field}_from`/`{field}_to`.
4. Soft delete и исключение удаленных из выборок.
5. Валидация сортировки по белому списку.

## Тестовые фикстуры

- Отдельная тестовая БД.
- Фикстуры для ролей, пользователей, лабораторий и связанных сущностей.
- UTC-aware timestamps во всех проверках.

## CI Quality Gate

Pipeline должен падать при:

1. Ошибках `ruff`, `black --check`, `mypy --strict`.
2. Непройденных тестах `pytest`.
3. Покрытии ниже согласованного порога.
