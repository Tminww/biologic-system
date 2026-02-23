---
icon: lucide/clipboard-list
tags:
  - Operations
  - Runbook
---

# Runbook

## Локальный запуск (плановый стандарт)

1. Создать виртуальное окружение и установить зависимости через `uv`.
2. Поднять `PostgreSQL 15`.
3. Выполнить миграции `Alembic`.
4. Запустить API и проверить OpenAPI.

Пример команд:

```bash
uv sync
uv run alembic upgrade head
uv run uvicorn src.main:app --reload
```

## Базовая авторизация для frontend

После `alembic upgrade head` в БД присутствует пользователь:

1. `username`: `admin`
2. `password`: `admin123`
3. `role`: `admin`

:::warning
`admin/admin123` предназначены только для локальной разработки и тестового стенда.
Для production необходимо переопределить учётные данные.
:::

Проверка login/logout/refresh:

```bash
curl -i -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Backend mock auth режим

Для демонстрационного входа без БД-пользователей можно включить:

```bash
APP_AUTH_MODE=mock
```

В этом режиме сохраняется тот же JWT-cookie контракт (`login/me/refresh/logout`), но учетные записи берутся из mock-auth сервиса.

## Проверки качества

```bash
uv run ruff check .
uv run black --check .
uv run mypy --strict app
uv run pytest --cov=app --cov-report=term-missing
```

## Анализ планов ORM-запросов

Запуск полного цикла (seed + `EXPLAIN ANALYZE` для ORM-запросов репозиториев):

```bash
make analyze-orm-queries
```

Эквивалентная прямая команда:

```bash
uv run python -m scripts.analyze_orm_query_plans --seed-profile perf-lite --truncate
```

Артефакты:

1. `docs/content/repository-query-catalog.md` — каталог SQL-запросов и их назначения.
2. `artifacts/orm-query-plan-report.md` — человеко-читаемый отчет с найденными проблемами.
3. `artifacts/orm-query-plan-report.json` — машинно-читаемый отчет.

## Локальный запуск документации

Для Zensical (текущий основной контур):

```bash
make docs-serve
```

Для Scalar используйте ваш текущий рабочий запуск CLI, но с конфигом `scalar.config.json`.

`scalar.config.json` теперь читает напрямую `docs/`, поэтому можно сравнивать рендер одного и того же источника в двух движках (`Scalar` vs `Zensical`).

## Кнопки Edit/View в документации

Кнопки `Редактировать` и `Посмотреть исходник` в Zensical появляются только при корректных `repo_url` и `edit_uri`.

Проверьте значения в `zensical.toml`:

```bash
repo_url = "https://github.com/{org}/{repo}"
edit_uri = "edit/main/docs/"
```

После изменения конфигурации перезапустите:

```bash
make docs-serve
```

## Print Site и PDF

Zensical не формирует отдельную объединенную print-page по умолчанию.

Печать отдельной страницы в PDF:

1. Запустить `make docs-serve`.
2. Открыть нужную страницу (например, `http://127.0.0.1:8000/api-guidelines/`).
3. В браузере выбрать `Print -> Save as PDF`.

## Политика времени и timezone

- В БД использовать timezone-aware timestamps (`timestamptz`).
- Не полагаться на локальную timezone хоста.
- В API возвращать ISO 8601 с timezone.

## Обработка инцидентов производительности (SELECT)

1. Включить логирование медленных запросов.
2. Снять `EXPLAIN (ANALYZE, BUFFERS)` для проблемного SQL.
3. Проверить частичные индексы `WHERE deleted_at IS NULL`.
4. Проверить корректность `offset/limit` и фильтров по датам.
5. Зафиксировать результат в ADR при изменении архитектурного решения.
