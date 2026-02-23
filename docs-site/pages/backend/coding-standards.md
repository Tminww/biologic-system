---
icon: lucide/code-2
tags:
  - Coding
  - Standards
---

# Coding Standards

## Язык и стиль

- Язык кода и inline-комментариев: английский.
- Документация продукта: русский (`docs/ru`) с подготовкой к английской локализации.
- Явные, короткие имена функций и переменных без сокращений.

## Инструменты качества

- Python: `3.11.2`
- Dependency manager: `uv`
- Lint: `ruff`
- Format: `black`
- Type checks: `mypy --strict`
- Tests: `pytest`
- Coverage: `90-100%` для всего production-кода
- Git hooks: `pre-commit`

## Общие правила кода

- Следовать принципу single responsibility для сервисов и репозиториев.
- Не смешивать бизнес-логику с HTTP-слоем.
- Не возвращать ORM-модели напрямую из API.
- Для времени использовать timezone-aware типы.
- Для идентификаторов использовать `UUID v7`.
- Для soft delete обновлять `deleted_at`, физическое удаление не использовать.

## Ошибки и исключения

- Бросать доменные исключения из service-слоя.
- Конвертировать исключения в `application/problem+json` на уровне глобальных handlers.
- Не утекать внутренними stack trace в API-ответ.

## Конвенции модулей

- `app/core/errors.py` хранит типы ошибок.
- `app/core/handlers.py` хранит обработчики ошибок.
- `app/app_factory.py` регистрирует роуты, middleware и error handlers.

## Коммиты и review

- Коммиты атомарные, с одной смысловой целью.
- Любое новое API сопровождается тестами.
- Любое архитектурное решение фиксируется в ADR.
